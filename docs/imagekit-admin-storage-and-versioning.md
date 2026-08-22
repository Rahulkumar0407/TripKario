# ImageKit Admin Storage Monitor & Itinerary Image Versioning

This document outlines the architecture, metric reconciliation with ImageKit Dashboard, integration points, security principles, and user experience workflows for ImageKit account storage monitoring and itinerary image version history in the TripKario Admin Console.

---

## 1. Architecture & Design Principles

* **Beginner-Friendly Mental Model**: The admin console never exposes technical jargon such as raw file IDs, version IDs, CDN endpoints, folder structures, API keys, or JSON payloads.
* **Server-Side Security**: All ImageKit private API keys (`IMAGEKIT_PRIVATE_KEY`) remain strictly on the server within Next.js Route Handlers. No private credentials or management tokens are ever sent to client components or stored in `localStorage`.
* **Canonical Asset Paths**: When replacing an itinerary hero image, the upload uses the canonical folder and file name (`/tripkario/itineraries/[destination]/[slug]/hero.jpg`) with `useUniqueFileName: false`. This instructs ImageKit to create a new asset version at the exact same location rather than scattering fragmented files (`hero-1.jpg`, `hero-2.jpg`).

---

## 2. ImageKit Storage Monitor & Metric Reconciliation

### Endpoint
`GET /api/admin/imagekit/usage`

### Metric Reconciliation with ImageKit Dashboard
On the ImageKit Dashboard, the primary storage metric displayed is:
**"Current Media Library Storage: ~191.50 MB"**

### Exact ImageKit Field Used
* **Field**: `mediaLibraryStorageBytes`
* **Source**: `GET https://api.imagekit.io/v1/accounts/usage?startDate=YYYY-MM-01&endDate=YYYY-MM-lastDay`
* **Real-time Live Parity**: In addition to the monthly aggregated `mediaLibraryStorageBytes`, the backend queries the live file store via ImageKit SDK `listFiles` to immediately capture recent uploads before ImageKit's 6-hour analytics aggregation cycle runs.
* **Isolation Rule**: Only `mediaLibraryStorageBytes` is used. We explicitly **DO NOT** add or blend:
  * Bandwidth (`bandwidthBytes`)
  * API Requests
  * Video Processing Units (`videoProcessingUnitsCount`)
  * Extension Units (`extensionUnitsCount`)
  * Original Cache Storage (`originalCacheStorageBytes`)

### Response Structure
```json
{
  "success": true,
  "storageBytes": 196100242,
  "formattedUsed": "187.0 MB",
  "limitBytes": null,
  "formattedLimit": null,
  "formattedRemaining": null,
  "percentUsed": null,
  "limitKnown": false,
  "warningStatus": "normal",
  "lastUpdated": "Updated periodically",
  "dashboardUrl": "https://imagekit.io/dashboard",
  "metric": "mediaLibraryStorageBytes"
}
```

### Plan Quota & Limit Policy
* If `IMAGEKIT_STORAGE_LIMIT_GB` is not present in `.env`:
  * **Plan limit**: `Not available via API` (never guessed or fabricated)
  * **Progress Bar / Fake Percentages**: Disabled (no fake numbers shown)
* If `IMAGEKIT_STORAGE_LIMIT_GB` is set (e.g. `5` for 5 GB):
  * **Storage used**: `191.5 MB / 5 GB`
  * **Remaining**: `4.81 GB remaining`
  * **Progress bar**: Displays calculated percentage

### UI Presentation
* **Header & Panel**:
  * Heading: `IMAGEKIT STORAGE`
  * Metric: `187.0 MB used` (or `191.5 MB used`)
  * Quota status: `Plan limit: Not available via API` or `X remaining`
  * Action: `View ImageKit →` linking to `https://imagekit.io/dashboard`
  * Sync notice: `Updated periodically`

---

## 3. Itinerary Image Versioning & Replacement

### Workflow
1. **Current Image**: In the Trip Editor (Photos tab), the live hero image is displayed with a `"CURRENT"` badge.
2. **Replace Image**:
   * Direct file picker (`JPG`, `PNG`, `WEBP` up to 15MB).
   * Safe metadata logged on file select (filename, size, MIME type).
   * Calls `/api/admin/imagekit/upload` with `useUniqueFileName: false` and the canonical itinerary path (`/tripkario/itineraries/[destination]/[slug]/hero.jpg`).
   * Returns a version-stamped URL (`...hero.jpg?v=${versionId}`) to prevent Next.js and CDN caching issues.
3. **Image History**:
   * Queries `/api/admin/imagekit/versions?url=[imageUrl]`.
   * Each entry displays:
     * Label: `CURRENT` (Live), `PREVIOUS`, `ORIGINAL`, or `Version X`
     * Date: Formatted human-readable timestamp
     * Unique version thumbnail preview (`...hero.jpg?v=${versionId}`)
     * Actions: `[ Preview ]` (modal lightbox) and `[ Restore ]`
4. **Restore Image Confirmation**:
   * Dialog: `"Restore this image? This will replace the current itinerary image with the selected previous version."`
   * Calls `/api/admin/imagekit/restore` (`PUT https://api.imagekit.io/v1/files/{fileId}/versions/{versionId}/restore`).
   * Updates the canonical trip record and dispatches `'tripkario-trips-updated'` for immediate live update across all public pages.
   * Toast notification: `"Image restored."`

---

## 4. Summary of Data Sources

| Field | Source | Note |
| :--- | :--- | :--- |
| **Current Media Library Storage** | `mediaLibraryStorageBytes` from `GET /v1/accounts/usage` + live `listFiles` | Matches ImageKit Dashboard (~191.50 MB) |
| **Plan Quota** | `IMAGEKIT_STORAGE_LIMIT_GB` env or `Not available via API` | Never guessed or fabricated |
| **Version History** | ImageKit Asset Versions API (`/v1/files/{fileId}/versions` & `/details`) | Direct from ImageKit with unique version IDs |
| **Version Restores** | ImageKit Version Restore API (`/v1/files/{fileId}/versions/{versionId}/restore`) | Direct from ImageKit |
