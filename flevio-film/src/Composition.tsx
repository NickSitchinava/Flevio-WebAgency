import { AbsoluteFill, Series, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Opening } from "./Opening";
import { Statement } from "./Statement";
import { Shape } from "./Shape";
import { Dots } from "./Dots";
import { Particles } from "./Particles";
import { Ribbon } from "./Ribbon";
import { TypeRings } from "./TypeRings";
import { Closing } from "./Closing";
import { Grain } from "./design";
export function FlevioFilm() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence
          name="01 · We are Flevio"
          durationInFrames={113}
          premountFor={fps}
        >
          <Opening />
        </Series.Sequence>
        <Series.Sequence
          name="02 · Standout websites"
          durationInFrames={112}
          premountFor={fps}
        >
          <Statement />
        </Series.Sequence>
        <Series.Sequence
          name="03 · Designed differently"
          durationInFrames={113}
          premountFor={fps}
        >
          <Shape />
        </Series.Sequence>
        <Series.Sequence
          name="04 · Built to convert"
          durationInFrames={112}
          premountFor={fps}
        >
          <Dots />
        </Series.Sequence>
        <Series.Sequence
          name="05 · Loyal customers"
          durationInFrames={113}
          premountFor={fps}
        >
          <Particles />
        </Series.Sequence>
        <Series.Sequence
          name="06 · New, redesign, improve"
          durationInFrames={112}
          premountFor={fps}
        >
          <Ribbon />
        </Series.Sequence>
        <Series.Sequence
          name="07 · Design, build, grow"
          durationInFrames={113}
          premountFor={fps}
        >
          <TypeRings />
        </Series.Sequence>
        <Series.Sequence
          name="08 · Get in touch"
          durationInFrames={112}
          premountFor={fps}
        >
          <Closing />
        </Series.Sequence>
      </Series>
      <Audio src={staticFile("reference-soundtrack.m4a")} premountFor={fps} />
      <Grain />
    </AbsoluteFill>
  );
}
