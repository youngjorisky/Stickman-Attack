# Stickman Destroyer — Inline Webpage Toy

A single-file arcade toy: a cartoon stickman that walks around, picks targets, and obliterates text with exaggerated, fictional weapons. Built to sit **inside any webpage** as a floating overlay — it never touches the host page's layout.

## Quick start

### Install into your site

Option A — JSFiddle-style sandbox (nothing to deploy, just paste):
1. Open https://jsfiddle.net / CodePen / StackBlitz
2. Paste the full `index.html` in the HTML panel
3. Add any demo content (paragraphs, cards, headings) into the body
4. Run and play

Option B — Drop into your own page:
1. Put the two files in the same folder as your site:
   ```
   your-site/
     index.html          ← the demo page
     stickman-tool.js    ← the weapon stickman engine (no DOM deps)
   ```
2. Add this to your page's `<head>`:
   ```html
   <link rel="stylesheet" href="stickman-tool.css">
   <script src="stickman-tool.js" defer></script>
   ```
3. Add a container where the tool should mount:
   ```html
   <div id="stickman-container"></div>
   ```
4. Open the page. Done.

### Link to a CDN (untrusted, no build step)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/you/repo/stickman-tool.css">
<script src="https://cdn.jsdelivr.net/gh/you/repo/stickman-tool.js" defer></script>
```

## How to use (keyboard + mouse)

### Mouse
- **Left-click a text element** → it becomes the target (glows + pulses). The HUD updates to show the targets count and the currently highlighted target.
- **Click a weapon** in the weapon selector → it becomes the active weapon (highlighted, shown in the HUD).
- **Click `DESTROY TEXT`** (or press `Spacebar`) → the stickman runs to the target, aim, attacks, and disintegrates it.
- **Click `RANDOM ATTACK`** → a random weapon is chosen and used on the active target.
- **Press `A`** → random weapon on active target (keyboard shortcut).
- **Press `R`** → reset everything (restore text, clear particles, stop chaos).
- **Press `C`** → toggle Chaos Mode (auto-walk + auto-attack on any target).
- **Click `DESTROY ALL`** → every target on the page is destroyed in sequence.
- **Click `RESET`** → restore the original text, clear all particles, stop chaos, return the stickman to the center.

### Keyboard
| Key | Action |
|-----|--------|
| `1`–`9` | Select weapons 1–9 (the first nine in the list) |
| `Space` / `Enter` | Activate destroy on the active target |
| `R` | Reset |
| `C` | Toggle Chaos Mode |
| `M` | Mute / unmute sound |
| `Numpad` or `A` | Random attack on active target |
| `Escape` | Stop chaos mode |

### Controls
- **Mouse**: Click a weapon in the selector, click a text block, or click the HUD/panel buttons.
- **Keyboard**: `1`–`9` to pick a weapon, `Space` to destroy, `R` to reset, `C` for chaos, `M` for mute, `A` for random attack.
- **Targeting**: Hover over a text element to preview which will be the target; click to lock it.

## Project structure

```
stickman-destroyer/
  index.html          ← demo starter page (the "toy" shell)
  stickman-tool.js    ← engine: stickman, weapons, particles, sounds (no DOM deps)
  stickman-tool.css   ← player + HUD + panel styles (no layout impact)
  README.md           ← this file
```

## Design notes

- **No external URLs.** All assets are bundled (inline SVG for the stickman, data URIs for audio, no CDN).
- **No layout impact.** The stickman and HUD are `position: fixed` overlays, fully detached from the host page.
- **No global pollution.** The engine runs inside an IIFE/module scope; no new globals are added to `window` except the mount hook.
- **Performance.** Particle counts are capped (400 max), requestAnimationFrame-driven, and the framework is intentionally vanilla HTML/CSS/JS with no framework overhead.

## For the demo page

The demo page (`index.html`) contains a sample article about the DOT AIGA pictograms (inspired by the image layout) so the stickman has real text to target. It includes the petroglyph, the AIGA fountain symbol, a cycling pictogram, a video thumbnail, and a sidebar — giving the stickman plenty of interesting targets.

Change the demo text in `index.html` to whatever you like; the stickman engine is completely agnostic to the host page's content.
