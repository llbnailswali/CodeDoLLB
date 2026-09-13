---
name: Obsidian Tactile
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
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  screen-padding-mobile: 1rem
  screen-padding-tablet: 2rem
  screen-padding-desktop: 3rem
---

## Brand & Style

This design system targets modern software engineers, technical learners, and developers seeking deep, distraction-free mastery. The visual environment evokes an elite late-night terminal: focused, immersive, hyper-refined, and tactically grounded. It rejects flat clinical sterility and hyper-glossy skeuomorphism in favor of soft, dark tactile neumorphism—where surfaces appear carved directly out of matte slate and volcanic obsidian slabs.

The interface pairs disciplined technical austerity with subtle physical depth. Micro-interactions utilize soft specular highlights along top edges, extruded pill surfaces, and restrained bioluminescent aura glows in indigo and violet to reward progression and interactive feedback.

## Colors

The palette is engineered specifically for deep-focus environments, minimizing ocular fatigue over extended study and coding sessions.

### Canvas & Surface Architecture
- **Canvas Base (`#0B0F19`)**: Absolute foundation layer for page backgrounds.
- **Surface Layer 1 (`#111621`)**: Primary card containers, recessed panels, and base list backgrounds.
- **Surface Layer 2 (`#151B28`)**: Elevated tactile cards, interactive modules, and segmented rails.
- **Surface Layer 3 (`#181E2C`)**: Active elevated cards, floating dialogs, app bars, and high-tier overlays.

### Accents & Luminescence
- **Primary Accent (`#6366F1`)**: Indigo for active states, terminal cursors, interactive nodes, and dominant focus rings.
- **Secondary Accent (`#8B5CF6`)**: Soft violet for streaks, milestones, compilation states, and secondary gradients.
- **Gradient Fill**: Linear gradient at 135 degrees from `#6366F1` to `#8B5CF6` used selectively for hero actions, progress completions, and master badge unlocks.
- **Accent Aura**: Diffuse drop glows (`rgba(99, 102, 241, 0.22)`) restricted exclusively to active indicators and completed states.

### Text & Informational States
- **Primary Text (`#F1F3F8`)**: High legibility, crisp contrast for code snippets, headlines, and key input labels.
- **Secondary Text (`#A9AFBD`)**: Subtitles, body prose, secondary metadata, and parameter descriptions.
- **Muted Text (`#747C8E`)**: Timestamps, non-active tags, inline hints, and structural code brackets.
- **Locked / Inactive (`#626A7A`)**: Inaccessible curriculum units, locked achievements, and deactivated states.
- **Semantic Feedback**: Success `#10B981`, Error `#F43F5E`, Warning `#F59E0B`.

## Typography

Typography balances clean geometric precision with effortless mobile readability.

- **Headlines (Outfit)**: Used for view titles, lesson milestones, and card headers. The geometric proportions and distinct terminals imbue a futuristic yet mature engineering presence.
- **Body & Controls (Plus Jakarta Sans)**: Highly legible at small scales across OLED displays. Warm humanist curves prevent technical fatigue during long code analysis.
- **Letter Spacing**: Tightened on large display numbers and headings to form compact visual stamps; loosened deliberately on sub-12px uppercase labels for high scan speed.

## Layout & Spacing

The layout is built upon a rigid 4px/8px modular rhythm, prioritizing hand-friendly tap zones and vertical density optimization for mobile-first learning contexts.

### Grid & Breakpoints
- **Mobile (< 640px)**: Single-column flow with fluid-width containers. Persistent bottom navigation bar with safe-area hardware insets. Gutter: 16px (`1rem`). Outer margin: 16px (`1rem`).
- **Tablet (640px - 1024px)**: 6-column fluid structure. Two-pane code execution workspace (interactive terminal on bottom/side). Gutter: 24px (`1.5rem`). Outer margin: 32px (`2rem`).
- **Desktop (> 1024px)**: 12-column grid capped at 1280px maximum content width. Left rail navigation (260px fixed), center content stream (max 720px), and optional contextual code runner inspector (300px).

### Spacing Hierarchy
- Content items within cards take `0.75rem` (`12px`) separation.
- Cards within a module sequence take `1rem` (`16px`) gaps.
- Distinct curriculum stages or structural sections take `2rem` (`32px`) gaps.

## Elevation & Depth

Visual depth is achieved through tactile neumorphism calibrated for dark backgrounds: replacing harsh drop shadows with compound inner edge-highlights, dual-source ambient shadows, and surface elevation stacking.

