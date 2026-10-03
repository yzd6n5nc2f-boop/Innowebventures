(()=>{
const motion=matchMedia('(prefers-reduced-motion: reduce)');let dispose=()=>{};
function attach(){
const hero=document.querySelector('._hero_n7zth_10');if(!hero){dispose();dispose=()=>{};return}if(hero.querySelector('.neural-stage'))return;dispose();
const stage=document.createElement('div');stage.className='neural-stage';stage.innerHTML='<iframe class="neural-model" title="Interactive human brain neural network" src="/assets/brain/index.html?v=transparent" loading="lazy"></iframe><div class="neural-label" aria-hidden="true">PEOPLE<br>WORKFLOWS<br>INTELLIGENCE</div><div class="neural-pedestal" aria-hidden="true"><span></span><span></span><span></span></div><div class="neural-ai" role="img" aria-label="Forge Ai"><div class="neural-ai-spin" aria-hidden="true"><span class="neural-ai-size">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:-5px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:-4px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:-3px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:-2px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:-1px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:0px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:1px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:2px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:3px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-depth" style="--letter-z:4px">Forge <b class="forge-letter-a">A</b>i</span><span class="neural-ai-face">Forge <b class="forge-letter-a">A</b>i</span></div></div><div class="neural-caption" aria-hidden="true">Intelligence in context</div><button class="neural-motion" aria-label="Pause neural animation">Pause motion</button>';hero.append(stage);
const frame=stage.querySelector('iframe'),button=stage.querySelector('button');let paused=motion.matches,visible=true,ready=false;
const send=data=>{if(ready)frame.contentWindow?.postMessage(data,location.origin)};
function sync(){stage.dataset.motion=paused||!visible||document.hidden?'paused':'running';button.textContent=paused?'Play motion':'Pause motion';button.setAttribute('aria-label',paused?'Play neural animation':'Pause neural animation');send({type:'brain-motion',run:!paused});send({type:'brain-visibility',visible})}
button.onclick=()=>{paused=!paused;sync()};sync();
const messages=e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow)return;if(e.data?.type==='brain-ready'){ready=true;sync()}if(e.data?.type==='brain-unavailable')frame.dataset.fallback='true'};addEventListener('message',messages);
const preference=e=>{paused=e.matches;sync()};motion.addEventListener('change',preference);
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()});observer.observe(stage);
const visibility=()=>sync();document.addEventListener('visibilitychange',visibility);
dispose=()=>{document.removeEventListener('visibilitychange',visibility);observer.disconnect();removeEventListener('message',messages);motion.removeEventListener('change',preference)};
}
function enhance(){attach();document.querySelectorAll('._appPreview_n7zth_329').forEach((preview,i)=>{if(preview.dataset.mark)return;preview.dataset.mark=['TR','BF','PF','WT'][i%4];preview.querySelectorAll('iframe').forEach(f=>f.remove())});
}
new MutationObserver(()=>{enhance()}).observe(document.getElementById('root'),{childList:true,subtree:true});enhance();
})();
