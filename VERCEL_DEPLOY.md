# Vercel deployment checklist

If the live site shows `{"error":"Not found"}` or 404, check the following in the **Vercel dashboard**:

## 1. Project Settings → General
- **Root Directory**: Leave **empty** (or `.`) so the project root is the repo root where `package.json` and `vercel.json` live. If this is set to a subfolder (e.g. `frontend` or `api`), Vercel will build the wrong thing and the app won’t be there.

## 2. Build & Development
- **Framework Preset**: Should be **Vite** (auto-detected from the repo). If it’s “Other” or something else, change it to Vite or redeploy after connecting the repo so it can re-detect.
- **Build Command**: Default is fine (`npm run build` from package.json).
- **Output Directory**: Default for Vite is `dist`. Don’t override unless you changed Vite’s build output.

## 3. Latest deployment
- Open the project → **Deployments** → latest deployment.
- If the build **failed**, fix the build (e.g. Node version, env vars, install errors). No build = no `dist` = nothing to serve = 404/JSON error.
- If the build **succeeded**, confirm the deployment is from the correct **branch** (e.g. `main`) that contains `vercel.json` and the frontend code.

## 4. After changing settings
- Trigger a **redeploy** (e.g. “Redeploy” on the latest deployment or push a small commit). Changing Root Directory or Framework often requires a new build.

---

`vercel.json` in this repo is set up for a Vite SPA (rewrite all routes to `/index.html`). No need to set build command or output in `vercel.json`; Vercel’s Vite preset handles that.
