# TripKario Hero Visual Fix Report

**Date**: 2026-08-22  
**Target Area**: Desktop Hero Headline & Scene Navigation Controls  

---

## 1. Headline Descender Clipping Root Cause & Resolution

### Root Cause
1. **Constrained Line Height**: The desktop headline lines used `leading-[0.95]`. For large-scale editorial serif type (`clamp(2.8rem, 7vw + 0.5rem, 7.5rem)`), a line-height multiplier less than `1.0` sets the element's box height to less than the actual glyph bounding box.
2. **Overflow Mask Clipping**: The wrapping lines were placed inside `<span className="block overflow-hidden">` elements to support the upward reveal animation (`initial={{ y: '110%' }} animate={{ y: 0 }}`). Because the parent had `overflow: hidden` without bottom padding or descender clearance, glyph descenders (the tail of `"g"` in `"go"`, bottom loop of `"y"`, and the bottom curve and dot of `"?"`) as well as the text drop shadows (`drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]`) were physically clipped by the bounding edge of the container.

### Exact Fix Implemented
* Maintained full typography scale and hierarchy (`clamp(2.8rem, 7vw + 0.5rem, 7.5rem)`).
* Increased `leading` from `0.95` to `1.04` to provide natural line-box height.
* Added `pb-4 -mb-4 pt-1` to the clipping container and `pb-1` to the animated text element, ensuring ample descender room and drop-shadow breathing room without affecting surrounding layout geometry.
* Entrance animation settles cleanly at `y: 0` with full visibility of all glyphs.

---

## 2. Desktop Navigation Controls Contrast & Ergonomics

### Visual Redesign
* **Surface**: Switched from pale low-contrast glass to a rich dark charcoal translucent backdrop (`bg-[#141816]/80 backdrop-blur-md`).
* **Border & Depth**: Added subtle warm white border (`border-white/30`) with a dark soft shadow (`shadow-lg shadow-black/40`) to maintain clear definition against both deep mountain shadows and bright skies.
* **Icon & Color**: Set warm white icon `#FAF4E8` (`w-4 h-4`).
* **Hover Interaction**: Transitions seamlessly to TripKario's terracotta accent (`hover:bg-[#C85D3A] hover:border-[#C85D3A] hover:text-white`).
* **Hit Target & Accessibility**:
  * Meets ≥ 44x44px target standard (`w-11 h-11 min-w-[44px] min-h-[44px]`).
  * Accessible attributes: `aria-label="Previous destination"` and `aria-label="Next destination"`.
  * Keyboard focus ring: `focus-visible:ring-2 focus-visible:ring-[#C85D3A]`.

---

## 3. Desktop Validation

* **1280x800**: Full glyph rendering for "Where will you" and "go next?", buttons aligned with journey counter.
* **1440x900**: Stable typography box, zero descender truncation, terracotta hover response.
* **1920x1080**: Large display typography maintains proportional descender clearance.
* **Mobile (360px – 430px)**: Mobile hero remains untouched and stable.
