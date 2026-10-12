# Color Theme

## Current theme: Night Sands

| Swatch | Hex | CSS variable | Used for |
|---|---|---|---|
| ![](https://placehold.co/24x24/FAE8B4/FAE8B4.png) | `#FAE8B4` | `--sand-light` | Page background, text on dark surfaces (buttons, footer, table header), slide-out menu |
| ![](https://placehold.co/24x24/CBBD93/CBBD93.png) | `#CBBD93` | `--sand` | Navbar, card and table borders, table stripes |
| ![](https://placehold.co/24x24/80775C/80775C.png) | `#80775C` | `--sand-dark` | Hover color for buttons and service names, form field borders |
| ![](https://placehold.co/24x24/574A24/574A24.png) | `#574A24` | `--sand-deep` | Body text, buttons, footer, table header, photo frame behind carousel images |

The variables are defined once at the top of `styles.css`; change a hex value
there to recolor the whole site. `thank-you.html` has its own small `<style>`
block with the same hex values.

### Contrast notes

- `#574A24` on `#FAE8B4` is 7.2 : 1, so it's safe for any text size.
- `#574A24` on `#CBBD93` is 4.7 : 1, so it's safe for normal text (used in the navbar).
- `#80775C` on `#FAE8B4` is only 3.7 : 1, so it's used only for large or bold text and
  borders, never for small body text.
- Muted text (`.text-muted`) is `#574A24` at 85% opacity, which comes out to about 5 : 1.

### Intentional exceptions

- The full-screen photo viewer uses a black background with white controls,
  so photos are shown without a color cast.
- The cards and the About Us box use a translucent white layer over the
  page background to lift them slightly.

## Previous theme (before Night Sands)

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
