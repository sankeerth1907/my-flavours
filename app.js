/* MYFLAVOURS app — menu data (CMS-ready), rendering, ordering, forms, scroll */
"use strict";
window.__MYFLAVOURS_CONFIG__ = { whatsapp: "916364533529", backendEndpoint: "" /* future CMS/CRM POST URL */ };

const WA = () => window.__MYFLAVOURS_CONFIG__.whatsapp;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
function track(ev, data){ /* analytics-ready stub: plug GA/Meta here */ if(window.gtag) gtag("event", ev, data||{}); }

/* ---------- MENU DATA (separate from UI; prices intentionally absent) ---------- */
const IMG = {
  starter:"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=700&auto=format&fit=crop",
  curry:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=700&auto=format&fit=crop",
  biryani:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=700&auto=format&fit=crop",
  meals:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?q=80&w=700&auto=format&fit=crop",
  roti:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=700&auto=format&fit=crop",
  fry:"https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=700&auto=format&fit=crop"
};
const D = (name, cat, desc, img, diet) => ({ name, cat, desc, img, veg:(diet||"veg")==="veg", diet:diet||"veg", price:null, portion:null, available:true });
const NV = (name, cat, desc, img) => D(name, cat, desc, img, "nonveg");
const menuCategories = [
  { id:"starters", name:"Starters", items:[
    D("Harabara Kabab","Starters","Spinach, peas & potato patties — crisp outside, soft inside.",IMG.starter),
    D("Paneer Tikka","Starters","Smoked cottage cheese, peppers & warm masala.",IMG.starter),
    D("Paneer 65","Starters","Fiery South-style toss with curry leaves & red chillies.",IMG.starter),
    D("Paneer Majestic","Starters","Creamy, peppery Hyderabad favourite.",IMG.starter),
    D("Karivepaku Mushroom","Starters","Mushrooms tossed with curry leaf & cracked pepper.",IMG.starter),
    D("Pepper Mushroom","Starters","Bold black-pepper roast, home-style.",IMG.starter),
    D("Golden Fried Babycorn","Starters","Golden, crunchy, lightly spiced.",IMG.starter),
    D("Veg Manchuria","Starters","Indo-Chinese vegetable dumplings in garlic sauce.",IMG.starter),
    D("Aloo 65","Starters","Crisp potato tossed 65-style.",IMG.starter)]},
  { id:"curries", name:"Curries", items:[
    D("Gutti Vankaya","Curries","Stuffed brinjal simmered in peanut-sesame gravy.",IMG.curry),
    D("Paneer Butter Masala","Curries","Silky tomato-cashew makhani, kasuri methi.",IMG.curry),
    D("Kadai Paneer","Curries","Charred peppers & crushed coriander seeds.",IMG.curry),
    D("Kaju Paneer Masala","Curries","Cashew-rich, gently sweet celebration curry.",IMG.curry),
    D("Methi Chaman","Curries","Fresh fenugreek & soft paneer.",IMG.curry),
    D("Mushroom Curry","Curries","Home-style onion-tomato masala.",IMG.curry),
    D("Tomato Pappu","Curries","Andhra dal with tomato & ghee tempering.",IMG.curry),
    D("Akukura Pappu","Curries","Sorrel-leaf dal — tangy, comforting.",IMG.curry),
    D("MyFlavours Special Vada Curry","Curries","Our signature — crisp vadas folded into curry.",IMG.curry),
    D("Veg Kheema Curry","Curries","Finely minced vegetables, kheema-style masala.",IMG.curry),
    D("Papucharu","Curries","Everyday dalcharu, just like home.",IMG.curry),
    D("Rasam","Curries","Peppery, tangy, restorative.",IMG.curry),
    D("Aloo Kurma","Curries","Potato in coconut-cashew kurma.",IMG.curry),
    D("Mixed Veg Curry","Curries","Seasonal vegetables, gentle masala.",IMG.curry)]},
  { id:"biryani", name:"Biryanis & Pulavs", items:[
    D("Bagara Rice","Biryanis & Pulavs","Tempered rice — the perfect curry companion.",IMG.biryani),
    D("Paneer Biryani","Biryanis & Pulavs","Layered, fragrant, dum-style.",IMG.biryani),
    D("Veg Biryani","Biryanis & Pulavs","Garden vegetables & saffron-kissed rice.",IMG.biryani),
    D("Veg Pulav","Biryanis & Pulavs","Light, aromatic everyday pulav.",IMG.biryani),
    D("Mushroom Pulav","Biryanis & Pulavs","Earthy mushrooms, whole spices.",IMG.biryani),
    D("Jeera Rice","Biryanis & Pulavs","Ghee & roasted cumin.",IMG.biryani),
    D("Tomato Rice","Biryanis & Pulavs","Tangy, homely, lunchbox classic.",IMG.biryani),
    D("Curd Rice","Biryanis & Pulavs","Cooling, tempered, comforting.",IMG.biryani)]},
  { id:"meals", name:"Veg Meals", items:[
    D("Classic Veg Meal","Veg Meals","Sweet, roti, pachadi, papucharu/pappu, veg curry, fry, perugu charu, rasam, curd & fryums.",IMG.meals)]},
  { id:"roti", name:"Roti & Veg Frys", items:[
    D("Pulka","Roti & Veg Frys","Soft, puffed whole-wheat.",IMG.roti),
    D("Rotis","Roti & Veg Frys","Tawa-fresh everyday rotis.",IMG.roti),
    D("Jonna Roti","Roti & Veg Frys","Jowar millet roti — rustic & hearty.",IMG.roti),
    D("Ragi Roti","Roti & Veg Frys","Finger-millet roti, farm-grown.",IMG.roti),
    D("Dondakaya Kobbari Karam","Roti & Veg Frys","Ivy gourd with coconut-spice powder.",IMG.fry),
    D("Bendakaya Fry","Roti & Veg Frys","Crisp okra, peanut sprinkle.",IMG.fry),
    D("Kakarakaya Fry","Roti & Veg Frys","Bitter gourd fried to a crunch.",IMG.fry),
    D("Aratikaya Fry","Roti & Veg Frys","Raw banana, curry-leaf tempering.",IMG.fry),
    D("Aloo Fry","Roti & Veg Frys","Golden potato fry.",IMG.fry),
    D("Carrot Fry","Roti & Veg Frys","Sweet carrots, coconut.",IMG.fry),
    D("Chikudukaya Fry","Roti & Veg Frys","Broad beans, home masala.",IMG.fry),
    D("Munakaya Fry","Roti & Veg Frys","Drumstick fry — nostalgic & deep.",IMG.fry),
    D("Cabbage Fry","Roti & Veg Frys","Simple tempered cabbage.",IMG.fry)]},
  { id:"nv-starters", name:"Non-Veg Starters", diet:"nonveg", items:[
    NV("Chicken 65","Non-Veg Starters","The Chennai-Hyderabad legend — curry leaves, chillies.",IMG.starter),
    NV("Kaju Chicken Pakoda","Non-Veg Starters","Cashew-crusted chicken fritters.",IMG.starter),
    NV("Chicken Drumsticks","Non-Veg Starters","Juicy drumsticks, home masala.",IMG.starter),
    NV("Pepper Chicken","Non-Veg Starters","Cracked pepper, ghee tempering.",IMG.starter),
    NV("Butter Garlic Chicken","Non-Veg Starters","Mellow garlic-butter toss.",IMG.starter),
    NV("Coriander Chicken","Non-Veg Starters","Fresh coriander & green chilli.",IMG.starter),
    NV("Chicken Majestic","Non-Veg Starters","Creamy Hyderabad classic.",IMG.starter),
    NV("Chicken Roast","Non-Veg Starters","Slow-roasted, homely spices.",IMG.starter),
    NV("Liver Fry","Non-Veg Starters","Traditional iron-rich preparation.",IMG.starter),
    NV("Fish Fry (Korameenu)","Non-Veg Starters","Murrel fish, coastal masala.",IMG.starter),
    NV("Prawns Fry","Non-Veg Starters","Crisp prawns, curry-leaf toss.",IMG.starter),
    NV("Pepper Prawns","Non-Veg Starters","Bold pepper roast.",IMG.starter),
    NV("Kheema Balls","Non-Veg Starters","Hand-rolled minced meat balls.",IMG.starter)]},
  { id:"nv-biryani", name:"Non-Veg Biryanis & Pulavs", diet:"nonveg", items:[
    NV("Chicken Fry Piece Biryani","Non-Veg Biryanis & Pulavs","Crispy fry piece over dum rice.",IMG.biryani),
    NV("Chicken Biryani","Non-Veg Biryanis & Pulavs","Layered dum biryani, mirchi ka salan mood.",IMG.biryani),
    NV("Mutton Biryani","Non-Veg Biryanis & Pulavs","Slow-cooked mutton, fragrant rice.",IMG.biryani),
    NV("Prawns Pulav","Non-Veg Biryanis & Pulavs","Delicate prawn pulav.",IMG.biryani),
    NV("MyFlavours Spl Chicken Pulav","Non-Veg Biryanis & Pulavs","Our signature chicken pulav.",IMG.biryani),
    NV("MyFlavours Spl Mutton Pulav","Non-Veg Biryanis & Pulavs","Our signature mutton pulav.",IMG.biryani)]},
  { id:"nv-curries", name:"Non-Veg Curries", diet:"nonveg", items:[
    NV("Chicken Curry","Non-Veg Curries","Everyday home-style chicken curry.",IMG.curry),
    NV("Chicken Kheema","Non-Veg Curries","Minced chicken masala.",IMG.curry),
    NV("Natukodi Curry","Non-Veg Curries","Country chicken, slow fire.",IMG.curry),
    NV("Gongura Chicken","Non-Veg Curries","Sorrel-leaf tang, Andhra soul.",IMG.curry),
    NV("Menthikura Chicken","Non-Veg Curries","Fenugreek-leaf chicken.",IMG.curry),
    NV("Mutton Curry","Non-Veg Curries","Deep, slow, celebratory.",IMG.curry),
    NV("Nellore Chepala Pulusu","Non-Veg Curries","Korameenu / boche fish in tamarind stew.",IMG.curry),
    NV("Fish Iguru","Non-Veg Curries","Thick coastal fish roast.",IMG.curry),
    NV("Prawns Curry","Non-Veg Curries","Homely prawn curry.",IMG.curry),
    NV("Prawns Iguru","Non-Veg Curries","Dry-roast prawns.",IMG.curry),
    NV("Egg Masala","Non-Veg Curries","Eggs in onion-tomato masala.",IMG.curry),
    NV("Egg Pulusu","Non-Veg Curries","Tangy tamarind egg stew.",IMG.curry),
    NV("Egg Fry","Non-Veg Curries","Simple spiced egg fry.",IMG.curry)]}
];
const allDishes = menuCategories.flatMap(c => c.items);

