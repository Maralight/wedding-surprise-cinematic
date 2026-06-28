const screens=[...document.querySelectorAll('.screen')];
let current=0;
const bgMusic=document.getElementById('bgMusic');
const chime=document.getElementById('softChime');
const finalVideo=document.getElementById('finalVideo');
const cursor=document.getElementById('cursorHeart');
const glow=document.getElementById('pointerGlow');
let favoriteText='the beautiful way you love each other';
let promiseText='your peace, joy and friendship';
function vibrate(ms=25){if(navigator.vibrate)navigator.vibrate(ms)}
function playChime(){try{chime.currentTime=0;chime.play()}catch(e){}}
function showScreen(n){screens[current].classList.remove('active');current=n;screens[current].classList.add('active');vibrate(18);playChime()}
function typeText(el,text,done){el.textContent='';let i=0;const speed=26;const t=setInterval(()=>{el.textContent+=text[i]||'';i++;if(i>text.length){clearInterval(t);if(done)done()}},speed)}
function reveal(card,text){const parent=card.closest('.screen');const q=parent.querySelector('.question-card');const r=parent.querySelector('.reveal-card');const p=r.querySelector('.typewrite');q.classList.add('hidden');r.classList.remove('hidden');typeText(p,text,()=>{});}
document.getElementById('startBtn').onclick=()=>{bgMusic.volume=.35;bgMusic.play().catch(()=>{});showScreen(1)};
document.getElementById('fullscreenBtn').onclick=()=>{document.documentElement.requestFullscreen?.();vibrate(35)};
document.querySelectorAll('.choice').forEach(btn=>btn.onclick=()=>reveal(btn,btn.dataset.response));
document.querySelectorAll('.continue').forEach((btn,idx)=>btn.onclick=()=>showScreen(idx+2));
document.getElementById('favoriteSubmit').onclick=()=>{const input=document.getElementById('favoriteInput');favoriteText=input.value.trim()||favoriteText;reveal(input,`You wrote: “${favoriteText}.” May that never become ordinary. May it remain one of the small sacred things that makes this love feel like home.`)};
document.getElementById('promiseSubmit').onclick=()=>{const input=document.getElementById('promiseInput');promiseText=input.value.trim()||promiseText;reveal(input,`You chose to protect “${promiseText}.” That is a beautiful foundation for a marriage: not perfection, but two people guarding what matters most.`)};
document.getElementById('countdownBtn').onclick=()=>{const num=document.getElementById('countdownNumber');num.classList.remove('hidden');let c=5;num.textContent=c;const timer=setInterval(()=>{c--;num.textContent=c;if(c<=0){clearInterval(timer);launchFinal()}},1000)};
function launchFinal(){showScreen(7);setTimeout(()=>{finalVideo.muted=false;finalVideo.volume=.85;finalVideo.play().catch(()=>{finalVideo.muted=true;finalVideo.play().catch(()=>{})});},350);startConfetti();}
document.getElementById('replayBtn').onclick=()=>{finalVideo.currentTime=0;finalVideo.play();startConfetti()};
['favoriteInput','promiseInput'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter'){document.getElementById(id.replace('Input','Submit')).click()}}));
document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';if(Math.random()>.78){const h=document.createElement('span');h.className='trail-heart';h.textContent='♥';h.style.left=e.clientX+'px';h.style.top=e.clientY+'px';document.body.appendChild(h);setTimeout(()=>h.remove(),800)}});
function petals(){const layer=document.getElementById('roseLayer');setInterval(()=>{const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'♥':'❦';p.style.left=Math.random()*100+'vw';p.style.animationDuration=(6+Math.random()*6)+'s';p.style.fontSize=(16+Math.random()*18)+'px';layer.appendChild(p);setTimeout(()=>p.remove(),13000)},650)}petals();
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');let W,H,particles=[];function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}addEventListener('resize',resize);resize();for(let i=0;i<80;i++)particles.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+1,v:Math.random()*.35+.1});function drawParticles(){ctx.clearRect(0,0,W,H);ctx.fillStyle='rgba(247,215,150,.75)';particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y-=p.v;if(p.y<0){p.y=H;p.x=Math.random()*W}});requestAnimationFrame(drawParticles)}drawParticles();
const confettiCanvas=document.getElementById('confetti'),cctx=confettiCanvas.getContext('2d');let conf=[];function resizeC(){confettiCanvas.width=innerWidth;confettiCanvas.height=innerHeight}addEventListener('resize',resizeC);resizeC();function startConfetti(){conf=[];for(let i=0;i<220;i++)conf.push({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight,r:4+Math.random()*6,v:2+Math.random()*5,a:Math.random()*Math.PI*2});runConfetti()}function runConfetti(){cctx.clearRect(0,0,innerWidth,innerHeight);conf.forEach(o=>{cctx.save();cctx.translate(o.x,o.y);cctx.rotate(o.a);cctx.fillStyle=`hsla(${35+Math.random()*35},85%,65%,.9)`;cctx.fillRect(-o.r/2,-o.r/2,o.r,o.r*1.5);cctx.restore();o.y+=o.v;o.x+=Math.sin(o.y/40);o.a+=.05});if(conf.some(o=>o.y<innerHeight+30))requestAnimationFrame(runConfetti)}
