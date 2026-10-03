(()=>{
const logos=[['neuralforge','NeuralForge'],['forge-coder','Forge Coder'],['forgeops','ForgeOps'],['forge-robotics-lab','Forge Robotics Lab'],['game-forge-studio','Game Forge Studio'],['forge-media-studio','Forge Media Studio']];
function showcase(){const target=document.querySelector('#forge-suite ._sectionInner_n7zth_229');if(!target||target.querySelector('.forge-logo-showcase'))return;const gallery=document.createElement('div');gallery.className='forge-logo-showcase';gallery.innerHTML='<div class="forge-logo-heading">The Forge Suite</div><div class="forge-logo-grid">'+logos.map(([slug,name])=>`<a href="/forge-suite/${slug}"><img src="/branding/forge-suite/logos/${slug}.png" alt="" width="90" height="90" loading="lazy"><span>${name}</span></a>`).join('')+'</div>';target.append(gallery)}
new MutationObserver(showcase).observe(document.getElementById('root'),{childList:true,subtree:true});showcase();
})();
