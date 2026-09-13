---
name: Obsidian Night Tactical
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#ccbeff'
  on-tertiary: '#332664'
  tertiary-container: '#9587cc'
  on-tertiary-container: '#2c1f5c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#e7deff'
  tertiary-fixed-dim: '#ccbeff'
  on-tertiary-fixed: '#1e0e4e'
  on-tertiary-fixed-variant: '#4a3d7c'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 88rem
---

## Brand & Style
This design system establishes a high-performance, developer-centric environment built for deep-focus engineering workflows. It merges technical precision with tactile depth, targeting engineers, architects, and technical creators who work long hours under low ambient light.

The aesthetic philosophy balances dark tactile neomorphism with clean developer-tool utility. Rather than flat planar surfaces or harsh high-contrast white panels, interface planes feel milled, recessed, or gently raised from a deep cosmic obsidian substrate. The emotional resonance is calm, authoritative, deeply technical, and physically grounded. Physical depth cues—such as inner bevels, sunken command wells, and softly extruded switches—indicate interactive states without jarring sensory shifts.

## Colors
The palette is built upon a hierarchy of deep obsidian tones, punctuated by balanced indigo spectrum accents.

### Canvas & Surfaces
- **Canvas Base:** `#0B0F19` — The infinite bottom plane of the viewport.
- **Surface Level 1 (Default Cards / Panels):** `#111827` — Base structural cards and standard sidebars.
- **Surface Level 2 (Raised Modals / Menus):** `#151B29` — Floating overlays, popovers, and elevated tabs.
- **Surface Level 3 (Active / Hover States):** `#192033` — Actively targeted widgets, hovered list rows, and prominent cards.
- **Surface Recessed Primary (Code Workspaces):** `#0A0F18` — Main terminal planes, monospaced viewports, and recessed canvases.
- **Surface Recessed Secondary (Input Wells):** `#0D121D` — Text fields, search bars, and inset trays.

### Accent Hierarchy
- **Accent Primary:** `#6366F1` — Primary actions, active focus rings, critical indicators.
- **Accent Light / Hover:** `#818CF8` — Interactive hover states, secondary highlights.
- **Accent Soft:** `#A5B4FC` — Active badges, syntax keywords, subtle glow endpoints.
- **Accent Ambient:** `#C4B5FD` — Decorative focus glints, syntax entities, tertiary links.

### Typography & Border Tiers
- **Text Primary:** `#F8FAFC` — Headings, active values, high-emphasis text.
- **Text Secondary:** `#CBD5E1` — Body copy, field labels, metadata.
- **Text Muted:** `#94A3B8` — Supporting captions, inactive icons, helper text.
- **Text Subdued:** `#64748B` — Placeholder copy, disabled states, syntax comments.
- **Border Structural:** `rgba(255, 255, 255, 0.06)` — Structural divider lines, card perimeters.
- **Border Accent / Active:** `rgba(99, 102, 241, 0.2)` — Focused element outlines, highlighted tracks.

## Typography
The system employs a tri-font hierarchy to communicate structure, legibility, and technical information:
- **Outfit:** Governs high-level titles, display surfaces, and layout section headers. Its clean geometric curvature softens the technical ambiance while maintaining modern presence.
- **Plus Jakarta Sans:** Drives body text, operational descriptions, and standard UI interactions. Its humanist balance avoids visual fatigue across large blocks of documentation.
- **JetBrains Mono:** Dedicated to code viewports, micro-labels, metadata markers, badges, and numeric data displays.

All code blocks require strict proportional line heights matching `20px` or `22px` baselines to ensure aligned gutter numbering.

## Layout & Spacing
The layout follows a fluid 12-column grid anchored on a strict 4px/8px incremental spacing rhythm. Complex IDE and tooling views break into flexible docked panels rather than static document spreads.

### Grid & Breakpoints
- **Mobile (<768px):** 4-column layout with `16px` outer margins and `12px` gutters. Code panels convert to horizontally swipeable sheets or full-screen modal overlays.
- **Tablet (768px - 1024px):** 8-column layout with `20px` margins and `16px` gutters. Sidebar navigations collapse into icon-rail formats.
- **Desktop (>1024px):** 12-column layout with `24px` outer margins, `24px` gutters, and an optional maximum container cap of `1408px` (`88rem`) for content-driven dashboards.

Nested panels, toolbars, and code consoles maintain strict internal padding of `12px` (`space-md`) or `16px` (`space-base`) to avoid visual claustrophobia inside recessed viewports.

## Elevation & Depth
Elevation is realized through dual-light tactile neomorphism adjusted specifically for deeply dark canvases. Stark white drop shadows are strictly prohibited; depth is conveyed via the interplay of ambient occlusion underneath surfaces and soft micro-highlights on top borders.

