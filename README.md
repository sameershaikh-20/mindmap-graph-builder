# MindMap Graph Builder

A feature-rich, browser-based mind mapping application built with React, TypeScript, and Vite. Create, organize, and export visual mind maps on an infinite canvas — no backend required.

---

## Features

- **Infinite Canvas** — Pan and zoom freely across an unbounded workspace with a grid background and smooth transforms.
- **Node Management** — Add, edit, move, delete, and collapse nodes. Every node tracks its depth, color, tags, and timestamps.
- **Bezier Edge Rendering** — Connections between nodes are rendered as smooth SVG bezier curves that update in real time.
- **Auto-Arrange Layout** — Automatically distributes nodes into a clean tree layout using a subtree-size algorithm.
- **Undo / Redo** — Full history stack (up to 50 entries) with keyboard shortcuts.
- **Keyboard Shortcuts** — Fast editing without leaving the keyboard (see table below).
- **Auto-Save & Manual Save** — Graph state is persisted to `localStorage` automatically; manual save is also available.
- **IndexedDB Persistence** — Long-term storage via Dexie for saving and listing multiple graphs.
- **Export** — Export your mind map as JSON, SVG, or PNG.
- **Import** — Load a previously exported JSON file back into the editor.
- **Toast Notifications** — Non-intrusive feedback for save, export, and error events.
- **Workspace Overlay** — Live telemetry HUD showing active node count and max depth, plus a zoom widget.
- **Authentication Flow** — Login, Sign Up, and Forgot Password pages with a protected route layer.
- **Dashboard** — Browse and manage all saved graphs with map cards.
- **Templates** — Starter templates to kick off new maps quickly.
- **Landing Page** — Marketing pages including Hero, Features, Testimonials, FAQ, and Newsletter sections.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Bundler | Vite 8 |
| Routing | React Router DOM 7 |
| State Management | Zustand 5 |
| Local Database | Dexie 4 (IndexedDB wrapper) |
| Animations | Framer Motion 12 |
| Icons | React Icons 5 |
| ID Generation | UUID 14 |
| Date Utilities | date-fns 4 |
| File Download | file-saver 2 |
| Styling | Inline styles + clsx |
| Linting | ESLint 10 + typescript-eslint |

---

## Project Structure