/* ---------- SIGNATURE ---------- */
const sig = ["MyFlavours Special Vada Curry","Gutti Vankaya","Paneer Biryani","Paneer Tikka","Tomato Pappu","Classic Veg Meal","Jonna Roti","Karivepaku Mushroom"]
  .map(n => allDishes.find(d=>d.name===n)).filter(Boolean);
const rail = document.getElementById("sigRail");
sig.forEach(d=>{
  const b=document.createElement("button"); b.className="sig-card";
  b.innerHTML=`<span class="im"><img loading="lazy" src="${d.img}" alt="${d.name}"></span><div><h3>${d.name}</h3><p>${d.desc}</p></div>`;
  b.onclick=()=>openDish(d); rail.appendChild(b);
});
document.getElementById("sigPrev").onclick=()=>rail.scrollBy({left:-340,behavior:reduced?"auto":"smooth"});
document.getElementById("sigNext").onclick=()=>rail.scrollBy({left:340,behavior:reduced?"auto":"smooth"});

/* ---------- MENU UI ---------- */
const tabs=document.getElementById("tabs"), grid=document.getElementById("menuGrid"), search=document.getElementById("mSearch");
let activeCat="all", q="", diet="veg", expanded=false;
const moreWrap=document.getElementById("menuMoreWrap"), moreBtn=document.getElementById("menuMore");
const dietCats=()=>menuCategories.filter(c=>(c.diet||"veg")===diet);
document.querySelectorAll(".diet").forEach(b=>b.onclick=()=>{diet=b.dataset.diet;
  document.querySelectorAll(".diet").forEach(x=>x.classList.toggle("active",x===b));
  activeCat="all"; expanded=false; renderTabs(); renderMenu(); track("menu_diet",{diet})});
