import { C, Chrome, Stage, Caption, useTime, ramp } from "./design";
export function Particles() {
  const t = useTime();
  const morph = ramp(t, 0.75, 1.35);
  const spin = t * 1.4;
  const pts = Array.from({ length: 1056 }, (_, i) => {
    const u = ((i % 48) / 48) * Math.PI * 2;
    const v = (Math.floor(i / 48) / 22) * Math.PI * 2;
    let x = (215 + 75 * Math.cos(v)) * Math.cos(u);
    let y = (215 + 75 * Math.cos(v)) * Math.sin(u);
    let z = 75 * Math.sin(v);
    const side = i % 6;
    const a = ((Math.floor(i / 6) % 14) / 13) * 400 - 200;
    const b = (Math.floor(i / 84) / 12) * 400 - 200;
    const cube =
      side === 0
        ? [200, a, b]
        : side === 1
          ? [-200, a, b]
          : side === 2
            ? [a, 200, b]
            : side === 3
              ? [a, -200, b]
              : side === 4
                ? [a, b, 200]
                : [a, b, -200];
    x = x * (1 - morph) + cube[0] * morph;
    y = y * (1 - morph) + cube[1] * morph;
    z = z * (1 - morph) + cube[2] * morph;
    const xx = x * Math.cos(spin) - z * Math.sin(spin);
    const zz = x * Math.sin(spin) + z * Math.cos(spin);
    const yy = y * Math.cos(0.6) - zz * Math.sin(0.6);
    const depth = y * Math.sin(0.6) + zz * Math.cos(0.6);
    const s = 850 / (850 + depth);
    const zoom = 1 + ramp(t, 1.55, 1.875) * 2.7;
    return {
      x: 960 + xx * s * zoom,
      y: 455 + yy * s * zoom,
      z: depth,
      r: 2.5 * s * zoom,
    };
  }).sort((a, b) => b.z - a.z);
  return (
    <Stage bg={C.blue}>
      <svg width="1920" height="1080">
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={C.paper}
            opacity={0.35 + 0.65 * (1 - (p.z + 400) / 800)}
          />
        ))}
      </svg>
      <Caption>
        <span
          style={{
            fontSize: 34,
            display: "block",
            letterSpacing: 7,
            marginBottom: 14,
          }}
        >
          TURN VISITORS INTO
        </span>
        LOYAL CUSTOMERS.
      </Caption>
      <Chrome offset={7.5} />
    </Stage>
  );
}
