import { Composition, Folder } from "remotion";
import { FlevioFilm } from "./Composition";
import { Opening } from "./Opening";
import { Statement } from "./Statement";
import { Shape } from "./Shape";
import { Dots } from "./Dots";
import { Particles } from "./Particles";
import { Ribbon } from "./Ribbon";
import { TypeRings } from "./TypeRings";
import { Closing } from "./Closing";
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="Flevio-Showreel"
        component={FlevioFilm}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={900}
      />
      <Folder name="Scenes">
        <Composition
          id="Opening"
          component={Opening}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={113}
        />
        <Composition
          id="Statement"
          component={Statement}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={112}
        />
        <Composition
          id="Shape"
          component={Shape}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={113}
        />
        <Composition
          id="Dots"
          component={Dots}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={112}
        />
        <Composition
          id="Particles"
          component={Particles}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={113}
        />
        <Composition
          id="Ribbon"
          component={Ribbon}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={112}
        />
        <Composition
          id="TypeRings"
          component={TypeRings}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={113}
        />
        <Composition
          id="Closing"
          component={Closing}
          width={1920}
          height={1080}
          fps={60}
          durationInFrames={112}
        />
      </Folder>
    </>
  );
}
