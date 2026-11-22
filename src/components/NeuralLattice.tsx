import { useEffect, useRef, useState } from "react";
import styles from "../styles/neuralLattice.module.css";

const layers = 8;
const spokes = 9;
const indices = Array.from({ length: layers * spokes }, (_, i) => i);
const edges = indices.flatMap(i => {
  const row = Math.floor(i / spokes), col = i % spokes;
  return [col < spokes - 1 ? i + 1 : -1, row < layers - 1 ? i + spokes : -1,
    row < layers - 1 && col < spokes - 1 ? i + spokes + 1 : -1]
    .filter(j => j >= 0).map(j => [i, j]);
});

export default function NeuralLattice() {
  const svg = useRef<SVGSVGElement>(null);
  const clock = useRef(4500);
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
    // Cache elements once: only update the small illustration at 25 fps.
    const lines = [...root.querySelectorAll<SVGLineElement>('[data-edge]')];
    const circles = [...root.querySelectorAll<SVGCircleElement>('[data-node]')];
    const facets = [...root.querySelectorAll<SVGPathElement>('[data-facet]')];
    const signals = [...root.querySelectorAll<SVGCircleElement>('[data-signal]')];
    let frame = 0, last = 0, visible = true;
    const paint = (time: number) => {
      // Rings advance from a distant vanishing point towards the viewer.
      // A curved open cone, tilted in three dimensions, gives a canopy rather
      // than a flat rectangular grid. The near edge exits the page corner.
      const points = indices.map(i => {
        const row = Math.floor(i / spokes), col = i % spokes;
        const depth = (row / layers + time / 28000) % 1;
        const sweep = time / 15000;
        const theta = -2.0 + col * .34 + sweep;
        const radius = 18 + depth * 160;
        const x = 30 + depth * 230 + Math.sin(theta) * radius;
        const y = -35 - depth * 75 + Math.cos(theta) * radius * .9;
        const z = -500 + depth * 710 + Math.cos(theta) * radius * .38;
        const perspective = 460 / (460 - z);
        const tint = (Math.sin(theta + depth * 5 - time / 2600) + 1) / 2;
        const rgb = [12 + tint * 24, 25 + tint * 63, 43 + tint * 168].map(Math.round);
        return { x: 38 + x * perspective, y: 178 + y * perspective,
          depth, radius: 1.1 + perspective * 2.5, color: `rgb(${rgb.join(',')})`,
          opacity: Math.min(1, depth * 9, (1 - depth) * 12) };
      });
      edges.forEach(([a,b], i) => {
        const p=points[a], q=points[b];
        const show = Math.abs(p.depth-q.depth) < .2;
        const opacity = show ? Math.min(p.opacity,q.opacity) : 0;
        const line=lines[i];
        line.setAttribute('x1',String(p.x)); line.setAttribute('y1',String(p.y));
        line.setAttribute('x2',String(q.x)); line.setAttribute('y2',String(q.y));
        line.setAttribute('opacity',String(opacity * (.18 + p.depth * .22)));
        const facet=facets[i];
        if(facet){
          const c=points[Math.min(a+1,points.length-1)];
          facet.setAttribute('d',`M${p.x},${p.y} L${q.x},${q.y} L${c.x},${c.y} Z`);
          facet.setAttribute('opacity',String(opacity * .045));
        }
      });
      circles.forEach((circle,i) => {
        const p=points[i]; circle.setAttribute('cx',String(p.x));circle.setAttribute('cy',String(p.y));
        circle.setAttribute('r',String(p.radius)); circle.setAttribute('fill',p.color);
        circle.setAttribute('opacity',String(p.opacity));
      });
      signals.forEach((circle,i) => {
        const [a,b]=edges[(i*37+8)%edges.length], p=points[a], q=points[b];
        const t=(time/4200+i*.25)%1;
        circle.setAttribute('cx',String(p.x+(q.x-p.x)*t));circle.setAttribute('cy',String(p.y+(q.y-p.y)*t));
        circle.setAttribute('opacity',String(Math.abs(p.depth-q.depth)<.2 ? Math.min(p.opacity,q.opacity)*.8 : 0));
      });
    };
    paint(clock.current);
    const tick=(now:number) => {
      if(last && now-last<40){frame=requestAnimationFrame(tick);return;}
      if(last)clock.current+=Math.min(now-last,80);
      last=now;paint(clock.current);frame=requestAnimationFrame(tick);
    };
    const sync=()=>{cancelAnimationFrame(frame);last=0;if(!paused&&!reduced&&visible&&!document.hidden)frame=requestAnimationFrame(tick);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
    observer.observe(root);document.addEventListener('visibilitychange',sync);sync();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',sync);};
  },[paused,reduced]);
  return <div className={styles.neural}>
    <svg ref={svg} viewBox="0 0 500 280" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="neural-halo"><stop stopColor="#dce7ff" stopOpacity=".65"/><stop offset="1" stopColor="#f7f8fa" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="325" cy="125" rx="235" ry="130" fill="url(#neural-halo)"/>
      <g fill="#2458d3">{edges.map((_,i)=><path data-facet="" key={i} opacity="0"/>)}</g>
      <g stroke="#2458d3" strokeWidth=".8">{edges.map((_,i)=><line data-edge="" key={i} opacity="0"/>)}</g>
      <g>{indices.map(i=><circle data-node="" key={i} r="0"/>)}</g>
      <g fill="#2458d3" stroke="#fff" strokeWidth=".6">{[0,1,2].map(i=><circle data-signal="" key={i} r="2.1" opacity="0"/>)}</g>
    </svg>
    {!reduced&&<button type="button" onClick={()=>setPaused(p=>!p)} aria-pressed={paused}>{paused?'Play animation':'Pause animation'}</button>}
  </div>;
}
