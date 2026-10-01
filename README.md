# Stickman Destroyer

A small, fictional arcade toy that overlays a webpage with an animated stickman and playful text-destruction effects. It has two ways to run: open the standalone demo to try it locally, or load `stickman-destroyer/stickman.js` as a bookmarklet on another site.

## Try It Locally

Open [`stickman-destroyer/index.html`](stickman-destroyer/index.html) directly in a browser. No server, install, or external assets are required. The demo includes its own sample webpage; use **RESET** to restore it after an attack.

## Use The Bookmarklet

1. Deploy the `stickman-destroyer` folder to Vercel. Set the Vercel project root to `stickman-destroyer` so `stickman.js` is available at the deployment root. If your project root is the repository instead, use `/stickman-destroyer/stickman.js` in the bookmarklet URL below.
2. Create a browser bookmark and edit its name and URL. Paste this entire line into the URL/location field, replacing it with your deployment URL if needed:

   ```javascript
   javascript:(()=>{if(window.__textDestroyer){window.__textDestroyer.quit();return}const s=document.createElement('script');s.src='https://stickman-attack-nine.vercel.app/stickman.js?v='+Date.now();document.documentElement.appendChild(s)})()
   ```

3. Open a regular webpage and click the bookmark. The stickman and compact control panel will appear over the page. Click the bookmark again, or use the panel's close button, to remove it and restore the page text.

The `v=` value changes each time to avoid using a cached script. You can check the deployment by opening `https://stickman-attack-nine.vercel.app/stickman.js` directly; it should show JavaScript, not the demo HTML. Bookmarklets may be blocked on browser-internal pages, extension stores, or websites with strict Content Security Policies.

## Controls

- Select a weapon from the emoji bar. The former Bomb weapon is now **Ink Splash**.
- Click a word on the page to attack that word with the selected weapon.
- **DESTROY TEXT** attacks a page target; **RANDOM ATTACK** chooses a random weapon.
- **DESTROY ALL** runs a full-page barrage using the weapon set.
- **RESET** restores destroyed text and clears effects.
- **Chaos Mode** starts automatic attacks; use **STOP** to end it.
- Click the minus button to collapse or expand the panel. Click the X button to remove the bookmarklet.
- Use **Mute**, the volume slider, and **Reduced motion** to adjust audio and effects.

Keyboard shortcuts: `1`-`9` select the first nine weapons, `0` selects Random, `Space` or `F` attacks the nearest visible target with the selected weapon, `WASD` or arrow keys move the stickman, and `Escape` stops Chaos Mode.

## Files

- `stickman-destroyer/index.html` is the self-contained local demo, including its sample page, styles, and game code.
- `stickman-destroyer/stickman.js` is the standalone script loaded by the bookmarklet. Its interface is isolated in a Shadow DOM so the host page's styles do not interfere.
