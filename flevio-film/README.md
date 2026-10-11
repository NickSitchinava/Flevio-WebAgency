# Flevio — 15-second agency film

1920 × 1080 · 60 fps · 900 frames · stereo audio.

## Preview and edit

Run `npm run dev -- --no-open` from this directory. Open the URL printed by Remotion and select **Flevio-Showreel**. Every scene also has a connected composition under **Scenes**. All movement is frame-driven; scrubbing and exports are deterministic.

## Deliverable

The website uses `../public/videos/flevio-showreel.mp4`. The original `showreel.mp4` is preserved. The compact inline player loops silently; opening the player enables sound and exposes normal playback controls.

## Rebuild

```powershell
npx remotion render Flevio-Showreel out/flevio-master.mp4 --codec=h264 --crf=16 --concurrency=3
ffmpeg -y -i out/flevio-master.mp4 -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -c:a copy -movflags +faststart ../public/videos/flevio-showreel.mp4
```

## Edit structure

| Time | Scene | Message |
| --- | --- | --- |
| 0–1.88 | Red orbiting dots | We are Flevio |
| 1.88–3.75 | Red kinetic typography | Standout websites |
| 3.75–5.63 | Geometric morphs | Beautiful by design. Powerful by purpose. |
| 5.63–7.50 | Cream dot field | Built to convert |
| 7.50–9.38 | Cobalt particle sculpture | Turn visitors into loyal customers |
| 9.38–11.25 | Yellow multicolor ribbon | New website. Redesign. Improve. |
| 11.25–13.13 | Circular typography | Design, development, quality, conversion |
| 13.13–15.00 | Cream brand card | Let's make you stand out. Get in touch |

The soundtrack is extracted directly from the user-provided reference video, without time stretching or added effects. No ownership or licensing of the source soundtrack is asserted. Archivo Black is bundled under the included SIL Open Font License. All visual animation is authored in the scene source files.

Run `npm run lint` to check the standalone video project. Its dependencies and TypeScript configuration are isolated from the Next.js website.

## Verification

- Remotion ESLint and TypeScript: passed.
- Website TypeScript and production build: passed.
- Browser playback: new MP4 loaded without a media error; expanded playback was running with sound enabled; inline playback remained muted.
- Media inspection: H.264, 1920×1080, 60 fps, 900 video frames; AAC stereo at 48 kHz; 6,108,828-byte web file. The video is exactly 15 seconds; AAC packet padding makes the container report 15.019 seconds.
- Targeted website lint reports an existing `react-hooks/set-state-in-effect` error at `Projects.tsx:60` and an existing image warning at line 159. Neither finding is in the changed showreel code.