### Extrusion (Raised Levels)
- **Level 1 (Panels & Cards):** Surface `#111827`. Box shadow: `0 4px 14px -2px rgba(0, 0, 0, 0.65), 0 1px 3px 0 rgba(0, 0, 0, 0.5)`. Top perimeter receives a 1px border of `rgba(255, 255, 255, 0.07)`.
- **Level 2 (Active Toolbars & Modals):** Surface `#151B29`. Box shadow: `0 12px 28px -4px rgba(0, 0, 0, 0.75), 0 4px 10px -2px rgba(0, 0, 0, 0.5)`. Border: 1px solid `rgba(255, 255, 255, 0.09)`.
- **Level 3 (Popovers & Context Menus):** Surface `#192033`. Box shadow: `0 20px 36px -6px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(99, 102, 241, 0.15)`.

### Inset Wells (Recessed Surfaces)
- **Editor Trays & Inputs:** Surface `#0A0F18` or `#0D121D`. Box shadow: `inset 0 2px 4px 0 rgba(0, 0, 0, 0.7), inset 0 0 1px 1px rgba(0, 0, 0, 0.4)`. Border: 1px solid `rgba(255, 255, 255, 0.04)`.
- **Active Focus Glow:** When an inset element gains focus, its inset shadow receives a soft indigo infusion: `inset 0 1px 2px 0 rgba(0, 0, 0, 0.8), 0 0 0 1px #6366F1, 0 0 16px -2px rgba(99, 102, 241, 0.25)`.

## Shapes
The system relies on compact, structured roundedness (`roundedness: 1`). Radii are kept modest to convey technical precision, avoid excessive organic playfulness, and maximize screen real estate in information-dense views.

- **Base Controls (`rounded`):** `4px` (`0.25rem`) for buttons, inputs, chips, checkboxes, and tabs.
- **Panels & Containers (`rounded-lg`):** `8px` (`0.5rem`) for code panels, modal dialogues, floating command palettes, and surface cards.
- **Large Overlays (`rounded-xl`):** `12px` (`0.75rem`) reserved strictly for detached parent views or floating contextual frames.

## Components

### Buttons
- **Primary Action:** Background `#6366F1`, text `#F8FAFC`. Subtle top inner highlight `inset 0 1px 0 rgba(255, 255, 255, 0.2)`. Shadow: `0 2px 8px rgba(99, 102, 241, 0.35)`. Hover shifts background to `#818CF8` with an expanded aura.
- **Secondary (Tactile Extruded):** Background `#151B29`, border `1px solid rgba(255, 255, 255, 0.06)`, text `#CBD5E1`. Shadow: `0 2px 4px rgba(0, 0, 0, 0.4)`. Hover elevates to `#192033` with text `#F8FAFC`.
- **Ghost / Tool Action:** Background `transparent`, text `#94A3B8`. Hover introduces background `#111827` and text `#F8FAFC`.

### Code Blocks & Editors
- Editor surfaces sit recessed on `#0A0F18` with an inner shadow `inset 0 2px 6px rgba(0, 0, 0, 0.6)`. 
- Borders are crisp `1px solid rgba(255, 255, 255, 0.05)`.
- Gutter line numbers render in `JetBrains Mono`, colored `#64748B`, highlighting to `#A5B4FC` alongside the active line cursor. The active line plane renders with a background tint of `rgba(99, 102, 241, 0.06)`.

### Input Fields & Search Wells
- Rendered as milled cutouts with background `#0D121D`, text `#F8FAFC`, placeholder `#64748B`.
- Default state has an inner shadow `inset 0 2px 4px rgba(0, 0, 0, 0.5)` and border `1px solid rgba(255, 255, 255, 0.05)`.
- Focused state applies border `1px solid #6366F1` with an outer indigo aura `0 0 12px rgba(99, 102, 241, 0.2)`.

### Chips & Badges
- Background `#111827`, border `1px solid rgba(99, 102, 241, 0.2)`.
- Text styled in `label-sm` with color `#A5B4FC`.
- Interactive chips receive a subtle `inset 0 1px 0 rgba(255, 255, 255, 0.05)`.

### Cards & Container Panels
- Surface `#111827` enclosed by a dual-line perimeter: structural border `1px solid rgba(255, 255, 255, 0.06)` paired with top hairline `rgba(255, 255, 255, 0.1)`.
- Headers within panels are anchored by a bottom divider line using `rgba(255, 255, 255, 0.04)`.

### Checkboxes & Radios
- Box/Circle frame sits inset using `#0D121D` with border `1px solid rgba(255, 255, 255, 0.12)`.
- Checked state fills with `#6366F1`, displaying a `#F8FAFC` checkmark and an ambient glow of `0 0 8px rgba(99, 102, 241, 0.4)`.

### Lists & Tree Views
- Tree rows feature full-width hover feedback shifting to `#151B29`.
- Selected files or nodes gain a left accent border `2px solid #6366F1`, background `#192033`, and text `#F8FAFC`.