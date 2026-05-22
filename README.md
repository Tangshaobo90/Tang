# Tom Tang Portfolio

A cinematic, minimal dark personal brand portfolio built with Next.js 15, Tailwind CSS, Framer Motion, GSAP, Lenis and shadcn-style primitives.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace portfolio images

Placeholder artwork lives in `public/work`.

Keep the same filenames for the fastest swap, or update the `projects` array in `src/components/portfolio-site.tsx`:

- `cover` controls the homepage project cover.
- `slides` controls the full-screen gallery images.

Recommended image ratio: `16:10` or wider, high-resolution PNG/JPG/WebP.

## Deploy

This project is ready for Vercel. Push the folder to a Git repository and import it in Vercel with the default Next.js settings.
