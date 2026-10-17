# Sarayu Ghat Invitation

Build a premium Indian wedding invitation microsite — a single page a guest opens on their phone. A luxury product people pay for; finish matters far more than feature count. Benchmark: invitima.com.

THE AESTHETIC — "Sarayu Ghat"
Palette: saffron and deep marigold with aged temple gold and river blue.
Scene: a riverside temple ghat at dusk in the style of classical Ramayana painting — carved sandstone steps descending to still water, a tiered shikhara temple, rows of lit diyas floating on the river, strung marigold, a bow-and-arrow motif carved into stone, distant palace spires, warm orange sky.
Feeling: epic, devotional, golden.
OPENING: A FOLDED INVITATION CARD. A thick hand-made card with a carved temple arch embossed on its cover and the wax seal holding it shut. It turns open on its spine when tapped.

THE ARTWORK IS THE MOST IMPORTANT PART
Photoreal and painterly, in the register of high-end wedding stationery: carved sandstone with real depth and shadow in the recesses, water with reflections, warm practical light from diyas, dense crafted detail in the carving.
NOT acceptable: flat vector, clip art, stock-photo look, plain gradients, or geometric pattern standing in for a scene.

Four image files:
1. sealed-backdrop.jpg (1536x1024) — THE CLOSED CARD, centred and filling most of the frame, resting on carved stone with diyas and marigold around it. COMPOSE IT AROUND THE CARD: it is what the guest taps, and the image will be split down the middle so the two halves open like a book, so keep the card centred and symmetrical.
2. hero-backdrop.jpg (1536x1024) — the ghat scene revealed when it opens. THE MIDDLE MUST BE OPEN AND QUIET: the couple's names and a date card are drawn on top of it.
3. wax-seal.png (816x816) — A RICHLY TEXTURED WAX SEAL: thick dimensional wax with soft irregular scalloped edges where it spread when pressed, glossy sheen, subtle depth. Deep saffron-red wax. Pressed into it a RAISED GOLD ORNAMENT — a lotus-and-leaf ring rendered as embossed metal with its own highlights and shadow. LEAVE THE MIDDLE CLEAR: the ornament is a ring around an empty centre about 40% of the width, where our engine prints the couple's initials as live text. Gold ornament YES, lettering NO — no initials, no monogram, no letters anywhere. Transparent background, viewed straight down.
4. paper-texture.jpg (800x800) — subtle tileable handmade-paper grain in the palette.

Every image: no text, no words, no lettering, no numbers, no watermarks, no human faces.

CRITICAL — THE WHOLE PAGE MUST BE AS RICH AS THE OPENING
Most invitations look expensive for one screen then collapse into flat colour. Do not do that. Every section below the hero must carry the same craft: a tinted paper ground rather than flat colour, ornamental gold dividers between sections, carved corner flourishes framing blocks, drop caps or gold rules on headings, and generous spacing. The guest should feel they are still inside the same painted world as they scroll.

THE EXPERIENCE
1. Sealed opening: the painted closed card fills the screen with a small "Tap to open" plate and the couple's names in gold script beneath. No navigation, no scrollbar. One tap turns it open over about 1.5s, weighted.
2. A cinematic reveal of about 6s: the ghat settles, names fade up, the page becomes scrollable. One continuous motion, not a second screen.
3. Music fades in over 8s to about 60% volume, only after the tap; prime it muted on the tap gesture. Seal sound and music as two separate audio elements.
4. A scratch-to-reveal date card: gold foil the guest rubs; at ~38% cleared it auto-reveals the date and time then unmounts. Keyboard accessible. When it reveals, fire a short burst of gold confetti from either side, then begin a slow marigold petal shower.
5. Scrollable sections, each richly framed: the families (parents and grandparents named on both sides), venue with map link, live countdown, the ceremony programme (Mehendi, Haldi, Wedding, Reception) each with its own time and dress code, a photo gallery, a blessing verse, travel and accommodation notes, RSVP, and a closing panel.

BUILD RULES
Mobile first, 320px to 4K. All colours as CSS custom properties on :root, never hardcoded. Two Google Fonts: a display serif for names, a clean sans for labels. Anchor the countdown and all dates to an explicit +05:30 offset. Respect prefers-reduced-motion. Placeholders: "Aarav & Anaya", 14 February 2027, "The Grand Pavilion".

FINISH BY TELLING ME
1. Every colour as a hex value labelled: accent, accent-soft, tint, paper, paper-light, paper-dark, highlight, surface, scratch-foil, scratch-ink, background, foreground, muted, border.
2. The two Google Font names.
3. Where the four image files are.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cb528192-750a-4318-9449-669bba6b0fc8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
