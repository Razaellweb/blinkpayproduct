"use client";
import { useMemo } from "react";

export default function Sparkline({
  data,
  width = 320,
  height = 80,
  stroke = "url(#grad)",
  fill = "url(#fill)",
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}) {
  const path = useMemo(() => {
    if (!data?.length) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const norm = (v: number) => (height - 10) - ((v - min) / Math.max(1, max - min)) * (height - 20);
    const step = width / (data.length - 1);
    return data.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${norm(v)}`).join(" ");
  }, [data, height, width]);

  const area = useMemo(() => {
    if (!data?.length) return "";
    const max = Math.max(...data);
    const min = Math.min(...data);
    const norm = (v: number) => (height - 10) - ((v - min) / Math.max(1, max - min)) * (height - 20);
    const step = width / (data.length - 1);
    let d = `M0,${height} `;
    d += data.map((v, i) => `L${i * step},${norm(v)}`).join(" ");
    d += ` L${width},${height} Z`;
    return d;
  }, [data, height, width]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#0f766e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
