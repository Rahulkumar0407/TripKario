# TripKario — Simplified Itinerary Image Management Architecture

## 1. Overview & Simplification

The TripKario Trip Image Editor has been simplified to focus exclusively on what matters to administrators:
1. **CURRENT COVER IMAGE**: The image currently live across all website surfaces.
2. **ORIGINAL COVER**: The immutable baseline image with which the itinerary was published.
3. **REPLACE IMAGE**: Upload a new image to replace the current live cover.
4. **RESTORE ORIGINAL**: Instantly revert the current cover back to the original image.

All intermediate version history complexity (Version 1, Version 2, Previous, version lists, archived labels) has been completely removed from the user interface.

---

## 2. Core Architecture & Mental Model

```
                    ┌────────────────────────┐
                    │ ORIGINAL COVER (Asset) │
                    └──────────┬─────────────┘
                               │
               ┌───────────────┴───────────────┐
               │                               │
               ▼                               ▼
       [ Initial State ]               [ After Replacements ]
     CURRENT = ORIGINAL               CURRENT = Replacement D
   (CURRENTLY ORIGINAL)                ORIGINAL = Asset A (unchanged)
               │                               │
               │                               ▼
               │                    Click [ RESTORE ORIGINAL ]
               │                               │
               └───────────────────────────────┘
                               │
                               ▼
                      CURRENT = ORIGINAL
                     (Live across website)
```

### Key Principles
- **Original is Immutable**: Once an itinerary's original image is established, subsequent replacements (A → B → C → D) will **never** overwrite the stored original.
- **Single-Click Restore**: Restoring the original sets `CURRENT = ORIGINAL` and triggers on-demand revalidation across the catalogue and direct itinerary pages.
- **Deduplication**: If an admin uploads an image that matches the current active image by SHA-256 binary hash, no upload is performed and no storage is consumed. Toast displays: *"This image is already active."*

---

## 3. UI States & Experience

### A. Current Image is Original (`CURRENT == ORIGINAL`)
- **Current Cover Image Card**: Displays image with `CURRENT` badge and `Live on Website` status.
- **Original Cover Card**: Displays thumbnail with `CURRENT IMAGE IS ORIGINAL` indicator and disabled `[ CURRENTLY ORIGINAL ]` button.
- **Replace Image**: Allows uploading a replacement photo.

### B. Current Image is Replaced (`CURRENT != ORIGINAL`)
- **Current Cover Image Card**: Displays the newly replaced live image with `CURRENT` badge and `Live on Website` status.
- **Original Cover Card**: Displays original thumbnail with active `[ RESTORE ORIGINAL ]` and `[ Preview ]` buttons.
- **Restore Confirmation Modal**:
  - Prompts: *"Restore original image? This will replace the current cover image with the image this itinerary originally had."*
  - Shows preview thumbnail of the original asset.
  - Buttons: `[ Cancel ]` and `[ Restore Original ]`.

---

## 4. Public Synchronization & Revalidation

When an image is replaced or restored:
1. **Data Layer**: Updates `coverImageUrl` in `persisted_trips.json` while maintaining `originalCoverImageUrl`.
2. **Client State**: Updates `localStorage['tripkario_admin_trips']` and dispatches `tripkario-trips-updated` event.
3. **Public Surfaces**:
   - `/itineraries` catalogue cards
   - `TripDetailModal`
   - `/itineraries/[tripId]` package pages
   - Homepage curated showcases
4. **On-Demand Server Revalidation**: `revalidatePath('/itineraries')`, `revalidatePath('/itineraries/[tripId]')`, `revalidatePath('/')`.

---

## 5. Build & Verification Matrix

| Step | Verification Item | Result |
| :--- | :--- | :--- |
| **1** | TypeScript compilation (`npx tsc --noEmit`) | **PASS** |
| **2** | Next.js lint check (`npm run lint`) | **PASS** |
| **3** | Production build (`npm run build`) | **PASS (124/124 routes built)** |
| **4** | Intermediate version UI removed | **PASS** |
| **5** | Original image immutability during replacements | **PASS** |
| **6** | Duplicate binary upload prevention (SHA-256) | **PASS** |
| **7** | Responsive mobile & desktop layout | **PASS** |