moreBtn.onclick=()=>{expanded=!expanded;renderMenu()};
function renderTabs(){
  tabs.innerHTML="";
  const cats=dietCats();
  if(!cats.some(c=>c.id===activeCat)) activeCat="all";
  [{id:"all",name:"All"},...cats].forEach(c=>{
    const b=document.createElement("button"); b.className="tab"+(c.id===activeCat?" active":"");
    b.textContent=c.name; b.setAttribute("role","tab"); b.setAttribute("aria-selected",c.id===activeCat);
    b.onclick=()=>{activeCat=c.id;expanded=false;renderTabs();renderMenu();track("menu_category",{cat:c.id})};
    tabs.appendChild(b);
  });
}
function renderMenu(){
  grid.innerHTML="";
  /* searching ignores the category pill so results never hide behind a filter */
  const cats=q?dietCats():dietCats().filter(c=>activeCat==="all"||c.id===activeCat);
  const dishes=[];
  cats.forEach(c=>c.items.filter(d=>d.name.toLowerCase().includes(q)).forEach(d=>dishes.push({d,c})));
  const shown=expanded?dishes:dishes.slice(0,6);
  shown.forEach(({d,c})=>{
    const b=document.createElement("button"); b.className="mi"+(d.veg?"":" nonveg");
    b.innerHTML=`<span class="im"><img loading="lazy" src="${d.img}" alt="${d.name}"></span><div><span class="cat">${c.name}</span><h3><span class="vegdot" title="Veg"></span>${d.name}</h3><p>${d.desc}</p></div>`;
    b.onclick=()=>{openDish(d);track("menu_item_click",{item:d.name})};
    grid.appendChild(b);
  });
  if(!dishes.length) grid.innerHTML="<p style='color:var(--mut)'>No dishes match your search — try ‘paneer’ or ‘chicken’.</p>";
  if(dishes.length>6){moreWrap.hidden=false;moreBtn.textContent=expanded?"Show less ↑":`Show all ${dishes.length} dishes ↓`}
  else moreWrap.hidden=true;
}
search.addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();expanded=false;renderMenu()});
renderTabs(); renderMenu();

