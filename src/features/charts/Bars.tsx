"use client";
export default function Bars({ data, width = 320, height = 120 }: { data: number[]; width?: number; height?: number }) {
  const max = Math.max(...data, 1);
  const barW = width / data.length - 6;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {data.map((v, i) => {
        const h = (v / max) * (height - 16);
        return (
          <rect
            key={i}
            x={i * (barW + 6)}
            y={height - h}
            width={barW}
            height={h}
            rx={6}
            fill={i % 3 === 0 ? "#1d4ed8" : i % 3 === 1 ? "#0f766e" : "#f59e0b"}
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}
