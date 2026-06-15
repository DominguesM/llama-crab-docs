---
name: llama-crab
colors:
    surface: "#fcf9f8"
    surface-dim: "#dcd9d9"
    surface-bright: "#fcf9f8"
    surface-container-lowest: "#ffffff"
    surface-container-low: "#f6f3f2"
    surface-container: "#f0eded"
    surface-container-high: "#eae7e7"
    surface-container-highest: "#e5e2e1"
    on-surface: "#1c1b1b"
    on-surface-variant: "#5b4137"
    inverse-surface: "#313030"
    inverse-on-surface: "#f3f0ef"
    outline: "#8f7065"
    outline-variant: "#e4beb1"
    surface-tint: "#a73a00"
    primary: "#a73a00"
    on-primary: "#ffffff"
    primary-container: "#ff5c00"
    on-primary-container: "#521800"
    inverse-primary: "#ffb59a"
    secondary: "#0061a5"
    on-secondary: "#ffffff"
    secondary-container: "#0095f8"
    on-secondary-container: "#002b4e"
    tertiary: "#006e0a"
    on-tertiary: "#ffffff"
    tertiary-container: "#00aa17"
    on-tertiary-container: "#003402"
    error: "#ba1a1a"
    on-error: "#ffffff"
    error-container: "#ffdad6"
    on-error-container: "#93000a"
    primary-fixed: "#ffdbce"
    primary-fixed-dim: "#ffb59a"
    on-primary-fixed: "#370e00"
    on-primary-fixed-variant: "#802a00"
    secondary-fixed: "#d2e4ff"
    secondary-fixed-dim: "#9fcaff"
    on-secondary-fixed: "#001d36"
    on-secondary-fixed-variant: "#00497e"
    tertiary-fixed: "#75ff68"
    tertiary-fixed-dim: "#4ce346"
    on-tertiary-fixed: "#002201"
    on-tertiary-fixed-variant: "#005306"
    background: "#fcf9f8"
    on-background: "#1c1b1b"
    surface-variant: "#e5e2e1"
typography:
    headline-xl:
        fontFamily: Plus Jakarta Sans
        fontSize: 48px
        fontWeight: "800"
        lineHeight: 56px
        letterSpacing: -0.02em
    headline-lg:
        fontFamily: Plus Jakarta Sans
        fontSize: 32px
        fontWeight: "700"
        lineHeight: 40px
        letterSpacing: -0.01em
    headline-md:
        fontFamily: Plus Jakarta Sans
        fontSize: 24px
        fontWeight: "700"
        lineHeight: 32px
    body-lg:
        fontFamily: Plus Jakarta Sans
        fontSize: 18px
        fontWeight: "400"
        lineHeight: 28px
    body-md:
        fontFamily: Plus Jakarta Sans
        fontSize: 16px
        fontWeight: "400"
        lineHeight: 24px
    label-mono:
        fontFamily: JetBrains Mono
        fontSize: 14px
        fontWeight: "500"
        lineHeight: 20px
        letterSpacing: 0.05em
    headline-xl-mobile:
        fontFamily: Plus Jakarta Sans
        fontSize: 36px
        fontWeight: "800"
        lineHeight: 44px
rounded:
    sm: 0.25rem
    DEFAULT: 0.5rem
    md: 0.75rem
    lg: 1rem
    xl: 1.5rem
    full: 9999px
spacing:
    base: 8px
    xs: 4px
    sm: 12px
    md: 24px
    lg: 48px
    xl: 80px
    gutter: 24px
    margin-mobile: 16px
    margin-desktop: 64px
---

## Brand & Style

This design system is built for a tech-forward audience that values high-performance tools without the cold, clinical aesthetic of traditional enterprise software. The brand personality is **vibrant, energetic, and slightly rebellious**, merging the precision of development with a playful, illustrative spirit.

The visual style is **Modern-Tactile with a hint of Neo-Brutalism**. It utilizes high-saturation colors and bold, thick outlines to create a "sticker-like" interface that feels physical and interactive. The goal is to evoke a sense of creative momentum, making the user feel like they are building something fun, not just performing a task. Large typography, generous whitespace, and intentional use of character-driven illustrations (llamas, crabs, and code glyphs) distinguish this system from sterile competitors.

