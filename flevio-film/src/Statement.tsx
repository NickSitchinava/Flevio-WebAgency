import { C, Chrome, Stage, useTime, ramp } from "./design";
export function Statement() {
  const t = useTime();
  return (
    <Stage bg={C.red} light>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: t < 0.47 ? 236 : 184,
          lineHeight: 0.97,
          letterSpacing: -12,
          scale: 1 + 0.035 * Math.sin(t * 13),
          translate: `0px ${65 * (1 - ramp(t, 0, 0.2))}px`,
        }}
      >
        {t < 0.47 ? (
          "WE BUILD"
        ) : (
          <>
            <span>STANDOUT</span>
            <span style={{ position: "relative" }}>
              WEBSITES
              <svg
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  left: -25,
                  top: -12,
                  width: "calc(100% + 50px)",
                  height: "calc(100% + 24px)",
                  overflow: "visible",
                }}
              >
                <path
                  d="M0 38V0H38 M962 0H1000V38 M0 162V200H38 M962 200H1000V162"
                  fill="none"
                  stroke={C.ink}
                  strokeWidth="5"
                />
              </svg>
            </span>
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial",
          fontSize: 38,
          opacity: ramp(t, 0.75, 1),
        }}
      >
        High-quality design. Ahead of the competition.
      </div>
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        <circle
          cx="960"
          cy="540"
          r={t > 1.57 ? ramp(t, 1.57, 1.87) * 1150 : 0}
          fill={C.ink}
        />
      </svg>
      <Chrome light offset={1.875} />
    </Stage>
  );
}
