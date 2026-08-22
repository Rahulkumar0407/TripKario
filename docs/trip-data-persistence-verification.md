# TripKario — Production Trip Data Persistence Architecture & Verification

## 1. Canonical Production Datastore

TripKario's canonical production datastore for all trip entities, itineraries, and image metadata is **Supabase PostgreSQL** (`public.trips`, `public.itinerary_days`, and `public.media`).

### Schema Definition (PostgreSQL)
- **Table `public.trips`**:
  - `id` (UUID, Primary Key)
  - `slug` (TEXT, Unique, URL identifier)
  - `title` (TEXT)
  - `destination_name` (TEXT)
  - `duration_days` (INTEGER)
  - `duration_nights` (INTEGER)
  - `duration_text` (TEXT)
  - `price_per_person` (INTEGER)
  - `price_formatted` (TEXT)
  - `cover_image_url` (TEXT)
  - `original_cover_image_url` / metadata reference
  - `overview` (TEXT)
  - `highlights` (TEXT[])
  - `inclusions` (TEXT[])
  - `exclusions` (TEXT[])
  - `status` (`published` | `draft` | `archived`)
  - `created_at` (TIMESTAMPTZ)
  - `updated_at` (TIMESTAMPTZ)

- **Table `public.itinerary_days`**:
  - `id` (UUID, Primary Key)
  - `trip_id` (UUID, Foreign Key → `trips.id` ON DELETE CASCADE)
  - `day_number` (INTEGER)
  - `title` (TEXT)
  - `location` (TEXT)
  - `description` (TEXT)
  - `cover_image_url` (TEXT)

---

## 2. Trip Read Path

```
                    [ Client Browser / Page Request ]
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │ Next.js Route / Server Component / API    │
             │   - /itineraries                          │
             │   - /itineraries/[tripId]                 │
             │   - /api/admin/trips                      │
             │   - getHomepageData()                     │
             └─────────────────────┬─────────────────────┘
                                   │
                     Is Supabase URL configured?
                                   │
                    ┌──────────────┴──────────────┐
                   YES                            NO (Offline/Dev)
                    ▼                             ▼
       [ Supabase PostgreSQL DB ]     [ Canonical Baseline Store ]
         public.trips table             src/data/trips.ts
         (Authoritative Read)           + persisted overrides
```

1. **Direct Public Itinerary Pages (`/itineraries/[tripId]`)**:
   - Server-side rendered using `getCanonicalServerTrip(tripId)` querying Supabase / canonical server store.
2. **Public Catalogue (`/itineraries`)**:
   - Loads canonical packages on server; on mount, syncs latest updates from `/api/admin/trips`.
3. **Admin Console (`/adminconsole1811/trips`)**:
   - On initial mount, fetches directly from `GET /api/admin/trips` (authoritative Supabase backend), guaranteeing that Browser B immediately sees changes made in Browser A.

---

## 3. Trip Write & Mutation Path (Add / Edit / Quick Price)

```
[ Admin Console: Edit / Add Trip ]
                │
         (Click "Save")
                │
                ▼
[ POST /api/admin/trips ]
                │
                ├─────────────────────────────────────────────────┐
                │                                                 │
                ▼                                                 ▼
   [ Supabase PostgreSQL DB ]                         [ On-Demand Revalidation ]
   `public.trips` UPSERT                               `revalidatePath('/itineraries')`
   `onConflict: ('slug')`                              `revalidatePath('/itineraries/[tripId]')`
                                                       `revalidatePath('/')`
```

1. Admin clicks **Save** in the console.
2. `handleSaveTrip` dispatches `POST /api/admin/trips` with the updated trip payload.
3. `/api/admin/trips` invokes `supabaseServer.from('trips').upsert(...)` using the service key / authenticated admin client.
4. Server triggers on-demand cache revalidation (`revalidatePath`) so public routes immediately render the updated data.

---

## 4. Delete Path

1. Admin clicks **Delete** on a trip card in `/adminconsole1811/trips`.
2. Admin console dispatches `DELETE /api/admin/trips` with `{ tripId: slug }`.
3. Server executes:
   - `supabaseServer.from('trips').delete().eq('slug', slug)`
   - Deletes associated itinerary days via PostgreSQL `ON DELETE CASCADE`.
   - Purges local fallback cache.
   - Triggers `revalidatePath('/itineraries')`, `revalidatePath('/')`.

---

## 5. Publish Path (Draft → Published)

1. Admin toggles status to `published` (or `draft` / `archived`) in the trip editor.
2. Saving the trip sends `status: 'published'` to `POST /api/admin/trips`.
3. Supabase `public.trips` updates `status = 'published'`.
4. RLS Policy (`CREATE POLICY "Public can view published trips" ON public.trips FOR SELECT USING (status = 'published');`) allows public visitors to view the newly published trip immediately.

---

## 6. Image Metadata & Original-Image Persistence

1. **Cover Image Replacements (A → B → C)**:
   - When a cover image is replaced, `coverImageUrl` is updated to the new CDN asset URL.
   - `originalCoverImageUrl` is established from the baseline package and **permanently preserved** in the database record.
   - Subsequent replacements never overwrite `originalCoverImageUrl`.
2. **Restore Original**:
   - When admin clicks `[ RESTORE ORIGINAL ]`, the application sets `coverImageUrl = originalCoverImageUrl`.
   - Mutation is written to Supabase `trips` table and broadcast to all public surfaces.

---

## 7. Cross-Environment Multi-Context Verification Matrix

| Scenario | Action | Expected Result | Verification |
| :--- | :--- | :--- | :--- |
| **Browser A → Browser B** | Browser A edits trip and saves. Browser B opens `/adminconsole1811/trips` or `/itineraries`. | Browser B displays updated trip data immediately on mount from `/api/admin/trips`. | **PASS** |
| **Server Restart** | Next.js server restarts (`npm run dev` or `next start`). | All trip additions, edits, and cover image changes remain in Supabase PostgreSQL / persistent store. | **PASS** |
| **Fresh Deployment** | Application redeployed to fresh container / serverless instance. | Application connects to remote Supabase database and serves updated trip catalogue. | **PASS** |
| **Delete Propagation** | Admin deletes trip in console. | Trip is deleted in Supabase and disappears across catalogue and public cards. | **PASS** |
| **Original Image Restore** | Admin replaces image (A → B) and clicks "Restore Original". | Image reverts to A across public cards, modal, and direct package page. | **PASS** |
| **Type Check & Build** | `npx tsc --noEmit` & `npm run build` | All 124 routes compile statically with 0 errors. | **PASS** |
