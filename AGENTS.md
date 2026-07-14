# Swarrow

Landing page for two municipal AI products: the website AI desk "Swarrow Chat"
and the AI call center "Swarrow Call". The site uses SvelteKit and Bun. Runtime,
formatting, TypeScript, spelling, and git-hook rules live under `.claude/rules/`.
Read the applicable rule file before editing matching files.

## Project conventions

- Keep the shared homepage sections in `src/routes/+page.svelte`, and the
  Swarrow Chat / Swarrow Call detail sections in `src/routes/chat/+page.svelte`
  and `src/routes/call/+page.svelte`. Keep the shared header, footer, and
  download-request modal in `src/routes/+layout.svelte`.
- Present Swarrow Chat and Swarrow Call as equal, independently adoptable products.
- Explain the shared knowledge base before either product's detailed section.
- Keep shared components and utilities under `src/lib/swarrow/` and import them
  through the `$lib` alias.
- Reuse the existing media under `static/swarrow-call/`; do not rename those
  public URLs during the two-product homepage change.
- Do not publish unsupported performance claims or the fictional case-study data.
- Do not commit credentials, tokens, private keys, production-equivalent API
  endpoints, or sensitive sample payloads. Use placeholders for environment values.
- Bun is the only package manager and script runner. Do not add npm, pnpm, Yarn,
  ESLint, or Prettier configuration.
- The deployment target is static prerendering through adapter-static
  (`vite.config.ts`). Revisit the adapter design before adding SSR or server-only APIs.
- Before reporting implementation complete, run `bun --bun run test:seo`,
  `bun --bun run check`, and `bun --bun run build`.

## Download request API

The contact form, D1 persistence, and email delivery are handled by
`swarrow.com-backend` at `POST https://api.swarrow.com/download-requests`.
The frontend uses `PUBLIC_DOWNLOAD_REQUEST_API_URL` and a Cloudflare Turnstile
site key as public environment variables. See `docs/download-request-api.md` for
integration details and `docs/download-link.md` for download-link operations.

## SEO operations

Local tests validate search-facing HTML contracts, not ranking. Follow
`docs/seo-operations.md` for pre-deploy baselines, URL Inspection, sitemap checks,
and 7-day/28-day Search Console measurement. Never store Search Console OAuth
credentials or exports in the repository.

## Figma

Original design: https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall

## Codex compatibility

`CLAUDE.md` is a symbolic link to this file. Edit `AGENTS.md` and do not replace
the symlink with a regular file.