```
src/
├── App.tsx                  # Root router and route definitions
├── main.tsx                 # React DOM entry point
│
├── types/                   # Shared TypeScript types
│   ├── index.ts             # Node, GraphState, HistoryEntry, ToastMessage
│   ├── maps.ts              # Map/graph metadata types
│   └── user.ts              # User/auth types
│
├── store/                   # Zustand global state
│   ├── useGraphStore.ts     # Store creation
│   ├── actions.ts           # All graph mutation actions
│   └── selectors.ts         # Derived state selectors
│
├── db/
│   ├── indexedDB.ts         # Dexie DB class + CRUD helpers
│   └── migrations.ts        # DB version migrations
│
├── hooks/
│   ├── useAutoLayout.ts     # Triggers tree auto-arrangement
│   ├── useBezierPath.ts     # Bezier curve path calculations
│   ├── useCanvasTransform.ts# Pan/zoom transform state
│   ├── useDraggableNode.ts  # Drag-and-drop for nodes
│   ├── useFetch.ts          # Generic data-fetching hook
│   ├── useKeyboardShortcuts.ts # Global keyboard handler
│   ├── useLocalStorage.ts   # Low-level localStorage hook
│   ├── useLocalStorageSync.ts  # Auto-save / manual-save logic
│   ├── useMediaQuery.ts     # Responsive breakpoint detection
│   └── useNodeSelection.ts  # Node selection state
│
├── contexts/
│   └── AuthContext.tsx      # Auth state provider
│
├── services/
│   ├── apiClient.ts         # Base HTTP client
│   ├── authService.ts       # Auth API calls
│   └── mapsService.ts       # Maps/graph API calls
│
├── constants/
│   ├── config.ts            # App-wide config constants
│   └── routes.ts            # Route path constants and titles
│
├── utils/
│   ├── bezierCalculator.ts  # Bezier control point math
│   ├── exportUtils.ts       # JSON / SVG / PNG export helpers
│   ├── graphAlgorithms.ts   # Tree traversal and graph algorithms
│   ├── layoutEngine.ts      # Auto-layout positioning engine
│   └── validation.ts        # Input validation helpers
│
├── layouts/
│   ├── AppLayout.tsx        # Layout for authenticated app pages
│   ├── AuthLayout.tsx       # Layout for auth pages
│   └── LandingLayout.tsx    # Layout for public marketing pages
│
├── pages/
│   ├── Landing/             # Hero, Features, Testimonials, FAQ, Newsletter
│   ├── Auth/                # Login, SignUp, ForgotPassword
│   ├── Dashboard/           # Saved maps overview
│   ├── Editor/              # Main mind map editor
│   ├── Templates/           # Starter template picker
│   ├── Settings/            # User settings
│   ├── Profile/             # User profile
│   ├── Help/                # Help & docs
│   ├── About/               # About page
│   └── NotFound/            # 404 page
│
├── components/
│   ├── InfiniteCanvas/      # Canvas, grid background, SVG edge layer
│   ├── MindMapNode/         # Node card, actions, collapse toggle, styles
│   ├── WorkspaceOverlay/    # HUD, zoom widget, port array
│   ├── Navbar/              # App navbar
│   ├── LandingNavbar/       # Landing page navbar
│   ├── Sidebar/             # App sidebar
│   ├── MapCard/             # Dashboard map thumbnail card
│   ├── Footer/              # Footer
│   ├── ProtectedRoute.tsx   # Auth guard wrapper
│   └── UI/                  # Badge, Button, ButtonGroup, Card,
│                            #   EmptyState, Input, Modal, Spinner, Toast
│
└── assets/                  # Static images and icons
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mindmap-graph-builder

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl / ⌘ + Z` | Undo |
| `Ctrl / ⌘ + Shift + Z` | Redo |
| `Enter` | Add child node to selected node |
| `Tab` | Add sibling node to selected node |
| `Delete / Backspace` | Delete selected node (and its subtree) |
| `Escape` | Deselect current node |
| `Ctrl / ⌘ + S` | Save to localStorage |
| `Ctrl / ⌘ + =` / `+` | Zoom in |
| `Ctrl / ⌘ + -` | Zoom out |
| `Ctrl / ⌘ + 0` | Reset zoom and pan |

---

## Data Persistence

Graph state is stored in two layers:

- **localStorage** — Auto-saves the active graph on every change and on manual save. Key format: `graph-<graphId>`.
- **IndexedDB (Dexie)** — Used for listing and managing multiple saved graphs on the Dashboard. The database is named `MindMapDB` and stores records with `id`, `name`, `data`, `createdAt`, and `updatedAt`.

---

## Export Formats

| Format | Contents |
|---|---|
| **JSON** | Full graph state (`nodes`, `rootNodeId`) — re-importable |
| **SVG** | Vector image of the mind map with bezier edges |
| **PNG** | 2× rasterized version of the SVG export |

---

## State Shape

The core `GraphState` managed by Zustand:

```ts
interface GraphState {
  nodes: Record<string, Node>;   // All nodes keyed by ID
  rootNodeId: string | null;     // ID of the root node
  panX: number;                  // Canvas horizontal offset
  panY: number;                  // Canvas vertical offset
  zoomScale: number;             // Canvas zoom (0.1 – 5)
  selectedNodeId: string | null; // Currently selected node
  activeBranches: number;        // Total node count
  maxDepth: number;              // Deepest depth in the tree
}
```

Each `Node` contains:

```ts
interface Node {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  x: number;
  y: number;
  title: string;
  color: string;
  isCollapsed: boolean;
  depth: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
  };
}
```

---

## License

This project is private. All rights reserved.
