import { C, Chrome, Stage, useTime, ramp } from "./design";
export function Closing() {
  const t = useTime();
  return (
    <Stage bg={C.paper} light>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          translate: `0px ${40 * (1 - ramp(t, 0, 0.35))}px`,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 700,
            fontSize: 238,
            letterSpacing: -14,
            lineHeight: 1,
            scale: 0.8 + 0.2 * ramp(t, 0, 0.45),
            opacity: ramp(t, 0, 0.18),
          }}
        >
          Flevio<span style={{ color: C.red }}>.</span>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 10,
            marginTop: 38,
            opacity: ramp(t, 0.15, 0.4),
          }}
        >
          WEB DESIGN AGENCY
        </div>
        <div
          style={{
            fontSize: 54,
            letterSpacing: -2,
            marginTop: 76,
            opacity: ramp(t, 0.4, 0.7),
          }}
        >
          Let’s make you stand out.{" "}
          <span style={{ color: C.red }}>Get in touch ↗</span>
        </div>
      </div>
      <Chrome light offset={13.125} />
    </Stage>
  );
}