/* ---------- DISH MODAL ---------- */
const dishModal=document.getElementById("dishModal"); let currentDish=null;
function openDish(d){ currentDish=d;
  document.getElementById("dmImg").src=d.img; document.getElementById("dmImg").alt=d.name;
  document.getElementById("dmTitle").textContent=d.name; document.getElementById("dmDesc").textContent=d.desc;
  const badge=dishModal.querySelector(".veg");
  badge.innerHTML=`<span></span> ${d.veg?"Pure Veg":"Non-Veg"} · Home-style`;
  badge.style.color=d.veg?"#1d7a3a":"#a33";
  dishModal.classList.add("open"); dishModal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
document.getElementById("dmOrder").onclick=e=>{e.preventDefault();closeModals();openOrder(currentDish?currentDish.name:null)};

/* ---------- ORDER MODAL ---------- */
const orderModal=document.getElementById("orderModal"), pick=document.getElementById("orderPick");
const sel=new Map();
function buildPick(pre){
  pick.innerHTML="";
  menuCategories.forEach(c=>c.items.forEach(d=>{
    if(pre===d.name) sel.set(d.name,1);
    const row=document.createElement("div"); row.className="op"+(sel.has(d.name)?" sel":"");
    const qty=sel.get(d.name)||0;
    row.innerHTML=`<strong>${d.name}</strong><span class="qty"><button type="button" data-a="-" aria-label="less">−</button><b>${qty}</b><button type="button" data-a="+" aria-label="more">+</button></span><small>${c.name}</small>`;
    const [minus,plus]=row.querySelectorAll("button");
    const upd=()=>{const v=sel.get(d.name)||0;row.querySelector("b").textContent=v;row.classList.toggle("sel",sel.has(d.name))};
    minus.onclick=ev=>{ev.stopPropagation();const v=(sel.get(d.name)||0)-1;v<=0?sel.delete(d.name):sel.set(d.name,v);upd()};
    plus.onclick=ev=>{ev.stopPropagation();sel.set(d.name,(sel.get(d.name)||0)+1);upd()};
    row.onclick=()=>{sel.has(d.name)?sel.delete(d.name):sel.set(d.name,1);upd()};
    pick.appendChild(row);
  }));
}
function openOrder(pre){
  sel.clear(); if(document.getElementById("locNote")) { const m=document.getElementById("locNote").textContent.match(/from (.+)/); if(m) document.getElementById("orderLoc").value=m[1].trim(); }
  const f=document.getElementById("orderForm"); f.reset();
  const t=new Date(Date.now()+864e5); f.date.value=t.toISOString().slice(0,10);
  buildPick(pre||null);
  orderModal.classList.add("open"); orderModal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
document.querySelectorAll("[data-order-open]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();closeModals();openOrder(null);track("hero_order_click")}));
function closeModals(){[dishModal,orderModal].forEach(m=>{m.classList.remove("open");m.setAttribute("aria-hidden","true")});document.body.style.overflow=""}
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModals);
addEventListener("keydown",e=>{if(e.key==="Escape")closeModals()});
document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target), err=document.getElementById("orderErr");
  const items=[...sel.entries()].map(([n,v])=>`${n} x${v}`).join(", ");
  if(!f.get("name")||!f.get("date")||!items){err.hidden=false;err.textContent="Please add your name, date and at least one dish.";return}
  err.hidden=true; track("whatsapp_order_click",{n:sel.size});
  const msg=`Hello MyFlavours,%0AI would like to place a pre-order.%0A%0AName: ${encodeURIComponent(f.get("name"))}%0ALocation: ${encodeURIComponent(f.get("location"))}%0APreferred Date: ${encodeURIComponent(f.get("date"))}%0AMeal: ${encodeURIComponent(f.get("meal"))}%0AItems: ${encodeURIComponent(items)}%0AAdditional Requirements: ${encodeURIComponent(f.get("notes")||"-")}%0A%0APlease confirm availability and order details.`;
  open(`https://wa.me/${WA()}?text=${msg}`,"_blank"); closeModals();
});

