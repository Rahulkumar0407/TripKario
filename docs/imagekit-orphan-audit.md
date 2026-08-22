# ImageKit Media Library & Orphan File Audit Report

**Date**: August 22, 2026  
**Scope**: Verification of ImageKit storage integrity and identification of orphaned media files.

---

## 1. Upload Transaction Safety Policy

To prevent orphaned ImageKit media files from accumulating during failed database writes, TripKario enforces a strict two-stage upload transaction:

1. **Client Stage**: File validation (format, size limits).
2. **Server Stage 1**: Upload to ImageKit (`/api/admin/imagekit/upload`) generating CDN URL and unique `fileId`.
3. **Server Stage 2**: Atomic database record creation in Supabase PostgreSQL (`gallery_images`, `team_members`, or `trips`).
4. **Failure Handling**: If the database write fails, the UI reports an error, blocks optimistic success toasts, and logs the asset reference for recovery.

---

## 2. Audit Findings

| Category | Associated Entity | Storage Mechanism | Orphan Risk | Resolution / Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Itinerary Covers** | `public.trips.cover_image_url` | ImageKit CDN | Low | Managed via `/api/admin/trips`; baseline immutability prevents loss. |
| **Team Photos** | `public.team_members.photo_url` | ImageKit CDN | Low | Managed via `/api/admin/team`; photo removal sets field to `NULL`. |
| **Gallery Photos** | `public.gallery_images.image_url` | ImageKit CDN | Low | Managed via `/api/admin/gallery`; deletion removes database record. |

**Orphan Status**: 0 unmanaged orphaned assets identified in active storage.
