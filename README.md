# Portfolio

A personal portfolio built with SvelteKit, TypeScript, and Tailwind CSS, deployed on Vercel.

## Interface

The portfolio uses a square terminal-style window with Catppuccin Mocha Crust surfaces, Lavender accents, and locally hosted JetBrains Mono at 16px. A `kielblockdev` ASCII wordmark sits above the profile. Icon buttons link to GitHub, LinkedIn, email, journal, education, certifications, and courses; the learning shortcuts open their category directly. It is a clickable website: file-style navigation opens overview, about, experience, learning, and contact views. Experience entries expand, learning categories switch, the window expands, and the email address can be copied. There is no command prompt.

Navigation uses URL fragments, so sections can be linked directly. The workspace opens expanded by default and fills the desktop viewport with small outer margins. Content is centered in the document pane, with a two-column introduction on wide screens. On mobile, every section link remains visible in a navigation grid, a compact ASCII wordmark fits the screen, and content scrolls naturally with the page. Keyboard navigation, visible focus, and reduced-motion preferences are supported. The journal and privacy routes share the same theme. A matching SVG terminal favicon uses Crust and Lavender. On opening the homepage, a 3.5-second CSS sequence types `open overview.md`, pauses, then reveals the workspace; it does not block interaction or use timers or browser storage. Reduced-motion users see the workspace immediately. The homepage browser title is `pedro@kielblockdev`. The introduction covers work at ReThinkingWorks and personal interests in Linux, self-hosting, and small tools.

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Edit portfolio content in `src/lib/data/resume.ts`, the homepage in `src/routes/+page.svelte`, and shared styling in `src/app.css`. No environment variables are required.

```sh
bun run check
bun run build
```

Vercel uses the build and install commands in `vercel.json`. The site includes no analytics, tracking cookies, or third-party font requests. The privacy policy remains a draft: its provider, transfer, and retention details require owner review.

The browser regression script uses an existing Playwright installation and Chromium executable, without adding either to the application dependencies. Start the production preview with `bun run preview`, then run:

```sh
PREVIEW_URL=http://127.0.0.1:4173 bun tests/portfolio.browser.mjs /absolute/path/to/playwright/index.mjs /absolute/path/to/chromium
```

It checks the served SVG favicon, workspace opening animation and reduced-motion fallback, section navigation, history, expandable roles, learning categories, clipboard success and failure, window expansion, mobile overflow at 320/360/390/430/768px, landscape navigation, desktop viewport fill and content centering, reduced motion, keyboard focus, and journal/privacy routes. It also refreshes the desktop and mobile screenshots in `docs/`.

## Preview

![Terminal-style portfolio overview](docs/portfolio-desktop.png)

[Wide desktop](docs/portfolio-wide.png) · [Mobile](docs/portfolio-mobile.png) · [Opening sequence](docs/workspace-opening.png)

## Credits

Originally based on the Magic UI portfolio template. JetBrains Mono is distributed under the SIL Open Font License; see `static/fonts/OFL.txt`.
