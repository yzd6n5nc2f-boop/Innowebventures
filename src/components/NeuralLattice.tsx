import { useEffect, useRef, useState } from "react";
import styles from "../styles/neuralLattice.module.css";

// A small projected 3D network: no model download or WebGL dependency.
const nodes = Array.from({ length: 35 }, (_, i) => {
  const row = Math.floor(i / 7), col = i % 7;
  const angle = (col - 3) * .32;
  return { x: Math.sin(angle) * 125, y: (row - 2) * 32, z: Math.cos(angle) * 70 + Math.sin(row * .8) * 15 };
});
const edges = nodes.flatMap((_, i) => [i % 7 < 6 ? i + 1 : -1, i < 28 ? i + 7 : -1, i < 28 && i % 7 < 6 ? i + 8 : -1].filter(j => j >= 0).map(j => [i, j]));

export default function NeuralLattice() {
  const svg = useRef<SVGSVGElement>(null);
  const clock = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const root = svg.current;
    if (!root) return;
    let frame = 0, last = 0, visible = true;
    const paint = (time: number) => {
      const angle = Math.sin(time / 16000) * .5 - .22;
      const points = nodes.map((p, i) => {
        const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z = -p.x * Math.sin(angle) + p.z * Math.cos(angle);
        const scale = 420 / (420 - z);
        return { x: 160 + x * scale, y: 115 + (p.y + Math.sin(time / 2400 + i) * 1.5) * scale, z };
      });
      root.querySelectorAll<SVGLineElement>('[data-edge]').forEach((line, i) => {
        const [a, b] = edges[i];
        line.setAttribute('x1', String(points[a].x)); line.setAttribute('y1', String(points[a].y));
        line.setAttribute('x2', String(points[b].x)); line.setAttribute('y2', String(points[b].y));
      });
      root.querySelectorAll<SVGCircleElement>('[data-node]').forEach((circle, i) => {
        circle.setAttribute('cx', String(points[i].x)); circle.setAttribute('cy', String(points[i].y));
        circle.setAttribute('r', String(2.5 + (points[i].z + 90) / 65));
      });
      root.querySelectorAll<SVGCircleElement>('[data-signal]').forEach((circle, i) => {
        const [a, b] = edges[(i * 19 + 3) % edges.length];
        const t = (time / 3300 + i / 3) % 1;
        circle.setAttribute('cx', String(points[a].x + (points[b].x - points[a].x) * t));
        circle.setAttribute('cy', String(points[a].y + (points[b].y - points[a].y) * t));
      });
    };
    paint(clock.current);
    const tick = (now: number) => {
      if (last && now - last < 40) { frame = requestAnimationFrame(tick); return; }
      if (last) clock.current += Math.min(now - last, 80);
      last = now; paint(clock.current); frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (!paused && !reduced && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root); document.addEventListener('visibilitychange', sync); sync();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [paused, reduced]);
  return <div className={styles.neural}>
    <svg ref={svg} viewBox="0 0 320 230" aria-hidden="true" focusable="false">
      <defs><radialGradient id="neural-node"><stop stopColor="#648de9"/><stop offset="1" stopColor="#183967"/></radialGradient></defs>
      <g stroke="#2458d3" strokeOpacity=".24" strokeWidth=".8">{edges.map(([a,b],i) => <line key={i} data-edge="" x1={nodes[a].x+160} y1={nodes[a].y+115} x2={nodes[b].x+160} y2={nodes[b].y+115}/>)}</g>
      <g fill="url(#neural-node)">{nodes.map((p,i) => <circle key={i} data-node="" cx={p.x+160} cy={p.y+115} r="4"/>)}</g>
      <g fill="#2458d3" stroke="#fff" strokeWidth="1">{[0,1,2].map(i => <circle key={i} data-signal="" r="3"/>)}</g>
    </svg>
    {!reduced && <button type="button" onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Play animation' : 'Pause animation'}</button>}
  </div>;
}
