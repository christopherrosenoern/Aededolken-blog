# Ædedolken

The website of the food club **Ædedolken** – one dinner every month of the year. Each dinner gets its own blog post in a lovingly retro, mid-2000s style.

Every post shows, in order:

1. Month, year, host and theme
2. The menu
3. Wines and drinks
4. Photos
5. Quotes from the night

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19) + Vite
- [Content Collections](https://www.content-collections.dev/) – dinners are Markdown files with typed frontmatter
- Netlify Image CDN for resized/WebP photos
- Plain CSS (with Tailwind available) for the retro look

## Adding a dinner

Create `content/dinners/YYYY-MM.md` and put photos in `public/img/`:

```md
---
month: 10
year: 2026
host: Anna
theme: "Autumn in Burgundy"
menu:
  - course: Starter
    dish: Escargots with garlic butter
    note: optional note
drinks:
  - name: Bourgogne Pinot Noir 2022
    note: with the main
photos:
  - src: /img/oct-table.jpg
    caption: The table
quotes:
  - text: "More butter!"
    by: Jonas
---

An optional short write-up of the evening (Markdown).
```

`drinks`, `photos` and `quotes` are optional. The post appears on the front page and in the sidebar archive automatically.

## Running locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```
