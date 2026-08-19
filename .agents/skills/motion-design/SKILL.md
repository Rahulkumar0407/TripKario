---
name: motion-design
description: >-
  Advanced motion design and interaction physics skill.
  Covers directional momentum carousels, spring physics, scroll-choreographed scene reveals,
  magnetic button dynamics, and context-sensitive morphs using GSAP and Framer Motion.
---

# Motion Design & Interaction Physics Skill

## 1. Directional Motion & Physics
- **Directional Awareness**: When moving `Next`, outgoing items exit Left while incoming items enter from Right. When moving `Previous`, outgoing items exit Right while incoming items enter from Left.
- **Inertial Momentum & Settle**: Carousels and drag surfaces must respect gesture velocity, provide subtle elastic drag (0.25), and settle with a gentle 4–8px overshoot into place.
- **Micro-Interaction Hierarchy**:
  - Micro-taps / Buttons: 150–300ms (snappy spring, mass 0.15).
  - Material Glass panels: 400–600ms (smooth easeOut).
  - Image / Scene transitions: 700–1200ms (cinematic cubic-bezier `[0.16, 1, 0.3, 1]`).

## 2. Choreographed Storytelling Sequence
- Sequence elements meaningfully: **`IMAGE → CONTEXT → EMOTION`**.
  1. Photo transition leads the scene.
  2. Geographic and metadata tags appear immediately.
  3. Narrative quotes and conversational text crossfade into view.
  4. Glass controls and reviews settle into place last.

## 3. Performance & Accessibility
- Always respect `prefers-reduced-motion: reduce`.
- Use GPU-accelerated transforms (`transform: translate3d`, `opacity`, `scale`) and avoid triggering expensive DOM reflows.
- Auto-progression must automatically pause upon hover, drag, touch, or keyboard focus.
