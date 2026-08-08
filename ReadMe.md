# doughmination.gay

The personal homepage and hub for Clove Nytrix Doughmination Twilight — projects, music, live Discord presence, dev stats, self-hosted server info, galleries, and more. Live at [doughmination.gay](https://doughmination.gay).

## Stack

- **[Next.js 16](https://nextjs.org/)** (App Router) with **React 19**, built as a fully static export (`output: "export"`).
- **TypeScript** throughout.
- **[Vanilla Extract](https://vanilla-extract.style/)** for styling — `.css.ts` files compiled to static CSS at build time (zero runtime).
- **[Turbopack](https://turbo.build/pack)** for dev and build (`--webpack` scripts kept as an escape hatch).
- **[@tanstack/react-query](https://tanstack.com/query)** for data fetching.
- **[@doughmination/react-api](https://www.npmjs.com/package/@doughmination/react-api)** — the site's own API client for presence, music, and related live data.
- **[Bun](https://bun.sh/)** as the package manager (`bun.lock`).
- Deployed on **Cloudflare Pages**, with locale routing handled at the edge by a Pages Function (`functions/_middleware.ts`).

## Getting started

```bash
bun install
bun dev          # dev server on http://localhost:3000 (Turbopack)
bun run build    # static export to ./out
```

Other scripts: `dev:webpack` / `build:webpack` (webpack fallback), `start` (serve a built app), `lint` (ESLint).

## Project structure

```
src/
  app/            App Router pages (home, discord, music, projects, …)
  components/
    chrome/       Site shell: nav, settings menu, 3D model, i18n text
  scripts/        Feature components ported from legacy page scripts
                  (PresenceCard, Guestbook, GenshinGallery, CityMap, …)
  styles/         Vanilla Extract stylesheets (.css.ts), incl. per-page styles
  i18n/           Locale config, dictionaries, and 13 language files
  types/          Ambient TypeScript declarations
functions/
  _middleware.ts  Cloudflare Pages edge locale routing
public/           Static assets
```

## Pages

Home, Cool People, Dev Info, Discord (live presence), Servers, Projects, Music, Webring (88x31), Guestbook, Genshin, Minecraft, and Selfies.

## Internationalisation

The site ships in 13 languages (en, de, es, it, tr, zh, nl, ru, pt, pl, ko, ja, ar). Locale files live in `src/i18n/locales/`. Nav labels and UI text are keyed translations resolved at render time. Since the static export disables Next's built-in middleware, locale routing (prefix rewrites, cookie/`Accept-Language` redirects) runs at the Cloudflare edge in `functions/_middleware.ts`, importing the same locale helpers the app uses.

## Contributing & licence

See [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md), and [LICENCE.md](./LICENCE.md) (DASL-1.0).

## For AI agents

If you're an LLM or coding agent working in this repo, read [AGENTS.md](./AGENTS.md) first.
