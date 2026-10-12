# Color Theme

## Current theme

| Swatch | Hex | CSS variable | Used for |
|---|---|---|---|
| ![](https://placehold.co/24x24/D1D0D0/D1D0D0.png) | `#D1D0D0` | `--color-light` | Page background, text on dark surfaces (buttons, footer, table header), slide-out menu |
| ![](https://placehold.co/24x24/988686/988686.png) | `#988686` | `--color-mid` | Navbar, card and table borders, table stripes |
| ![](https://placehold.co/24x24/5C4E4E/5C4E4E.png) | `#5C4E4E` | `--color-accent` | Footer, hours-table header, photo frame behind carousel images, button hover, muted text, form field borders |
| ![](https://placehold.co/24x24/000000/000000.png) | `#000000` | `--color-dark` | Body text, buttons (Contact Us, Send Message), active language button |

The variables are defined once at the top of `styles.css`; change a hex value
there to recolor the whole site. `thank-you.html` has its own small `<style>`
block with the same hex values.

### Contrast notes

- `#000000` on `#D1D0D0` is 13.6 : 1, and on `#988686` it's 6.1 : 1, so black is safe for any text size on either.
- `#5C4E4E` and `#D1D0D0` are 5.1 : 1 against each other, so they work for normal text either way around (used for muted text,
  the footer and button hovers).
- `#988686` is too close in lightness to both `#D1D0D0` (2.2 : 1) and
  `#5C4E4E` (2.3 : 1) for text, so it's only used as a surface (the navbar)
  and for borders, always with black text on it. This is also why navbar
  links underline on hover instead of changing color.

### Intentional exceptions

- The full-screen photo viewer uses a black background with white controls,
  so photos are shown without a color cast.
- The cards and the About Us box use a translucent white layer over the
  page background to lift them slightly.

## Previous theme: Night Sands

| Hex | Used for |
|---|---|
| `#FAE8B4` | Page background, text on dark surfaces, slide-out menu |
| `#CBBD93` | Navbar, card and table borders, table stripes |
| `#80775C` | Hover color for buttons and service names, form field borders |
| `#574A24` | Body text, buttons, footer, table header, carousel photo frame |

## Original theme (before Night Sands)

| Hex | Used for |
|---|---|
| `#E2DACF` | Page background, navbar, text on dark buttons |
| `#070D08` | Body text, buttons, language toggle, carousel photo frame |
| `#C95502` | Accent: hover color for buttons and links, "View photos" hints |
| `#FFFFFF` | Button hover text, carousel "Full screen" button text |
| `#212529` | Footer and hours-table header (Bootstrap `bg-dark` / `table-dark`) |
| `#FBA327` | Defined for `header` in `styles.css`, but no page used it |
| `#FED17C` | Defined as footer text, but overridden by Bootstrap's white |
| `#F8F9FA` | Thank-you page background |
