(() => {
  const records = {
    nexah: {type:"ORIENTATION HUB",title:"C Connect",copy:"Die Karte zwischen den Karten: Sie macht Wege und Zuständigkeiten sichtbar, ohne die Quellen zu verschmelzen.",role:"Route & return",boundary:"Navigation, keine neue Authority",trace:"Every door keeps its source"},
    human: {type:"EXPERIENCE FIELD",title:"NEXAHEDRON & Channels",copy:"Die Human View bündelt NEXAHEDRON, NEXAH Experience, Are.na und weitere öffentliche Kanäle als verschiedene Erscheinungsformen — nicht als neue Autoritäten.",role:"Experience & return",boundary:"Channel ≠ source authority",trace:"NEXAHEDRON · Experience · Are.na",href:"A0_NEXAH_APERTURE_JOURNEY.html#human-view",action:"ENTER HUMAN VIEW →"},
    science: {type:"SCIENCE FIELD",title:"Science Lab & ORION",copy:"Science Lab hält Programme, Evidence und Grenzen lesbar; ORION trägt den deterministischen Implementierungskern. Forschung und Core bleiben unterscheidbar.",role:"Evidence & implementation",boundary:"Core ≠ total ecosystem",trace:"Science Lab · ORION",href:"A0_SCIENCE.html",action:"ENTER SCIENCE VIEW →",sourceHref:"https://github.com/Scarabaeus1031/NEXAH-Science-Lab",sourceAction:"OPEN SCIENCE SOURCE ↗"},
    builder: {type:"BUILDER FIELD",title:"Scarabæus & Werkstatt",copy:"Scarabæus bündelt unabhängiges Studio, gebaute Objekte und Werkstattwege. Prototyp, Werkzeug und Veröffentlichung behalten ihren jeweiligen Status.",role:"Object & build path",boundary:"Prototype ≠ released product",trace:"Scarabæus · Werkstatt · Builder Desk",href:"A0_BUILDER_TOY_STORE.html",action:"ENTER BUILDER VIEW →",sourceHref:"https://www.scarabaeus1033.net/",sourceAction:"OPEN SCARABAEUS ↗"}
  };
  const nodes = [...document.querySelectorAll(".system-node")];
  const out = {type:document.querySelector("#cardType"),title:document.querySelector("#cardTitle"),copy:document.querySelector("#cardCopy"),role:document.querySelector("#cardRole"),boundary:document.querySelector("#cardBoundary"),trace:document.querySelector("#cardTrace"),link:document.querySelector("#cardLink"),source:document.querySelector("#cardSource")};
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const show = node => {
    const data = records[node.dataset.key]; if (!data) return;
    nodes.forEach(item => item.classList.toggle("active", item === node));
    out.type.textContent=data.type;out.title.textContent=data.title;out.copy.textContent=data.copy;out.role.textContent=data.role;out.boundary.textContent=data.boundary;out.trace.textContent=data.trace;
    if (data.href) {out.link.hidden=false;out.link.href=data.href;out.link.textContent=data.action;} else {out.link.hidden=true;out.link.removeAttribute("href");}
    if (data.href && /^https?:/.test(data.href)) {out.link.target="_blank";out.link.rel="noopener";} else {out.link.removeAttribute("target");out.link.removeAttribute("rel");}
    if (data.sourceHref) {out.source.hidden=false;out.source.href=data.sourceHref;out.source.textContent=data.sourceAction;out.source.target="_blank";out.source.rel="noopener";} else {out.source.hidden=true;out.source.removeAttribute("target");out.source.removeAttribute("rel");}
  };
  nodes.forEach(node=>{node.addEventListener("click",()=>show(node));node.addEventListener("focus",()=>show(node));});
  const lensNodes = {human:"human",science:"science",builder:"builder"};
  const lensButtons = [...document.querySelectorAll("[data-lens]")];
  const lensPanels = [...document.querySelectorAll("[data-lens-panel]")];
  const chooseLens = lens => {
    lensButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lens === lens)));
    lensPanels.forEach(panel => { panel.hidden = panel.dataset.lensPanel !== lens; });
    const node = nodes.find(item => item.dataset.key === lensNodes[lens]);
    if (node) show(node);
  };
  lensButtons.forEach(button => button.addEventListener("click", () => chooseLens(button.dataset.lens)));
  show(nodes[0]);

  const canvas=document.querySelector("#connectCanvas"),ctx=canvas?.getContext("2d");
  if(!ctx)return;let points=[],w=0,h=0,t=0;
  const resize=()=>{const d=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=Array.from({length:48},(_,i)=>({a:(i/48)*Math.PI*2,r:80+Math.random()*Math.min(w,h)*.44,s:.0007+Math.random()*.0012,z:1+Math.random()*2.4}));};
  const draw=()=>{ctx.clearRect(0,0,w,h);const cx=w*.72,cy=h*.46;for(const p of points){p.a+=p.s;const x=cx+Math.cos(p.a)*p.r,y=cy+Math.sin(p.a)*p.r*.62;ctx.beginPath();ctx.arc(x,y,p.z,0,Math.PI*2);ctx.fillStyle=`rgba(${p.r%3<1?240:67},${p.r%3<1?79:215},${p.r%3<1?167:239},.5)`;ctx.fill();ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.strokeStyle="rgba(86,157,182,.055)";ctx.stroke();}t++;requestAnimationFrame(draw);};
  addEventListener("resize",resize,{passive:true});resize();if(!matchMedia("(prefers-reduced-motion: reduce)").matches)draw();
})();
