import { C, Chrome, Stage, useTime, ramp } from "./design";
export function Opening() {
  const t = useTime();
  const count = t < 0.45 ? 1 : t < 0.9 ? 2 : t < 1.35 ? 4 : 8;
  return (
    <Stage>
      <svg width="1920" height="1080">
        <g transform={`translate(960 490) rotate(${t * 75})`}>
          {Array.from({ length: count }, (_, i) => {
            const a = (i / count) * Math.PI * 2;
            const r = count === 1 ? 0 : 90 + ramp(t, 0.3, 1.8) * 100;
            return (
              <circle
                key={i}
                cx={Math.cos(a) * r}
                cy={Math.sin(a) * r}
                r={25 - 7 * ramp(t, 0.5, 1.7)}
                fill={C.red}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 755,
          width: "100%",
          textAlign: "center",
          fontSize: 68,
          letterSpacing: -3,
          opacity: ramp(t, 0.2, 0.5),
        }}
      >
        We are <span style={{ color: C.red }}>Flevio.</span>
      </div>
      <Chrome />
    </Stage>
  );
}
