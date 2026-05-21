# Living Design Starter

A standalone Vite + React + Tailwind starter pre-loaded with Living Design components. Use it with Claude Code, Cursor, or any IDE to vibe quickly with the Living Design system.

## Prerequisites

- **Node.js 22** (see `.nvmrc`)
- **npm**

## Getting Started

```bash
nvm use              # switch to Node 22
npm install          # install dependencies
npm run dev          # start dev server on http://localhost:3099
```

## Project Structure

```
src/
  App.tsx                  # Your starting point — edit this!
  main.tsx                 # React root mount (no need to touch)
  components/ld/           # Generated Living Design components (read-only)
  utils/                   # Shared helpers: Theming.tsx, Store.tsx (read-only)
  styles/
    index.css              # Tailwind directives + LD CSS import
    living-design.css      # Combined LD component styles (generated)
```

## Using Components

Import components from `src/components/ld/`:

```tsx
import { Button } from './components/ld/Button';
import { Card } from './components/ld/Card';
import { TextField } from './components/ld/TextField';
```

Check `.cursor/rules/overview-components.mdc` for the full component inventory with prop APIs.

## Adding New Components

Create new components **outside** `src/components/ld/` — that directory is generated and read-only. Import and compose existing LD components in your own files.

## Context & Guidelines

- `.cursor/rules/` — Cursor IDE rules (auto-loaded)
- `.claude/CLAUDE.md` — Claude Code agent instructions
- `AGENTS.md` — General agent orientation

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 3099) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
