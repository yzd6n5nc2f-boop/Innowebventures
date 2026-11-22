const rows = 7;
const columns = 12;
export const neuralIndices = Array.from({length: rows * columns}, (_,i)=>i);
export const neuralEdges = neuralIndices.flatMap(i=>{
  const row=Math.floor(i/columns),col=i%columns;
  return [row*columns+(col+1)%columns,row<rows-1?i+columns:-1,
    row<rows-1?(row+1)*columns+(col+1)%columns:-1].filter(j=>j>=0).map(j=>[i,j]);
});

export function neuralFrame(time:number) {
  const turn=time/16000;
  return neuralIndices.map(i=>{
    const row=Math.floor(i/columns),col=i%columns;
    const theta=col*Math.PI*2/columns+turn+(row%2)*.12;
    const phi=.15+row*(Math.PI-.3)/(rows-1);
    const radius=128;
    const x=radius*Math.sin(phi)*Math.cos(theta);
    const y=-radius*Math.cos(phi);
    const z=radius*Math.sin(phi)*Math.sin(theta);
    const tilt=.23;
    const tx=x*Math.cos(tilt)-y*Math.sin(tilt);
    const ty=x*Math.sin(tilt)+y*Math.cos(tilt);
    const perspective=490/(490-z);
    const leftFade=.2+.8*Math.min(1,Math.max(0,(tx/radius+1)*1.2));
    const bottomFade=.2+.8*Math.min(1,Math.max(0,(1-ty/radius)*1.2));
    const depthFade=.18+.78*(z/radius+1)/2;
    return {x:310+tx*perspective,y:140+ty*perspective,
      radius:2.5*perspective,
      opacity:depthFade*leftFade*bottomFade,
      blue:Math.sin(time/3200+col*.85+row*.6)>.05};
  });
}