/* ---------- CORPORATE ---------- */
document.getElementById("corpWa").href=`https://wa.me/${WA()}?text=${encodeURIComponent("Hello MyFlavours, I would like to enquire about corporate / bulk orders.")}`;
document.getElementById("corpForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target), ok=document.getElementById("corpOk"), er=document.getElementById("corpErr");
  if(!f.get("name")||!/^[0-9+ ]{10,15}$/.test(f.get("phone")||"")||!f.get("company")||!f.get("location")||!f.get("headcount")||!f.get("reqtype")){
    er.hidden=false;er.textContent="Please complete name, valid phone, company, location, headcount and requirement type.";ok.hidden=true;track("corporate_form_start");return}
  er.hidden=true;ok.hidden=false;track("corporate_form_submit");
  const msg=`Hello MyFlavours,%0ACorporate/Bulk enquiry:%0AName: ${encodeURIComponent(f.get("name"))}%0ACompany: ${encodeURIComponent(f.get("company"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0AEmail: ${encodeURIComponent(f.get("email")||"-")}%0ALocation: ${encodeURIComponent(f.get("location"))}%0APeople: ${encodeURIComponent(f.get("headcount"))}%0AType: ${encodeURIComponent(f.get("reqtype"))}%0ADate: ${encodeURIComponent(f.get("date")||"-")}%0AFrequency: ${encodeURIComponent(f.get("freq")||"-")}%0AMessage: ${encodeURIComponent(f.get("message")||"-")}`;
  const ep=window.__MYFLAVOURS_CONFIG__.backendEndpoint;
  if(ep) fetch(ep,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(f))}).catch(()=>{});
  setTimeout(()=>open(`https://wa.me/${WA()}?text=${msg}`,"_blank"),700);
});
/* ---------- PARTY ---------- */
document.getElementById("partyForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  if(!f.get("name")||!f.get("phone")||!f.get("etype")||!f.get("date")||!f.get("guests")||!f.get("location")){alert("Please complete name, phone, event type, date, guests and location.");return}
  document.getElementById("partyOk").hidden=false; track("event_enquiry_click");
  const msg=`Hello MyFlavours,%0AParty/Function enquiry:%0AName: ${encodeURIComponent(f.get("name"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0AEvent: ${encodeURIComponent(f.get("etype"))}%0ADate: ${encodeURIComponent(f.get("date"))}%0AGuests: ${encodeURIComponent(f.get("guests"))}%0ALocation: ${encodeURIComponent(f.get("location"))}%0ARequirements: ${encodeURIComponent(f.get("message")||"-")}`;
  setTimeout(()=>open(`https://wa.me/${WA()}?text=${msg}`,"_blank"),700);
});

