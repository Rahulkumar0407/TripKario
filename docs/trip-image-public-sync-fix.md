# TripKario — Admin Image → Public Itinerary Image Sync Fix

## Overview
This document records the architectural fix resolving the synchronization discrepancy between the Admin Console Itinerary Image replacement engine and the public itinerary catalogue, modal, and detail experiences.

---

## 1. Root Cause & Duplicate Image Sources Analysis

### Discovered Image Sources Mapping (e.g. `goa-honeymoon-beach-4d`):

| Consumer Component | Field Queried | Source Prior to Fix | Status |
| :--- | :--- | :--- | :--- |
| **Admin Photos Manager** | `activeTrip.coverImageUrl` | LocalStorage + ImageKit API | Dynamic ✅ |
| **Itinerary Catalogue Card** | `trip.coverImage.src` | `loadClientTripPackages()` | Dynamic ✅ |
| **TripDetailModal Hero Header** | `trip.coverImage.src` | Prop passed from selection (`allTrips.find(...)`) | Resolved ✅ |
| **TripDetailModal Route Highlights** | `trip.galleryImages` | `seedData.ts` initialized from static `trip.coverImage.src` | Separated ✅ |
| **Itinerary Detail Page (`/itineraries/[tripId]`)** | `trip.coverImage.src` | Static import `tripPackages` from `src/data/trips.ts` | Resolved with `serverTrips` ✅ |
| **India Journey Showcase** | `getDeckItemImage(item)` | Stale memo without update listener | Resolved with event listener ✅ |

### The Root Bugs Identified:
1. **Direct Static Data Imports on Server**: Server components like `/itineraries/[tripId]` imported static `tripPackages` directly from `src/data/trips.ts`, bypassing admin modifications.
2. **Missing Real-Time Sync in Modal / Showcases**: `TripDetailModal` and showcase components did not listen to real-time sync events (`tripkario-trips-updated`), causing stale state if the user opened an item while in the same session.
3. **Hero vs Route Highlights Semantics**: Route Highlights (`trip.galleryImages`) is designed to hold secondary landscape photos along the route. Initial seed data had copied the hero URL into `galleryUrls`, causing the old hero to remain visible in Route Highlights even after replacing the hero cover.

---

## 2. Canonical Data Architecture

```
                                  ┌────────────────────────┐
                                  │   Admin Image Upload   │
                                  │   (ImageKit Version)   │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │   POST /api/admin/trips      │
                               │  (Persist to server JSON)    │
                               └──────────────┬───────────────┘
                                              │
                  ┌───────────────────────────┴───────────────────────────┐
                  ▼                                                       ▼
    ┌───────────────────────────┐                           ┌───────────────────────────┐
    │     Server Components     │                           │     Client Components     │
    │  (/itineraries/[tripId])  │                           │   (/itineraries, Modal)   │
    │   getCanonicalServerTrip  │                           │  loadClientTripPackages   │
    └───────────────────────────┘                           └───────────────────────────┘
```

### Core Architecture Rules Established:
1. **ONE TRIP → ONE CANONICAL HERO IMAGE**:
   - Every hero consumer (`coverImage.src`) resolves from the unified canonical source.
   - For server components: `src/lib/serverTrips.ts` merges persistent overrides on disk (`src/data/persisted_trips.json`) with the baseline 86-trip catalog.
   - For client components: `src/lib/trips.ts` merges client and server overrides with real-time `tripkario-trips-updated` broadcast.
2. **DISTINCT ROUTE HIGHLIGHTS & GALLERY**:
   - `trip.coverImage`: Single canonical hero image.
   - `trip.galleryImages`: Additional route photography & landscapes.
   - Replacing the hero image updates only the hero; gallery photos remain clean and independent.

---

## 3. End-to-End Test Matrix Validation

| Test Stage | Action | Expected | Result |
| :--- | :--- | :--- | :--- |
| **Admin Cover Image** | View `Goa Honeymoon Beach Escape` in Photos tab | Shows active ImageKit URL | **PASSED** ✅ |
| **Public Itinerary Card** | Navigate to `/itineraries?search=goa` | Card displays active ImageKit URL | **PASSED** ✅ |
| **TripDetailModal Hero** | Open detail modal for Goa trip | Modal hero renders active ImageKit URL | **PASSED** ✅ |
| **Route Highlights** | Inspect Route Highlights & Landscapes | Displays independent route photography | **PASSED** ✅ |
| **Direct Detail Page** | Server-render `/itineraries/goa-honeymoon-beach-4d` | Metadata & Hero render canonical ImageKit URL | **PASSED** ✅ |

---

## 4. Verification & Build
- `npx tsc --noEmit`: 0 errors.
- `npm run lint`: 0 errors.
- `npm run build`: 123/123 static and dynamic routes compiled successfully.
