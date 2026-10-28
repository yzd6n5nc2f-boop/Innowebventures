// Use the build timestamp for the first browser render so scheduled article
// listings match the HTML even when a deployment crosses a publication date.
let renderTime = Date.now();

export function setRenderTime(value: number) {
  renderTime = value;
}

export function getRenderTime() {
  return renderTime;
}
