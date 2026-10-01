Create a complete working **Text Destroyer** as a single `index.html` file.

IMPORTANT:
Everything must be contained inside ONE file:
* HTML
* CSS inside `<style>`
* JavaScript inside `<script>`

Do not create separate files.
Do not use React.
Do not use TypeScript.
Do not use external libraries or frameworks.

The result should be a fun, highly entertaining browser toy that can be opened directly in a browser and feels like a tiny arcade game living inside a webpage.

## CORE IDEA

The page should simulate a webpage containing different pieces of text.

A cartoon stickman appears on the page as a floating overlay.

The stickman can move around and destroy text using exaggerated, fictional, arcade-style weapons.

The destruction is purely visual and cartoon-like. No blood, gore, realistic injuries, or realistic violence.

## DEMO WEBPAGE

Create a nice-looking fake webpage containing:
* Navigation bar
* Large heading
* Several paragraphs
* Cards
* Buttons
* Article text
* Footer

This gives the stickman plenty of text to attack.

## STICKMAN

Create the stickman entirely with HTML/CSS/SVG or Canvas.

The stickman should have:
* head
* body
* arms
* legs
* simple face
* smooth animated walking
* idle animation (subtle breathing / bobbing)
* exaggerated attack animations for every weapon

The stickman should be displayed as a floating overlay above the webpage and must not affect the webpage’s layout.

Improve stickman movement so it feels lively and cartoon-like (slight bounce while walking, anticipation before attacking, recovery after attacking).

## TARGETING

The JavaScript should find text elements on the demo webpage.

When the user clicks “DESTROY”:
1. Select a text target and highlight it clearly (glow + pulse).
2. Send the stickman toward it with smooth movement.
3. Stop beside the target.
4. Aim at it with clear body language.
5. Perform the selected attack with good timing and anticipation.
6. Play the destruction animation.
7. Visually remove/disintegrate the target into particles.
8. Return to idle with a short recovery pose.

Add occasional playful floating messages such as:
* “TARGET ACQUIRED”
* “CHAOS MODE”
* “TEXT DESTROYED”
* “STICKMAN READY”
* “COMBO!”

## WEAPONS

Create a weapon selector containing:
* Pistol
* Machine Gun
* Bomb
* Rocket
* Laser
* Hammer
* Fireball
* Lightning
* Eraser
* Meteor
* Random

Every weapon must have a unique, exaggerated cartoon animation with improved timing, juice, and feedback.

### PISTOL
Stickman aims → small muzzle flash → projectile travels → text shakes → breaks into particles.

### MACHINE GUN
Rapid fire with multiple muzzle flashes, bullet trails, impact flashes, continuous text shaking, and multiple particle bursts.

### BOMB
Stickman throws a cartoon bomb in a nice arc. Large cartoon explosion on impact. Target disappears into particles + smoke.

### ROCKET
Stickman launches a cartoon rocket with a thick smoke trail. Exaggerated explosion + screen shake on hit.

### LASER
Charging animation → bright laser beam → target dissolves into glowing particles.

### HAMMER
Oversized cartoon hammer → jump into the air → powerful downward swing → impact shockwave → text squashes, shakes and disappears.

### FIREBALL
Glowing cartoon fireball thrown toward the target. Target burns away with particles and smoke (completely fictional and non-realistic).

### LIGHTNING
Lightning bolt from above → screen flash → target shakes and turns into particles.

### ERASER
Giant cartoon eraser sweeps across the target. Text disappears behind the eraser.

### METEOR
Cartoon meteor falls from the top of the screen with a trail → large arcade-style explosion on impact.

### RANDOM
Randomly selects one of the above attacks.

## PARTICLES, EXPLOSIONS & EFFECTS

Create a lightweight particle engine using `requestAnimationFrame()`.

Particles should support:
* movement
* fading
* rotation
* gravity / falling
* outward explosion

Use different particle types:
* squares
* circles
* text fragments
* sparks
* smoke puffs

Improve:
* explosions (bigger, more satisfying, multi-layered)
* smoke trails
* sparks
* subtle screen shake
* strong target shake
* brief flash effects
* smooth transitions between states

Keep particle counts under control for performance.

## SOUND EFFECTS

Add subtle cartoon sound effects using **locally bundled audio assets** (data URIs or base64-encoded short sounds inside the single HTML file).  
Do **not** use external URLs.

Sounds should feel playful and arcade-like (muzzle, explosion, whoosh, impact, laser, etc.).

## OPTIONAL CONTROLS

Add to the control panel:
* Mute button
* Volume slider
* Reduced-motion mode (disables or heavily reduces screen shake, particles, and heavy animations)

## HUD

Add a small floating HUD on the webpage (separate from the main control panel) showing:

TEXT DESTROYER
Weapon: Rocket
Targets: 24
Destroyed: 7

The HUD must be removable (close button).

Also show a small combo counter that appears and grows:
COMBO x5

## CONTROL PANEL

Create a floating arcade-style control panel in the top-right corner containing:

TEXT DESTROYER

Weapon: [dropdown]

Buttons:
* DESTROY TEXT
* RANDOM ATTACK
* DESTROY ALL
* RESET

Stats:
Targets: X
Destroyed: Y

Toggle:
[ ] Chaos Mode

When Chaos Mode is on, also show a STOP button.

## CHAOS MODE

When enabled, the stickman automatically:
1. Finds a random text target
2. Walks toward it
3. Selects a random weapon
4. Attacks it
5. Finds another target
6. Continues

Do not run unlimited simultaneous animations. Keep particles and active effects under control.

## RESET

The RESET button must:
* restore every destroyed text element (store original state)
* remove all particles, explosions, projectiles, smoke
* stop chaos mode
* reset destroyed counter and combo
* return stickman to starting position
* clear floating messages

## DESIGN & POLISH

* Demo website: clean, modern, attractive
* Control panel & HUD: rounded corners, shadows, gradients, subtle glowing effects, smooth transitions
* Everything should feel playful, cartoon-like, and juicy
* Prioritize performance and clean code
* Stickman must stay within the viewport
* Responsive on desktop, tablet, and mobile

## CODE QUALITY

* Organize JavaScript into clear functions
* Use descriptive variable names
* Add helpful comments for important sections
* Avoid unnecessary global variables
* No placeholder functions
* No TODO comments
* Everything must work immediately when the file is opened in a browser

At the end, provide ONLY the complete `index.html` code.