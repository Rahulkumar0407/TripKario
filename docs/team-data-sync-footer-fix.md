# TripKario — Team Data Synchronization & Footer Alignment

## Overview
This document records the architectural changes and visual optimizations implemented to establish a single canonical source of truth for the Team directory and to resolve desktop baseline alignment issues in the global Footer.

---

## 1. Team Data Synchronization Architecture

### Single Source of Truth
- **Persistence Layer**: Admin team records are managed via `/adminconsole1811/team` and stored in Supabase (`team_members` table) with real-time browser storage (`localStorage['tripkario_admin_team']`) and event broadcasting (`window.dispatchEvent(new Event('tripkario-team-updated'))`).
- **Purged Mock Data**: Removed all static/mock records from `src/data/team.ts`. Initial team directory defaults to an empty state until published by the admin.
- **Client Loader**: Implemented `loadClientTeamMembers()` in `src/lib/team.ts` providing deterministic sorting by `displayOrder` and filtering out inactive records.
- **Real-Time Public Sync**: `/team` listens to both `'storage'` and `'tripkario-team-updated'` events, immediately reflecting additions, edits, reordering, and deletions without requiring a page reload.

### Clean Photo-less Layout (Zero Placeholders)
- When a team member has no photo (`photoUrl == null` or `""`), the public `/team` page renders an editorial typography-only card showing:
  - Specialist badge & Name in editorial serif font
  - Role / Designation in amber mono font
  - Bio / Introduction and optional contact channels
- **Strictly No**: Broken image tags, gray placeholder boxes, camera icons, generated avatars, or mock photographs.

### Admin Photo Management Flow
- **When photo exists**: Displays portrait thumbnail with `CURRENT` badge, `[ Replace Image ]` (opens media picker), and `[ Remove Image ]` (triggers accessible custom confirmation modal `"Remove Member's Photo?"`).
- **When no photo exists**: Displays `[ Add Photo ]` button with informational hint.
- **Custom Confirmation Modals**: Replaced browser-native `window.confirm()` with custom accessible backdrop modals for both member deletion and photo removal.

---

## 2. Global Footer Alignment & Grid Redesign

### Previous Issues
- The **Explore** column had 8 stacked full-height links (`min-h-[44px]`), stretching the column to >350px while Brand and Contact were ~130px.
- Created unbalanced vertical whitespace and misaligned column baselines on desktop.

### Redesigned Layout (`src/components/Footer.tsx`)
- **Top Alignment**: All columns align cleanly to the same top baseline (`items-start`).
- **Proportions**:
  - **Brand Column** (`lg:col-span-4`): Logo, brand description, WhatsApp and Instagram buttons.
  - **Explore Column** (`lg:col-span-4`): Section header and a compact 2-column link subgrid (`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2`) with natural desktop spacing and touch ergonomics on mobile.
  - **Get in Touch Column** (`lg:col-span-4`): Address, clickable email, and phone number with icons.
- **Bottom Bar**: Proportional baseline with copyright on the left and `"Aap destination batao. Baaki hum dekh lenge."` brand tagline on the right.

---

## 3. Verification & Validation Summary

| Test Step | Verification Flow | Status |
| :--- | :--- | :--- |
| **01. Admin Creation** | Created `QA Test Member` (Role: `Test Curator`) with no photo | Passed |
| **02. Public Display** | Verified appearance on `/team` in typography-only format with 0 image placeholders | Passed |
| **03. Real-Time Edit** | Updated role to `Senior Test Curator` in admin; verified instant update on `/team` | Passed |
| **04. Custom Modal Deletion** | Clicked delete trash icon; verified custom modal; confirmed deletion | Passed |
| **05. Editorial Empty State** | Verified `/team` displays `"The people behind the journeys."` empty state | Passed |
| **06. Footer Inspection** | Inspected `/team` and `/` at 1440x900 viewport; verified top baseline alignment and 2-column Explore links | Passed |
| **07. Typecheck** | `npx tsc --noEmit` exited with code `0` | Passed |
