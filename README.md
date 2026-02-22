# Proxxied — MTG Proxy Builder

**Proxxied** is a Magic: The Gathering proxy printing tool for the web and desktop.
Import a decklist, select artwork, adjust bleed and visual effects, then export a print-ready PDF — or order through MPC Autofill.

The web app is hosted at **https://proxxied.com**

---

## Features

### Card & Image Management
- **Decklist Import** — Paste a decklist (`1x Sol Ring`) or import from Archidekt and Moxfield URLs, MPC XML, or CSV files
- **Alternate Artwork Selector** — Browse all available Scryfall prints per card, with set grouping, favorites, and filter/sort options
- **MPC Autofill Integration** — Search MPC Autofill's art library by card name, filter by DPI/source/tags, and export a compatible XML
- **Upload Library** — Upload your own images (individual files or ZIP packs), link front/back pairs, and reuse across projects
- **Double-Faced Card (DFC) Support** — Both faces managed automatically; select artwork per face independently
- **Cardback Library** — Built-in and custom cardbacks; set a global default or assign per card
- **Token Support** — Auto-import linked tokens; search and replace independently
- **11 Languages** — English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Russian, Simplified and Traditional Chinese

### Visual Editing
- **Brightness, Contrast, Saturation** — Basic image adjustments
- **Darkening Modes** — None, darken all, contrast edges, or contrast full with threshold and edge width control
- **Enhancements** — Sharpness, pop/punch effect, noise reduction, gamma correction
- **Per-Card Bleed Override** — Fine-tune bleed and offset per card, per face
- **WebGL Rendering** — GPU-accelerated via PixiJS for smooth real-time preview

### Print Layout
- **Bleed Modes** — Generate bleed, trim existing bleed, or no bleed; auto-detects pre-bleeded images
- **Page Presets** — A4, A3, Letter, Tabloid, Legal, ArchA, ArchB, SuperB, A2, A1, or custom
- **Portrait / Landscape** — Toggle with swap button
- **Grid Configuration** — Adjustable columns, rows, and card spacing
- **Cut Guides** — Customizable color and width; edge bleed guides always black
- **Units** — Switch globally between inches and millimeters

### PDF & Export
- **Export Modes** — Fronts only, interleaved all, interleaved DFC/custom only, duplex (fronts + mirrored backs), backs only, or visible faces
- **High-Resolution** — 1200 DPI output with precise crop marks
- **Silhouette Cameo** — SVG cutting templates and registration marks for Silhouette Studio
- **ZIP Export** — All card images in a single archive
- **MPC Autofill XML** — Export directly for MPC ordering
- **Decklist Copy/Download** — Plain text or with MPC art IDs preserved

### Project & Deck Management
- **Multi-Project Support** — Create, rename, switch, and delete projects; last project remembered
- **Sharing** — Share a project via a unique URL token
- **Drag & Drop Reordering** — Rearrange cards in the grid
- **Multi-Select** — Select multiple cards for bulk actions
- **Filter & Sort** — By color, mana cost, type, rarity, or custom back; alphabetical sort for export
- **Undo / Redo** — Full history stack

### App
- **Electron Desktop** — Native app for Windows, macOS, and Linux with auto-update
- **PWA** — Installable as a web app; works offline
- **Dark & Light Mode** — Matches system preference; PDF always exports on white
- **Keyboard Shortcuts** — Full keyboard support with a shortcuts reference panel
- **Responsive** — Mobile-friendly with pull-to-refresh

---

## Tech Stack

### Frontend
| Category | Libraries |
|---|---|
| Core | React 19, TypeScript 5, Vite 7, TailwindCSS 4 |
| UI | Flowbite React, Lucide React |
| State | Zustand, Dexie (IndexedDB ORM), Dexie React Hooks |
| Rendering | PixiJS 8 + @pixi/react (WebGL effects) |
| PDF | pdf-lib |
| Drag & Drop | @dnd-kit/core, sortable, modifiers |
| Networking | Axios + axios-retry, @microsoft/fetch-event-source (SSE) |
| Utilities | Zod, JSZip, file-saver, react-colorful, Bottleneck |

### Backend
| Category | Libraries |
|---|---|
| Core | Node.js 20+, Express 5, TypeScript 5, TSX |
| Database | Better SQLite3, LRU-Cache |
| HTTP | Axios + axios-retry, CORS, Compression, Multer |
| Scheduling | node-cron |

### Desktop
- Electron 39, electron-builder, electron-updater (GitHub releases)

### Deployment
- **Frontend** — Netlify (prerendered with Puppeteer, published from `client/static-pages`)
- **Backend** — Koyeb (`api.proxxied.com`)

---

## Getting Started

### Prerequisites
- **Node.js** v20+
- **npm**

### Installation

```bash
git clone https://github.com/kclipsto/proxies-at-home.git
cd proxies-at-home

# Install all dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

Or with PowerShell:
```powershell
./proxxied.ps1 install
```

### Development

```bash
# Run client (localhost:5173) and server (localhost:3001) together
npm run dev
```

Or with PowerShell:
```powershell
./proxxied.ps1 dev
```

The Vite dev server proxies `/api/*` requests to `localhost:3001` automatically — no environment variables needed for local development.

### Electron (Desktop)

```bash
# Run as Electron app (with hot reload on client)
npm run electron:dev

# Build a distributable
npm run electron:build
```

### Environment Variables

For web deployments, set in `client/.env`:
```
VITE_API_BASE=https://api.proxxied.com
```

Leave it unset for local development.

---

## Releases

```bash
npm run release:patch   # x.x.N
npm run release:minor   # x.N.0
npm run release:major   # N.0.0
npm run release:dry     # Preview without publishing
```

Releases publish a GitHub release and trigger Electron auto-update.

---

## License
MIT

## Credits
- [alex-taxiera/proxy-print](https://github.com/alex-taxiera/proxy-print) — Original inspiration
- [Scryfall API](https://scryfall.com/docs/api) — Card data and images
- [MPC Autofill](https://mpcfill.com) — Community art resource
