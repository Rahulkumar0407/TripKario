# TripKario Gallery Mock Data Audit & Cleanup Report

**Date**: 2026-08-22  
**Purpose**: Audit all gallery data structures, identify and purge static seeded/mock gallery records, remove hardcoded locations, and establish the Admin Gallery as the 100% single source of truth.

---

## 1. Inventory & Record Classification

### Total Gallery Records Audited
* **Total Records in `src/data/gallery.ts`**: 12 records
* **Admin-Uploaded Production Records in Static Baseline**: 0 records
* **Mock / Seeded Demo Records**: 12 records
* **Hardcoded Location Arrays**: 0 found (locations dynamically computed via `groupGalleryByLocation`)

### Record-by-Record Provenance Analysis

| ID | Location | Image URL | Status | Action |
| :--- | :--- | :--- | :--- | :--- |
| `gal-kashmir-1` | Dal Lake, Srinagar | `https://ik.imagekit.io/.../itineraries/kashmir/...` | Seeded itinerary photo | **REMOVE** |
| `gal-kashmir-2` | Dal Lake, Srinagar | `https://ik.imagekit.io/.../itineraries/kashmir/...` | Seeded itinerary photo | **REMOVE** |
| `gal-kashmir-3` | Dal Lake, Srinagar | `https://ik.imagekit.io/.../itineraries/kashmir/...` | Seeded itinerary photo | **REMOVE** |
| `gal-ladakh-1` | Pangong Tso, Ladakh | `https://ik.imagekit.io/.../itineraries/ladakh/...` | Seeded itinerary photo | **REMOVE** |
| `gal-ladakh-2` | Pangong Tso, Ladakh | `https://ik.imagekit.io/.../itineraries/ladakh/...` | Seeded itinerary photo | **REMOVE** |
| `gal-spiti-1` | Key Gompa, Spiti Valley | `https://ik.imagekit.io/.../itineraries/spiti/...` | Seeded itinerary photo | **REMOVE** |
| `gal-spiti-2` | Key Gompa, Spiti Valley | `https://ik.imagekit.io/.../itineraries/spiti/...` | Seeded itinerary photo | **REMOVE** |
| `gal-meghalaya-1` | Nongriat, Meghalaya | `https://ik.imagekit.io/.../itineraries/meghalaya/...` | Seeded itinerary photo | **REMOVE** |
| `gal-tawang-1` | Tawang Monastery | `https://ik.imagekit.io/.../itineraries/tawang/...` | Seeded itinerary photo | **REMOVE** |
| `gal-kerala-1` | Vembanad Lake, Alleppey | `https://ik.imagekit.io/.../itineraries/kerala/...` | Seeded itinerary photo | **REMOVE** |
| `gal-goa-1` | Fontainhas & Coastal Goa | `https://ik.imagekit.io/.../itineraries/goa/...` | Seeded itinerary photo | **REMOVE** |
| `gal-himachal-1` | Tirthan Valley & Jibhi | `https://ik.imagekit.io/.../itineraries/himachal/...` | Seeded itinerary photo | **REMOVE** |

**Summary**: All 12 initial baseline records were seeded from general itinerary assets. As per requirement, these must be completely removed from production gallery baseline data so that only genuine admin-added photographs appear.

---

## 2. Hardcoded Locations & External URLs Audit

* **Hardcoded Location Arrays**: None exist in production code. The location index is dynamically calculated from `groupGalleryByLocation(galleryImages)`.
* **External Image URLs in Gallery**: Zero external/Unsplash URLs remain in gallery modules.
* **Itinerary Assets vs. Gallery Assets**: Itinerary hero images hosted on ImageKit are preserved for the `/itineraries` pages but are strictly decoupled from the `/gallery` public archive.

---

## 3. Post-Cleanup Data Flow

1. **Initial / Empty State**:
   * `galleryImages` starts empty `[]`.
   * Public `/gallery` displays: *"Gallery coming to life. Upload your first travel photograph from the admin console."*
   * `/gallery/location/[slug]` returns a clean 404 / not found state.
2. **Admin Upload**:
   * Admin navigates to `/adminconsole1811/gallery` and uploads a photograph with location (e.g. *"Dal Lake, Srinagar"*).
   * Record is saved to canonical gallery storage and broadcast via `tripkario-gallery-updated`.
   * Location automatically appears on `/gallery` with accurate photo count (`1 FRAME`).
   * Clicking the location card opens `/gallery/location/dal-lake-srinagar`.
3. **Admin Delete**:
   * When an admin deletes a photograph, it disappears from the location page immediately.
   * When the last photograph for a location is deleted, the location automatically disappears from the `/gallery` homepage.
