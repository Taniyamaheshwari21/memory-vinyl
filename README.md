# Memory Vinyl 💿

A one-song vinyl gift experience: one song, rotating memory photos, and a minimal turntable UI. Play/pause by clicking the tonearm.

## Run instructions

```bash
# Install dependencies (if not already done)
npm install

# Start dev server
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

**Build for production:**

```bash
npm run build
npm run preview
```

## Placeholder assets

Add these before using the app:

1. **Song**  
   Place your single track at:
   ```
   public/song.mp3
   ```
   (Any MP3 file; the app uses this as the only track.)

2. **Memory photos**  
   Place 10–16 images in:
   ```
   public/memories/1.jpg
   public/memories/2.jpg
   ...
   public/memories/12.jpg
   ```
   (Use at least 10; the UI uses up to 12 by default. Name them `1.jpg`, `2.jpg`, etc.)

If images are missing, the photo disc shows a neutral placeholder where each image would be.

## Tech stack

- **React** (Vite)
- **TailwindCSS**
- **Framer Motion** (tonearm + rotations)
- **Web Audio API** (canvas visualizer)

## Browser support

Tested on Chrome and Safari. Autoplay is disabled; playback starts only after clicking the tonearm.
