import { C, Chrome, Stage, Caption, useTime, ramp } from "./design";
export function Shape() {
  const t = useTime();
  const m = ramp(t, 0.45, 0.9);
  const n = ramp(t, 1.05, 1.5);
  const points = Array.from({ length: 180 }, (_, i) => {
    const a = (i / 180) * Math.PI * 2;
    const circle = 205;
    const square = 174 / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
    const blob = 200 + 40 * Math.cos(a * 3 + t * 3);
    const r = (circle * (1 - m) + square * m) * (1 - n) + blob * n;
    return `${Math.cos(a) * r},${Math.sin(a) * r}`;
  }).join(" ");
  return (
    <Stage>
      <svg width="1920" height="1080">
        <g transform={`translate(960 475) rotate(${t * 55 - 12})`}>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={-270 - i * 9}
              y={-270 - i * 9}
              width={540 + i * 18}
              height={540 + i * 18}
              fill="none"
              stroke={C.paper}
              opacity={0.14 - i * 0.035}
              strokeWidth="2"
              transform={`rotate(${i * 7})`}
            />
          ))}
          <polygon
            points={points}
            fill={t < 0.64 ? C.red : t < 1.22 ? C.blue : "#ff942c"}
          />
          {[-270, 270].flatMap((x) =>
            [-270, 270].map((y) => (
              <rect
                key={`${x}-${y}`}
                x={x - 6}
                y={y - 6}
                width="12"
                height="12"
                fill={C.ink}
                stroke={C.paper}
                opacity=".5"
              />
            )),
          )}
          <path d="M-16 0H16 M0-16V16" stroke={C.paper} opacity=".6" />
        </g>
        <text
          x="1310"
          y="290"
          fill={C.paper}
          fontFamily="monospace"
          fontSize="18"
          letterSpacing="2"
          opacity=".6"
        >
          DESIGNED TO BE DIFFERENT
        </text>
      </svg>
      <Caption>Beautiful by design. Powerful by purpose.</Caption>
      <Chrome offset={3.75} />
    </Stage>
  );
}
