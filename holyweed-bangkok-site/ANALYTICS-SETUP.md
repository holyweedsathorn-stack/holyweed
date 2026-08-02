# Seeing Your Website Traffic — Setup Guide

Two free, real dashboards are already wired into every page of the site.
You just need to turn each one on.

---

## 1. Vercel Analytics (visits, top pages, countries, devices)

1. Open your project in **vercel.com** → click the **Analytics** tab.
2. Click **Enable**. That's it — no code changes needed, the site already
   has the tracking script on every page (`/_vercel/insights/script.js`).
3. Give it a day or two of real traffic, then check back on that same tab
   for visits, top pages, referrers, and countries.
4. Optional: click the **Speed Insights** tab too and enable it the same
   way — shows how fast the site loads for real visitors.

Both have a generous free tier for a site your size.

## 2. Google Analytics (the full-featured, industry-standard option)

1. Go to **analytics.google.com** and sign in with a Google account.
2. Click **Admin** → **Create Account** → name it "HOLYWEED Bangkok."
3. Create a **Property** for the website, fill in your business details
   (Thailand, healthcare/medical category is fine).
4. When it asks for a data stream, choose **Web**, enter
   `https://www.holyweedbkk.com`, and give it a stream name.
5. Google will show you a **Measurement ID** that looks like `G-XXXXXXXXXX`.
   Copy it.
6. Send me that ID and I'll swap it into the site (it currently has a
   placeholder `G-XXXXXXXXXX` in every page's tracking snippet) — or, if
   you're comfortable editing files yourself, open every `.html` file and
   replace `G-XXXXXXXXXX` with your real ID in the two spots near the top
   of the `<head>` section.
7. Give it a day of traffic, then check **Reports** in the Google Analytics
   dashboard for visitor counts, locations, devices, and which pages people
   view most.

Both are free and neither requires anything to be built into the admin
panel — you check traffic on Vercel's and Google's own dashboards.
