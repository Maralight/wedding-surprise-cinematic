const frames=[...document.querySelectorAll('.frame')];
const loading=document.getElementById('loading');
const audioConsent=document.getElementById('audioConsent');
const bgMusic=document.getElementById('bgMusic');
const chime=document.getElementById('chime');
const startExperience=document.getElementById('startExperience');
const startMuted=document.getElementById('startMuted');
const finalVideo=document.getElementById('finalVideo');
let current=0;
let autoTimer=null;

window.addEventListener('load',()=>setTimeout(()=>loading.classList.add('hide'),1400));

function vibrate(ms=28){ if(navigator.vibrate) navigator.vibrate(ms); }
function playChime(){ chime.currentTime=0; chime.volume=.28; chime.play().catch(()=>{}); }
function requestFullscreen(){ const el=document.documentElement; if(el.requestFullscreen) el.requestFullscreen().catch(()=>{}); }
function typeFrame(frame){
  frame.querySelectorAll('.typewriter').forEach(el=>{
    const text=el.dataset.text||''; el.textContent=''; let i=0;
    const t=setInterval(()=>{ el.textContent+=text[i]||''; i++; if(i>text.length) clearInterval(t); },28);
  });
}
function showFrame(index){
  clearTimeout(autoTimer);
  frames[current].classList.remove('active');
  current=index;
  frames[current].classList.add('active');
  typeFrame(frames[current]);
  playChime(); vibrate();
  if(current>0 && current<5){ autoTimer=setTimeout(()=>showFrame(current+1),15000); }
  if(current===5) startCountdown();
  if(current===6) startFinale();
}
function revealThenNext(btn){
  const card=btn.closest('.glass-card');
  const reveal=card.querySelector('.reveal');
  if(reveal) reveal.classList.add('show');
  vibrate(35); playChime();
  clearTimeout(autoTimer);
  autoTimer=setTimeout(()=>showFrame(Math.min(current+1,6)),4200);
}

document.querySelectorAll('.next-btn').forEach(btn=>btn.addEventListener('click',()=>showFrame(1)));
document.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>revealThenNext(btn)));
document.querySelectorAll('.answer-btn').forEach(btn=>btn.addEventListener('click',()=>revealThenNext(btn)));
document.getElementById('replay').addEventListener('click',()=>{ finalVideo.pause(); finalVideo.currentTime=0; showFrame(0); });

startExperience.addEventListener('click',async()=>{
  audioConsent.classList.add('hide'); requestFullscreen(); bgMusic.volume=.22; bgMusic.play().catch(()=>{}); typeFrame(frames[0]); vibrate(40);
});
startMuted.addEventListener('click',()=>{ audioConsent.classList.add('hide'); requestFullscreen(); typeFrame(frames[0]); vibrate(40); });

function startCountdown(){
  const el=document.getElementById('countdown'); let n=5; el.textContent=n;
  const int=setInterval(()=>{ n--; el.textContent=n; vibrate(20); if(n<=0){ clearInterval(int); showFrame(6); } },1000);
}
function startFinale(){
  confettiBurst(); bgMusic.volume=.12; finalVideo.play().catch(()=>{});
}

// Rose petals
const petals=document.getElementById('petals');
function spawnPetal(){
  const p=document.createElement('span'); p.className='petal';
  p.style.left=Math.random()*100+'vw'; p.style.setProperty('--x',(Math.random()*160-80)+'px');
  p.style.animationDuration=(7+Math.random()*8)+'s'; p.style.animationDelay='0s';
  petals.appendChild(p); setTimeout(()=>p.remove(),16000);
}
setInterval(spawnPetal,420);

// Golden particles canvas
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;} resize(); addEventListener('resize',resize);
for(let i=0;i<85;i++) particles.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+0.6,v:Math.random()*0.45+0.1,a:Math.random()*Math.PI*2});
function draw(){
  ctx.clearRect(0,0,W,H); ctx.fillStyle='rgba(255,207,104,.75)';
  particles.forEach(p=>{ p.y-=p.v; p.x+=Math.sin(p.a+=.01)*.25; if(p.y<0){p.y=H;p.x=Math.random()*W} ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
  requestAnimationFrame(draw);
} draw();

function confettiBurst(){
  for(let i=0;i<150;i++){
    const c=document.createElement('span'); c.className='petal';
    c.style.left='50vw'; c.style.top='50vh'; c.style.background=i%2?'#ffd36c':'#f3b2bd';
    c.style.setProperty('--x',(Math.random()*900-450)+'px'); c.style.animationDuration=(2+Math.random()*2)+'s';
    petals.appendChild(c); setTimeout(()=>c.remove(),5000);
  }
}
