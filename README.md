# 🎸 Our Music Adventure 🪕

A kid-friendly interactive guide for learning guitar and ukulele together — parent + child, side by side.

## Deploy to GitHub Pages

1. Create a new GitHub repo named `music-adventure` (or whatever you like)
2. Push this code to the `main` branch
3. In your repo, go to **Settings → Pages → Source** and select **GitHub Actions**
4. The workflow will auto-run on push and deploy to `https://<username>.github.io/music-adventure/`

> **If your repo name is different** from `music-adventure`, update the `base` value in `vite.config.js` to match:
> ```js
> base: '/your-repo-name/',
> ```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # outputs to ./dist
npm run preview   # preview the build locally
```
