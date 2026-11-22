const rows = 5;
const columns = 7;
const shells = 3;
export const neuralIndices = Array.from({length: rows * columns * shells}, (_,i)=>i);
export const neuralEdges = neuralIndices.flatMap(i=>{
  const row=Math.floor(i/columns)%rows, col=i%columns;
  return [col<columns-1?i+1:-1,row<rows-1?i+columns:-1,
    row<rows-1&&col<columns-1?i+columns+1:-1].filter(j=>j>=0).map(j=>[i,j]);
});

export function neuralFrame(time:number) {
  const turn = Math.sin(time/18000)*.23;
  return neuralIndices.map(i=>{
    const shell=Math.floor(i/(rows*columns));
    const row=Math.floor(i/columns)%rows,col=i%columns;
    const theta=-1.3+col*.41+turn+(row%2)*.055;
    const phi=.35+row*.265;
    const radius=178;
    const x=radius*Math.sin(theta)*Math.sin(phi);
    const y=-radius*Math.cos(phi);
    const z=radius*Math.cos(theta)*Math.sin(phi)-(2-shell)*32;
    // Tilt the spherical patch around the corner, preserving a rounded arch.
    const tilt=.23;
    const tx=x*Math.cos(tilt)-y*Math.sin(tilt);
    const ty=x*Math.sin(tilt)+y*Math.cos(tilt);
    const perspective=490/(490-z);
    return {x:260+tx*perspective-(2-shell)*18,y:255+ty*perspective+(2-shell)*9,
      radius:(shell===2?2.5:1.8)*perspective,
      opacity:[.10,.25,.95][shell] * Math.min(1, (col+.35)/1.3, (columns-col-.65)/1.3, (row+.45)/1.2, (rows-row-.55)/1.2),
      blue:Math.sin(time/3200+col*.85+row*.6)>.05,
      shell};
  });
}