/* ---------- LOCATIONS ---------- */
const locBtns=[...document.querySelectorAll(".loc")];
function setLoc(n){locBtns.forEach(b=>b.classList.toggle("active",b.dataset.loc===n));
  document.getElementById("locNote").innerHTML=`Ordering from <strong>${n}</strong>`;
  try{localStorage.setItem("mf_loc",n)}catch{} track("location_select",{loc:n});}
locBtns.forEach(b=>b.onclick=()=>setLoc(b.dataset.loc));
try{const s=localStorage.getItem("mf_loc"); if(s) setLoc(s)}catch{}

/* why cards: tap support */
document.querySelectorAll(".why-card").forEach(c=>c.addEventListener("click",()=>c.classList.toggle("open")));

/* ---------- NAV / SCROLL / REVEALS / PARALLAX ---------- */
const nav=document.getElementById("nav");
addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>30),{passive:true});
const burger=document.getElementById("burger"), mmenu=document.getElementById("mmenu");
burger.onclick=()=>{const o=mmenu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
mmenu.querySelectorAll("a").forEach(a=>a.onclick=()=>mmenu.classList.remove("open"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll("[data-reveal]").forEach(el=>io.observe(el));
/* journey: preloaded crossfade stack — always one image visible, both directions */
const jVisual=document.getElementById("jVisual"), jbar=document.getElementById("jbar");
const jSteps=[...document.querySelectorAll(".j-step")];
const FALLBACK_IMG="assets/hero-poster.jpg";
jSteps.forEach((s,i)=>{
  const im=document.createElement("img");
  im.src=s.dataset.img||FALLBACK_IMG; im.alt="";
  if(i>0) im.loading="lazy";
  im.addEventListener("error",()=>{if(!im.dataset.fb){im.dataset.fb="1";im.src=FALLBACK_IMG}},{once:false});
  if(i===0) im.classList.add("on");
  jVisual.appendChild(im);
});
const jImgs=[...jVisual.children];
let jCur=0;
function setJ(i){
  if(i<0||i>=jImgs.length) return;
  const next=jImgs[i];
  const swap=()=>{if(i===jCur&&jImgs[jCur].classList.contains("on"))return;
    jImgs[jCur].classList.remove("on");next.classList.add("on");
    jSteps[jCur].classList.remove("lit");jSteps[i].classList.add("lit");jCur=i;
    jbar.style.width=((i+1)/jSteps.length*100)+"%";};
  if(next.complete&&next.naturalWidth) swap();
  else { next.addEventListener("load",swap,{once:true});
    next.addEventListener("error",swap,{once:true}); }
}
jbar.style.width=(1/jSteps.length*100)+"%";
jSteps[0].classList.add("lit");
const jio=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) setJ(jSteps.indexOf(e.target));
}),{rootMargin:"-40% 0px -55% 0px"});
jSteps.forEach(s=>jio.observe(s));
/* active nav */
const secs=["home","story","menu","why","corporate","locations"];
const nio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
  document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===e.target.id));
}}),{rootMargin:"-40% 0px -55% 0px"});
secs.forEach(id=>{const el=document.getElementById(id); if(el) nio.observe(el)});
/* ---------- DYNAMIC SCROLL ENGINE: progress + parallax + tactile ---------- */
const heroImg=document.getElementById("heroImg");
const prog=document.getElementById("scrollProgress"), toTop=document.getElementById("toTop");
const speeds=[...document.querySelectorAll("[data-speed]")];
if(!reduced){
  let tick=false;
  const onScroll=()=>{
    if(tick) return; tick=true;
    requestAnimationFrame(()=>{
      const y=scrollY, h=document.documentElement.scrollHeight-innerHeight;
      if(prog) prog.style.width=(h>0?(y/h*100):0)+"%";
      nav.classList.toggle("scrolled",y>30);
      toTop.classList.toggle("show",y>700);
      speeds.forEach(el=>{const s=parseFloat(el.dataset.speed||"0.1");
        el.style.transform=`translateY(${y*s}px)`;});
      /* hero typography drifts away gently */
      const hc=document.querySelector(".hero-copy");
      if(hc&&y<innerHeight) hc.style.transform=`translateY(${y*-0.06}px)`;
      tick=false;
    });
  };
  addEventListener("scroll",onScroll,{passive:true}); onScroll();
  /* buttery anchors */
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href"); if(id.length<2) return;
    const t=document.querySelector(id); if(!t) return;
    e.preventDefault(); t.scrollIntoView({behavior:"smooth",block:"start"});
  }));
  /* tactile tilt */
  document.querySelectorAll("[data-tilt]").forEach(card=>{
    const max=parseFloat(card.dataset.tiltMax||"6");
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*max).toFixed(2)}deg) rotateY(${(x*max).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave",()=>{card.style.transform=""});
  });
  /* magnetic buttons */
  document.querySelectorAll(".btn-gold,.float-order").forEach(btn=>{
    btn.setAttribute("data-mag","");
    btn.addEventListener("pointermove",e=>{
      const r=btn.getBoundingClientRect();
      const x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
      btn.style.transform=`translate(${x*.12}px,${y*.18}px)`;
    });
    btn.addEventListener("pointerleave",()=>{btn.style.transform=""});
  });
}else{ addEventListener("scroll",()=>{toTop.classList.toggle("show",scrollY>700)},{passive:true}); }
toTop.onclick=()=>scrollTo({top:0,behavior:reduced?"auto":"smooth"});
/* drag-to-scroll rail (tactile on desktop) */
(()=>{let down=false,sx=0,sl=0;
  rail.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sl=rail.scrollLeft;rail.classList.add("dragging")});
  addEventListener("pointermove",e=>{if(!down)return;rail.scrollLeft=sl-(e.clientX-sx)});
  addEventListener("pointerup",()=>{down=false;rail.classList.remove("dragging")});
})();
/* image fallback: never show broken layout */
document.querySelectorAll("img").forEach(im=>{if(im.closest("#jVisual"))return;im.addEventListener("error",()=>{im.style.opacity="0";im.closest("figure,.im,.hc-frame")?.style.setProperty("background","linear-gradient(135deg,#14382a,#1d4a37)")},{once:true})});
