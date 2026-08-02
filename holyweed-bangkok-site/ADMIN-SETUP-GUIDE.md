# HOLYWEED Admin Panel — One-Time Setup Guide

This gives you a real login-protected panel at **yoursite.com/admin** where you
can swap photos and edit the homepage banner text/number, and it publishes
straight to the live site automatically (no more dragging zip folders into
GitHub for these kinds of changes).

It uses a free, open-source tool called **Decap CMS**. You only have to do
this setup once. It takes about 10 minutes.

---

## Step 1 — Check your GitHub folder structure

Open your repo in a browser: `github.com/holyweedsathorn-stack/holyweed`

- If you see `index.html` sitting right at the top level → skip to Step 2.
- If instead you see a folder called `holyweed-bangkok-site` and `index.html`
  is inside it → open `admin/config.yml` in this zip and follow the note at
  the top of that file (add `holyweed-bangkok-site/` in front of the listed
  paths) before you upload.

## Step 2 — Create a GitHub OAuth App

1. Go to **github.com/settings/developers** → **OAuth Apps** → **New OAuth App**.
2. Fill in:
   - **Application name**: `HOLYWEED Admin`
   - **Homepage URL**: `https://www.holyweedbkk.com` (or your vercel.app URL if you haven't connected the custom domain yet)
   - **Authorization callback URL**: `https://www.holyweedbkk.com/api/callback` (same domain, with `/api/callback` on the end)
3. Click **Register application**.
4. Copy the **Client ID** shown on the next page.
5. Click **Generate a new client secret** and copy it immediately (GitHub only shows it once).

## Step 3 — Add those two values to Vercel

1. Open your project in **vercel.com** → **Settings** → **Environment Variables**.
2. Add:
   - `GITHUB_OAUTH_CLIENT_ID` = (the Client ID from Step 2)
   - `GITHUB_OAUTH_CLIENT_SECRET` = (the Client Secret from Step 2)
3. Save, then upload/redeploy this site (see Step 4) — Vercel needs a new
   deployment to pick up the new environment variables.

## Step 4 — Upload the site as usual

Drag the unzipped folder into GitHub like you always do. This zip includes
three new things that make the admin panel work:

- `admin/index.html` and `admin/config.yml` — the panel itself
- `api/auth.js` and `api/callback.js` — the login handshake with GitHub (Vercel runs these automatically as serverless functions, nothing extra to configure)
- `content/home.json` — the homepage banner text/photo the panel edits

## Step 5 — Log in

Go to `https://www.holyweedbkk.com/admin` and click **Login with GitHub**.
The first time, GitHub will ask you to authorize the app — approve it. You
should land in the editor with one entry: **"Hero Banner & Reviews Banner."**

From there you can:

- **Change the homepage hero photo or the review count/text** — click into
  "Hero Banner & Reviews Banner," edit the fields, click **Publish**. The
  live site updates within a minute or two.
- **Replace any other photo on the site** (about page, locations, blog
  posts, etc.) — click the **Media** icon in the top bar, find the existing
  photo by name, and upload a new photo **with the exact same filename** to
  overwrite it. Because every page links to photos by filename, this
  instantly swaps the photo everywhere it's used — no HTML editing needed.
  Uploading a photo under a **new/different filename** won't appear
  anywhere until a page is edited to reference it — for that kind of change,
  send it to me and I'll wire it in.

## Notes

- Only people who are collaborators on your GitHub repo can log in — anyone
  else who visits `/admin` will just see a GitHub login screen they can't
  get past.
- `/admin` and `/api` are excluded from search engines via `robots.txt`.
- If something looks broken after publishing through the panel, the
  previous version is never lost — every change is a normal GitHub commit,
  so we can always roll it back.
