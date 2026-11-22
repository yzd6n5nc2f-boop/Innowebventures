import { useEffect, useRef, useState } from "react";
import styles from "../styles/neuralLattice.module.css";

import { neuralFrame, neuralIndices as indices, neuralEdges as edges } from "../content/neuralGeometry";

export default function NeuralLattice() {
  const svg = useRef<SVGSVGElement>(null);
  const clock = useRef(4500);
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
      const points = neuralFrame(time);
      edges.forEach(([a,b], i) => {
        const p=points[a], q=points[b];
        const opacity = Math.min(p.opacity,q.opacity);
        const line=lines[i];
        line.setAttribute('x1',String(p.x)); line.setAttribute('y1',String(p.y));
        line.setAttribute('x2',String(q.x)); line.setAttribute('y2',String(q.y));
        line.setAttribute('opacity',String(opacity * .35));
        const facet=facets[i];
        if(facet){
          const c=points[Math.min(a+1,points.length-1)];
          facet.setAttribute('d',`M${p.x},${p.y} L${q.x},${q.y} L${c.x},${c.y} Z`);
          facet.setAttribute('opacity',String(opacity * .045));
        }
      });
      circles.forEach((circle,i) => {
        const p=points[i]; circle.setAttribute('cx',String(p.x));circle.setAttribute('cy',String(p.y));
        circle.setAttribute('r',String(p.radius)); circle.setAttribute('fill',p.blue ? 'url(#neural-blue)' : 'url(#neural-ink)');
        circle.setAttribute('opacity',String(p.opacity));
      });
      signals.forEach((circle,i) => {
        const [a,b]=edges[(i*37+8)%edges.length], p=points[a], q=points[b];
        const t=(time/4200+i*.25)%1;
        circle.setAttribute('cx',String(p.x+(q.x-p.x)*t));circle.setAttribute('cy',String(p.y+(q.y-p.y)*t));
        circle.setAttribute('opacity',String(Math.min(p.opacity,q.opacity)*.8));
      });
    };
    paint(clock.current);
    const tick=(now:number) => {
      if(last && now-last<40){frame=requestAnimationFrame(tick);return;}
      if(last)clock.current+=Math.min(now-last,80);
      last=now;paint(clock.current);frame=requestAnimationFrame(tick);
    };
    const sync=()=>{cancelAnimationFrame(frame);last=0;if(!reduced&&visible&&!document.hidden)frame=requestAnimationFrame(tick);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
    observer.observe(root);document.addEventListener('visibilitychange',sync);sync();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',sync);};
  },[reduced]);
  return <div className={styles.neural}>
    <svg ref={svg} viewBox="0 0 500 280" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="neural-blue" cx="30%" cy="25%"><stop stopColor="#719bf4"/><stop offset=".45" stopColor="#2458d3"/><stop offset="1" stopColor="#153e9c"/></radialGradient>
        <radialGradient id="neural-ink" cx="30%" cy="25%"><stop stopColor="#526176"/><stop offset=".4" stopColor="#152235"/><stop offset="1" stopColor="#080e18"/></radialGradient>
        <radialGradient id="neural-halo"><stop stopColor="#dce7ff" stopOpacity=".65"/><stop offset="1" stopColor="#f7f8fa" stopOpacity="0"/></radialGradient>
        <linearGradient id="neural-edge-fade"><stop stopColor="white" stopOpacity="0"/><stop offset=".16" stopColor="white"/><stop offset=".9" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
        <linearGradient id="neural-height-fade" x2="0" y2="1"><stop stopColor="white" stopOpacity="0"/><stop offset=".12" stopColor="white"/><stop offset=".8" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
        <mask id="neural-soft-edges"><rect width="500" height="280" fill="url(#neural-edge-fade)"/></mask>
        <mask id="neural-soft-height"><rect width="500" height="280" fill="url(#neural-height-fade)"/></mask>
      </defs>
      <ellipse cx="310" cy="140" rx="170" ry="135" fill="url(#neural-halo)"/>
      <g mask="url(#neural-soft-edges)"><g mask="url(#neural-soft-height)">
      <g fill="#2458d3">{edges.map((_,i)=><path data-facet="" key={i} opacity="0"/>)}</g>
      <g stroke="#2458d3" strokeWidth=".8">{edges.map((_,i)=><line data-edge="" key={i} opacity="0"/>)}</g>
      <g>{indices.map(i=><circle data-node="" key={i} r="0"/>)}</g>
      <g fill="#2458d3" stroke="#fff" strokeWidth=".6">{[0,1,2].map(i=><circle data-signal="" key={i} r="2.1" opacity="0"/>)}</g>
      </g></g>
    </svg>
  </div>;
}