## Colors

The palette is derived directly from the core brand assets to ensure maximum visual cohesion.

- **Primary (Crab Orange):** Used for primary actions, critical highlights, and brand momentum.
- **Secondary (Electric Blue):** Used for links, secondary information, and background depth.
- **Tertiary (Lime Green):** Reserved for success states, "go" signals, and coding-related accents.
- **Accent (Sunny Yellow):** High-visibility callouts, warnings, and decorative elements.

The system is designed for a **Light Mode** default experience. It utilizes a clean, off-white background to provide a high-contrast canvas for the vibrant brand colors. Surfaces use tonal shifts and subtle neutral grays to maintain an organized, layered feel. While the colors are high-saturation, they are balanced by generous white space to ensure long-term legibility.

## Typography

The typography strategy balances friendly curves with technical precision.

**Plus Jakarta Sans** is the primary typeface, chosen for its soft, geometric terminals and modern readability. It should be used for all UI elements and headlines. For headlines, we use the ExtraBold (800) weight to create a strong visual hierarchy that matches the bold brand style.

**JetBrains Mono** is utilized for functional labels, metadata, and code snippets. This introduces the "coding" theme into the UI systematically, reminding the user of the product's technical roots while providing high clarity for dense data.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a base-8 rhythm.

- **Desktop:** 12-column grid with a maximum content width of 1440px.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins.

Spacing is generous to maintain the "playful" feel; avoid cramped layouts. Elements should breathe, using `spacing.lg` for section separations and `spacing.md` for internal component padding. Containers should use dynamic padding that scales based on the viewport to ensure the interface never feels "heavy" on smaller devices.

## Elevation & Depth

We avoid traditional realistic shadows in favor of **Tonal Layering and Hard Offset Shadows**.

1.  **Surfaces:** Backgrounds use the lightest neutral. Interactive cards use a slightly darker "Surface-Container" tone to distinguish them from the base layout.
2.  **The "Sticker" Effect:** Primary buttons and active cards feature a 2px solid border in a high-contrast color (e.g., Orange on white/light gray) or a 4px hard-drop shadow with 100% opacity to simulate a physical button.
3.  **Backdrop Blurs:** When modals are active, use a high-saturation color tint (Electric Blue) with a 20px blur for the overlay to maintain the vibrant energy even when content is focused.

## Shapes

The shape language is consistently rounded to echo the "llama" and "bird" motifs from the brand.

- **Cards and Containers:** Use `rounded-lg` (1rem/16px) to create a friendly, approachable structure.
- **Buttons and Inputs:** Use `rounded-xl` (1.5rem/24px) for a soft, pill-like interaction surface.
- **Decorative Elements:** Use fully circular (pill) shapes for tags, chips, and notification badges.

Avoid sharp 90-degree corners entirely; every terminal should have a discernible radius to maintain the brand's softness.

## Components

### Buttons

Buttons are the primary vehicle for color.

- **Primary:** Bright Orange background, Dark text, 4px hard dark shadow. On hover, the shadow disappears and the button shifts 2px down/right to simulate a physical press.
- **Secondary:** Transparent background with a 2px Electric Blue border.

### Chips & Tags

Use the Tertiary Lime Green for "Active" states and soft neutral tones for inactive states. These should always use `label-mono` typography.

### Input Fields

Inputs use a bright white background with a 2px border that turns Lime Green on focus. Error states use the Red variant of the brand palette with a subtle "shake" animation.

### Cards

Cards are "Surface-Container" blocks. They should include a "decorative glyph" (a small `</>` icon or a crab claw) in the bottom right corner at 10% opacity to reinforce the brand themes.

### Decorative Elements

- **Floating Glyphs:** Use `+ +` and `</>` symbols from the logo as floating background elements in headers.
- **Crustacean Borders:** Use a subtle "cracked shell" zig-zag pattern for horizontal dividers to play on the crab/egg theme.
