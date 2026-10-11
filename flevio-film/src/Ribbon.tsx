import { C, Chrome, Stage, useTime, ramp } from "./design";
export function Ribbon() {
  const t = useTime();
  const end = ramp(t, 0, 1.65);
  const start = Math.max(0, end - 0.59);
  const points = Array.from({ length: 160 }, (_, i) => {
    const p = start + ((end - start) * i) / 159;
    const a = p * Math.PI * 3.3;
    return `${-250 + p * 2450 + Math.sin(a) * 300},${495 + Math.cos(a) * 195 + Math.sin(a * 2) * 65}`;
  });
  const d = "M" + points.join(" L");
  return (
    <Stage bg={C.yellow} light>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 175,
          fontSize: 96,
          letterSpacing: -5,
          lineHeight: 1.02,
        }}
      >
        NEW WEBSITE.
        <br />
        <span style={{ opacity: t > 0.5 ? 1 : 0.2 }}>REDESIGN.</span>
        <br />
        <span style={{ opacity: t > 1 ? 1 : 0.2 }}>IMPROVE.</span>
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 125, overflow: "visible" }}
      >
        {[
          [64, C.ink],
          [45, C.red],
          [29, C.paper],
          [17, C.blue],
          [6, C.paper],
        ].map(([w, c]) => (
          <path
            key={w}
            d={d}
            fill="none"
            stroke={String(c)}
            strokeWidth={Number(w)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div
        style={{ position: "absolute", right: 145, bottom: 165, fontSize: 38 }}
      >
        Your next chapter starts here. ↗
      </div>
      <Chrome light offset={9.375} />
    </Stage>
  );
}
