
---

# Media Server UI (Svelte)

A modern, responsive media browser built in Svelte to complement the [Media Server API](https://github.com/Benson003/media-server). Browse, stream, and queue up your favorite local content — all through a slick dark-mode UI.

---

## Features

* 🎬 Native video playback with adaptive layout
* 📂 Paginated media explorer
* 🕹️ Media queue system (like YouTube)
* 🌒 Tailwind CSS dark mode by default
* 🧠 Built with Svelte 5 runes + Vite

---

## Prerequisites

* [Node.js](https://nodejs.org/) v18+
* [pnpm](https://pnpm.io/) (recommended)
* A running instance of the [Media Server API](https://github.com/Benson003/media-server)
* `.env` file with `VITE_API_HOST` key set

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Benson003/media-ui-svelte.git
   cd media-ui-svelte
   ```

2. **Set API base URL in `.env`**

   Create a file named `.env` in the project root:

   ```
   VITE_API_HOST=http://localhost:8000
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Run the app**

   ```bash
   pnpm dev
   ```

   Then visit:

   ```
   http://localhost:5173
   ```

---

## Environment Variables

| Key             | Description                          |
| --------------- | ------------------------------------ |
| `VITE_API_HOST` | The base URL of the media API server |

This is used throughout the app to fetch media listings, thumbnails, and video streams.

---

## Project Structure

```
src/
├── lib/            # Shared stores, environment config, and utils
├── routes/         # Svelte pages like /watch/[id]
├── components/     # Reusable UI components
└── app.html        # Vite's HTML entry point
```

In `src/lib/store.ts` (or similar), you can access the env variable like this:

```ts
export const API_ROUTE = import.meta.env.VITE_API_HOST;
```

---

## Deployment

Build the app:

```bash
pnpm build
```

Serve the output in `dist/` using any static file server:

```bash
pnpm install -g serve
serve -s dist
```

Or copy the `dist/` folder into your Go server’s static handler.

---

## Troubleshooting

* **CORS issues?**
  Confirm your Go server includes a permissive CORS middleware that allows requests from `localhost:5173`.

* **Thumbnails not loading?**
  Make sure the backend has FFmpeg installed and the thumbnail endpoint works for each media ID.

* **Blank video player?**
  Confirm the `/media/:id/stream` endpoint supports HTTP Range headers (used by browsers for seeking).

---

## License

MIT License — No restrictions. Go wild, or go *Overflow* 😏

---

## Author

Built by **Benson**
📧 [nwankwobenson29@gmail.com](mailto:nwankwobenson29@gmail.com)

---

> Plug it into the API, hit play, and enjoy. 
> It’s your own personal Netflix — without the guilt or the fees. 

---

