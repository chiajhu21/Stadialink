# Deployment

This site is a **Next.js static export** (`output: "export"`, which builds to `out/`) hosted on **Cloudflare Pages**.

|                   |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Host              | Cloudflare Pages — project `stadialink`                                  |
| Production URL    | https://www.stadialink.com                                               |
| Apex redirect     | `stadialink.com` → `www` via the Cloudflare Worker `stadialink-apex-redirect` |
| Production branch | `main`                                                                   |
| Git-connected     | **No** — direct upload. Pushing to GitHub does **not** auto-deploy.      |

## Publish a new version

Deploys are manual. From the repo root:

```bash
npm run build
npx wrangler pages deploy out --project-name stadialink --branch main
```

`--branch main` is the project's production branch, so this updates the live domain. Omit it and you get a throwaway preview URL instead.

### Authentication

`wrangler` needs a Cloudflare API token with **Account → Cloudflare Pages → Edit** (it reads `CLOUDFLARE_API_TOKEN` from the environment), or run `npx wrangler login` for an interactive OAuth session.

## Before deploying

If the contact form should deliver email, set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` **before** `npm run build` — otherwise the live form falls back to an "email us directly" message.
