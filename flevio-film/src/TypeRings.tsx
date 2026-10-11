import { C, Chrome, Stage, useTime, ramp } from "./design";
const rings = [
  { text: "WEB DESIGN • DEVELOPMENT • FLEVIO • ", r: 350, size: 48 },
  { text: "NEW WEBSITES • REDESIGNS • IMPROVEMENTS • ", r: 277, size: 33 },
  { text: "QUALITY • CONVERSION • PERFORMANCE • ", r: 212, size: 27 },
  { text: "DESIGN • BUILD • GROW • ", r: 151, size: 23 },
];
export function TypeRings() {
  const t = useTime();
  const fold = ramp(t, 0.05, 0.72);
  return (
    <Stage>
      <svg width="1920" height="1080">
        <g
          transform={`translate(960 535) scale(${1 + ramp(t, 1.35, 1.72) * 0.12})`}
        >
          {rings.map((ring, j) => (
            <g key={j}>
              {Array.from(ring.text).map((ch, i) => {
                const a =
                  (i / ring.text.length) * Math.PI * 2 -
                  Math.PI / 2 +
                  t * (j % 2 ? -0.34 : 0.28);
                const x =
                  (i / ring.text.length - 0.5) * 2300 * (1 - fold) +
                  Math.cos(a) * ring.r * fold;
                const y =
                  (j - 1.5) * 125 * (1 - fold) + Math.sin(a) * ring.r * fold;
                return (
                  <text
                    key={i}
                    transform={`translate(${x} ${y}) rotate(${((a * 180) / Math.PI + 90) * fold})`}
                    fill={ch === "•" ? C.red : j % 2 ? "none" : C.paper}
                    stroke={j % 2 && ch !== "•" ? C.paper : "none"}
                    strokeWidth="1"
                    fontSize={ring.size}
                    textAnchor="middle"
                  >
                    {ch}
                  </text>
                );
              })}
            </g>
          ))}
          <circle r={26 * ramp(t, 0.4, 0.8)} fill={C.red} />
        </g>
      </svg>
      <Chrome offset={11.25} />
    </Stage>
  );
}
