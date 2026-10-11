import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
loadFont({ family: "Archivo", url: staticFile("ArchivoBlack-Regular.ttf") });
export const C = {
  ink: "#111113",
  paper: "#eeeae0",
  red: "#f13b2d",
  blue: "#3736f4",
  yellow: "#f4d33d",
};
export const ramp = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
export const useTime = () => useCurrentFrame() / useVideoConfig().fps;
export function Stage({
  children,
  bg = C.ink,
  light = false,
}: {
  children: React.ReactNode;
  bg?: string;
  light?: boolean;
}) {
  return (
    <AbsoluteFill
      style={{
        background: bg,
        color: light ? C.ink : C.paper,
        fontFamily: "Archivo,Arial,sans-serif",
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}
export function Chrome({
  light = false,
  offset = 0,
}: {
  light?: boolean;
  offset?: number;
}) {
  const t = useTime() + offset;
  const ink = light ? C.ink : C.paper;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        color: ink,
        fontFamily: "monospace",
        fontSize: 18,
        letterSpacing: 4,
      }}
    >
      <div style={{ position: "absolute", left: 86, top: 70, opacity: 0.65 }}>
        <b>FLEVIO</b> <span style={{ opacity: 0.6 }}>WEB DESIGN AGENCY</span>
      </div>
      <div style={{ position: "absolute", right: 86, top: 70, opacity: 0.65 }}>
        ▪▫▫▫ &nbsp;{" "}
        {String(Math.min(8, Math.floor(t / 1.875) + 1)).padStart(2, "0")}/08
        &nbsp; <b>128 BPM</b>
      </div>
      <div
        style={{ position: "absolute", right: 86, bottom: 70, opacity: 0.5 }}
      >
        F{String(Math.floor(t * 60)).padStart(4, "0")} &nbsp; 00:00:
        {String(Math.floor(t)).padStart(2, "0")}:
        {String(Math.floor(t * 60) % 60).padStart(2, "0")}
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", opacity: 0.5 }}
      >
        <path
          d="M55 85V55H85 M1835 55H1865V85 M55 995V1025H85 M1835 1025H1865V995"
          stroke={ink}
          fill="none"
          strokeWidth="2"
        />
      </svg>
    </AbsoluteFill>
  );
}
export function Caption({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 150,
        textAlign: "center",
        fontSize: 50,
        letterSpacing: -1,
        color: light ? C.ink : C.paper,
      }}
    >
      {children}
    </div>
  );
}
export function Grain() {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.045,
        mixBlendMode: "soft-light",
      }}
    >
      <svg width="1920" height="1080">
        <defs>
          <filter id="film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".8"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect
          width="1920"
          height="1080"
          filter="url(#film-grain)"
          opacity=".8"
        />
      </svg>
    </AbsoluteFill>
  );
}
