import { C, Chrome, Stage, useTime, ramp } from "./design";
export function Dots() {
  const t = useTime();
  const spread = ramp(t, 0, 0.58);
  return (
    <Stage bg={C.paper} light>
      <svg width="1920" height="1080">
        {Array.from({ length: 1458 }, (_, i) => {
          const col = i % 54;
          const row = Math.floor(i / 54);
          const x = 960 + (col - 26.5) * (10 + 27 * spread);
          const y = 540 + (row - 13) * (10 + 30 * spread);
          const wave = Math.sin(col * 0.2 + row * 0.14 - t * 4);
          const dist = Math.hypot(x - 960, y - 540);
          const red = Math.abs(wave) > 0.9;
          return (
            <circle
              key={i}
              cx={x + Math.sin(row * 0.35 + t * 3) * 18 * spread}
              cy={y + Math.cos(col * 0.3 + t * 3) * 20 * spread}
              r={(red ? 5.8 : 2.8) * (1 - 0.5 * (1 - spread))}
              fill={red ? C.red : C.ink}
              opacity={dist < 380 && t > 0.5 ? 0.14 : 0.78}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1.04,
          fontSize: 134,
          letterSpacing: -7,
          opacity: ramp(t, 0.4, 0.65),
          scale: 0.86 + 0.14 * ramp(t, 0.35, 0.9),
        }}
      >
        <span style={{ background: C.paper, padding: "10px 25px" }}>
          BUILT TO
        </span>
        <span style={{ background: C.paper, padding: "0 25px", color: C.red }}>
          CONVERT.
        </span>
      </div>
      <Chrome light offset={5.625} />
    </Stage>
  );
}