### Surface Elevation Levels
- **Level 0 (Flat / Recessed)**: `#0B0F19`. Deep canvas. Recessed input wells, code editor gutters, and unselected rail tracks use an inset drop shadow: `inset 0 2px 4px rgba(0, 0, 0, 0.6)`.
- **Level 1 (Ground Surface)**: `#111621`. Base cards and module trays. Border: 1px solid `rgba(255, 255, 255, 0.04)`. Top bevel light: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`. Outer shadow: `0 4px 16px rgba(0, 0, 0, 0.4)`.
- **Level 2 (Tactile Raised)**: `#151B28`. Interactive cards, playable code snippets, and active challenge panels. Border: 1px solid `rgba(255, 255, 255, 0.07)`. Dual shadow: `0 -1px 0 rgba(255, 255, 255, 0.09) inset, 0 8px 24px rgba(0, 0, 0, 0.5)`.
- **Level 3 (Floating Overlay / Dialog)**: `#181E2C`. Modals, floating action docks, and tooltips. Border: 1px solid `rgba(255, 255, 255, 0.12)`. Outer shadow: `0 16px 40px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 255, 255, 0.1)`.

### The Accent Aura
Active states do not emit white light; they cast a diffuse, low-intensity indigo halo:
`box-shadow: 0 0 24px -4px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)`.

## Shapes

The design uses a roundedness level of 2 (0.5rem base radius). Corner radii stay tightly proportional to component scale:
- Small components (Chips, badges, code tokens): `0.375rem` (`6px`) to `0.5rem` (`8px`).
- Medium components (Form fields, interactive buttons, list rows): `0.75rem` (`12px`).
- Major structural containers (Lesson modules, code blocks, card wraps): `1rem` (`16px`).
- High-level sheets and modal drawers: `1.5rem` (`24px`).
- Floating utility pills (Status tags, streak counts): Fully pill-shaped (`9999px`).

## Components

### Buttons
- **Primary Action**: Background of `linear-gradient(135deg, #6366F1, #8B5CF6)`. Text is `#FFFFFF` with Outfit font-weight 600. Features an inner top-edge highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.25)`) and an aura drop shadow (`0 4px 18px rgba(99, 102, 241, 0.35)`). On press, translateY by 1px and shadow compresses.
- **Secondary Tactile**: Background `#151B28`. Text `#F1F3F8`. Border: `1px solid rgba(255, 255, 255, 0.08)`. Subtle top rim light: `inset 0 1px 0 rgba(255, 255, 255, 0.08)`.
- **Ghost / Locked**: Background `transparent`. Text `#626A7A`. Border: `1px solid rgba(98, 106, 122, 0.2)`.

### Cards & Modules
- Structured on `#111621` or `#151B28`.
- Contains a top highlight line of `1px` gradient border shifting from `rgba(255, 255, 255, 0.1)` on the left to `rgba(255, 255, 255, 0.02)` on the right.
- In lesson cards, locked states decrease opacity to 0.65 with an inner grayscale tint and a locked icon in `#626A7A`.

### Code Blocks & Snippet Sandboxes
- Recessed surface `#0B0F19` with a delicate outer hairline border `#181E2C`.
- Syntax highlighting uses calibrated low-glare pastels over the dark background.
- Left-side line numbers in `#626A7A`. Active line highlight has a background of `rgba(99, 102, 241, 0.08)` with a 2px left border in `#6366F1`.

### Chips & Syntax Tags
- Compact height (`28px`), font size `12px`.
- Background `#151B28`, text `#A9AFBD`, border `1px solid rgba(255, 255, 255, 0.06)`.
- Selected state adopts accent aura tint: background `rgba(99, 102, 241, 0.15)`, text `#F1F3F8`, border `1px solid #6366F1`.

### Input Fields
- Recessed well style: `#0B0F19` background.
- Inset shadow: `inset 0 2px 4px rgba(0, 0, 0, 0.5)`.
- Border: `1px solid rgba(255, 255, 255, 0.07)`.
- Focus state: border shifts to `#6366F1` with an outer ambient glow of `0 0 0 3px rgba(99, 102, 241, 0.2)`. Text: `#F1F3F8`. Placeholder: `#747C8E`.

### Selection Controls (Checkboxes & Radios)
- Unchecked: `#111621` background, `1px solid rgba(255, 255, 255, 0.14)`.
- Checked: `#6366F1` fill, bright white check icon, paired with a subtle violet-indigo perimeter halo.

### Progress Gauges & Lesson Paths
- Background track: recessed `#0B0F19` with a subtle inner shadow.
- Indicator fill: gradient from `#6366F1` to `#8B5CF6` with a soft leading-edge glow point.