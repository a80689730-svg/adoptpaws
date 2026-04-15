# Design Brief: AdoptPaws

## Tone & Aesthetic
Warm, trustworthy, emotionally connected. Modern editorial with organic softness. Professional yet approachable.

## Differentiation
Pet-centric color language. Real pet imagery as design heroes. Warm green growth accent expresses adoption/healing. Soft blue evokes trust & calm.

## Color Palette

| Name | Light | Dark | Intent |
|------|-------|------|--------|
| Primary (Trust Blue) | 0.55 0.07 260 | 0.65 0.08 260 | Navigation, primary CTAs, trust signals |
| Secondary (Growth Green) | 0.65 0.08 150 | 0.70 0.09 150 | Action buttons, adoption callouts, accent line |
| Accent (Warm Terracotta) | 0.60 0.14 45 | 0.68 0.12 45 | Emotional warmth, success states, highlights |
| Background | 0.98 0.01 200 | 0.14 0.01 240 | Clean, breathable space |
| Foreground | 0.20 0.02 240 | 0.94 0.01 200 | Text, high contrast |
| Muted | 0.92 0.02 220 | 0.25 0.01 245 | Section dividers, subtle backgrounds |

## Typography
- **Display**: General Sans (warm geometric, headlines, hero text)
- **Body**: DM Sans (friendly, legible, 400/500/600 weights)
- **Mono**: Geist Mono (legal text, process steps, code)

## Elevation & Depth
- **L0 (Base)**: `bg-background` white/near-white
- **L1 (Card)**: `bg-card` with `shadow-pet-card` (4px blur, 8% opacity black)
- **L2 (Hover/Interactive)**: `shadow-pet-hover` (12px blur, 12% opacity black) + border-secondary bottom

## Structural Zones

| Zone | Surface | Border | Intent |
|------|---------|--------|--------|
| Header | card with subtle shadow | border-b secondary-light | Navigation, logo, warm accent line |
| Hero | background with pet image overlay | none | Emotional first impression, real pet photo |
| Content | background with muted alternation | section borders in muted | Information hierarchy, breathing room |
| Pet Cards | card with shadow | hover: border-secondary bottom | Interactive gallery, hover shows depth |
| CTA Buttons | secondary (green) background | rounded-lg | Adoption actions, clear hierarchy |
| Footer | muted/30 background | border-t secondary | Contact, links, warm closure |

## Spacing & Rhythm
- Base unit: 0.5rem (Tailwind sm)
- Content padding: 2rem (mobile), 3rem (tablet), 4rem (desktop)
- Card gap: 1.5rem (mobile), 2rem (desktop)
- Section vertical: 4rem (mobile), 6rem (desktop)

## Component Patterns
- **Pet Cards**: Floating white card, real pet photo, soft-rounded corners, title/breed/age overlay, green border-bottom on hover
- **Buttons**: Secondary (green) for "Adopt Now", Primary (blue) for navigation/secondary actions, full-width on mobile
- **Forms**: Light input fields with blue focus ring, green submit button
- **Hero**: Image left (desktop)/top (mobile), warm copy right/bottom, soft gradient overlay on image

## Motion & Interaction
- Hover state: 0.3s cubic-bezier(0.4, 0, 0.2, 1) smooth transition
- Pet card hover: scale-up (1.02), shadow elevation, border reveal
- Button click: smooth 0.2s background color shift
- Fade-in on scroll (optional, JS-driven)

## Constraints
- No full-page gradients; use layered surfaces instead
- No harsh shadows; all shadows use soft black with low opacity
- Pet imagery is hero; design supports, never competes
- Mobile-first responsive (sm, md, lg breakpoints)
- Light mode primary; dark mode supported via `.dark` class
- Warm accent (terracotta) used sparingly — highlights, success states only

## Signature Detail
Warm green bottom border (secondary) on pet cards and hover states. Expresses adoption/growth while maintaining professional warmth. 3px solid, instant reveal on hover, paired with shadow elevation for emotional depth.
