"use strict";
const $=s=>document.querySelector(s);
const mem={};
const st={get(k){try{return localStorage.getItem(k)}catch(e){return mem[k]||null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){mem[k]=v}}};
const R=n=>new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR"}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let db=JSON.parse(st.get("vortex-db")||'{"users":{},"me":null}');
const save=()=>st.set("vortex-db",JSON.stringify(db));
const me=()=>db.me?db.users[db.me]:null;
async function hash(p){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("vx:"+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){return btoa(p)}}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2600)}
const day=n=>new Date(Date.now()-n*864e5).toISOString().slice(0,10);
function seed(name){return{name,accounts:{cheque:{label:"Everyday account",no:"1042 887 301",bal:12450.5},savings:{label:"Savings pot",no:"1042 887 318",bal:38200}},
tx:[{d:day(1),desc:"Woolworths Food",cat:"Groceries",amt:-684.2,acc:"cheque"},{d:day(2),desc:"Uber trip",cat:"Transport",amt:-142,acc:"cheque"},{d:day(3),desc:"Salary: Acme Pty Ltd",cat:"Income",amt:28500,acc:"cheque"},{d:day(4),desc:"Netflix",cat:"Entertainment",amt:-199,acc:"cheque"},{d:day(6),desc:"Eskom prepaid",cat:"Utilities",amt:-500,acc:"cheque"},{d:day(8),desc:"Checkers",cat:"Groceries",amt:-912.45,acc:"cheque"},{d:day(9),desc:"Vodacom data",cat:"Utilities",amt:-349,acc:"cheque"},{d:day(11),desc:"Engen fuel",cat:"Transport",amt:-860,acc:"cheque"},{d:day(13),desc:"Interest earned",cat:"Income",amt:121.3,acc:"savings"},{d:day(15),desc:"Nando’s",cat:"Dining",amt:-246,acc:"cheque"}],
card:{no:"4821 9034 7716 2209",frozen:false,show:false}}}
const pages={
home(){return`<section class="hero"><div><h1>Banking that pulls everything into one place.</h1><p>Open an account in two minutes. Move money, track spending and control your card from any screen.</p><p style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="#signup">Open an account</a><a class="btn ghost" href="#login">Log in</a></p></div>
<svg class="vortex" viewBox="0 0 400 400" fill="none" aria-hidden="true"><g stroke="#3de0c5" stroke-width="3" stroke-linecap="round"><circle cx="200" cy="200" r="180" stroke-dasharray="260 120 40 90" opacity=".9"/></g><g stroke="#7aa2ff" stroke-width="4" stroke-linecap="round"><circle cx="200" cy="200" r="135" stroke-dasharray="200 70 30 60" opacity=".85"/></g><g stroke="#3de0c5" stroke-width="5" stroke-linecap="round"><circle cx="200" cy="200" r="90" stroke-dasharray="130 50 20 40"/></g><g stroke="#fff" stroke-width="6" stroke-linecap="round"><circle cx="200" cy="200" r="48" stroke-dasharray="70 30 10 20"/></g><circle cx="200" cy="200" r="12" fill="#3de0c5"/></svg></section>
<section class="sec"><h2>Everything you need, nothing you don’t</h2><div class="grid g3">
<div class="card"><h3>Instant transfers</h3><p class="mute">Send money to your own accounts or to a saved payee. Balances update the moment you confirm.</p></div>
<div class="card"><h3>Spending insights</h3><p class="mute">See where your money goes each month, grouped by category, so you can spot what to cut.</p></div>
<div class="card"><h3>Card control</h3><p class="mute">Freeze your card in one tap and unfreeze it when you’re ready. No call centre needed.</p></div></div></section>
<section class="sec card" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><div><h3 style="margin:0">Ready to try it?</h3><span class="mute">Sign up and explore with sample data. Nothing leaves your browser.</span></div><a class="btn" href="#signup">Open an account</a></section>`},
login(){return`<div class="card auth"><h1 style="font-size:28px">Log in</h1><form id="f" novalidate><label for="e">Email</label><input id="e" type="email" autocomplete="email" required><label for="p">Password</label><input id="p" type="password" autocomplete="current-password" required><div class="err" id="er"></div><button class="btn" style="width:100%;margin-top:8px">Log in</button></form><p class="mute">New to Vortex? <a href="#signup">Open an account</a></p></div>`},
signup(){return`<div class="card auth"><h1 style="font-size:28px">Open an account</h1><form id="f" novalidate><label for="n">Full name</label><input id="n" autocomplete="name" required><label for="e">Email</label><input id="e" type="email" autocomplete="email" required><label for="p">Password</label><input id="p" type="password" autocomplete="new-password" required><small class="mute">At least 8 characters, with a letter and a number.</small><div class="err" id="er"></div><button class="btn" style="width:100%;margin-top:8px">Create account</button></form><p class="mute">Already banking with us? <a href="#login">Log in</a></p></div>`},
dashboard(){const u=me(),a=u.accounts,tot=a.cheque.bal+a.savings.bal;
return`<h1 style="font-size:30px">Hi, ${esc(u.name.split(" ")[0])}</h1>
<div class="grid g3"><div class="card"><span class="mute">Total balance</span><div class="stat">${R(tot)}</div></div>
${Object.values(a).map(x=>`<div class="card"><span class="mute">${x.label} · ${x.no}</span><div class="stat">${R(x.bal)}</div></div>`).join("")}</div>
<section class="sec card"><div class="row" style="padding-top:0"><h2 style="margin:0;font-size:22px">Transactions</h2><a class="btn sm ghost" href="#transfer">Send money</a></div>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0"><input id="q" placeholder="Search transactions" aria-label="Search transactions" style="flex:2;min-width:180px"><select id="c" aria-label="Filter by category" style="flex:1;min-width:140px"><option value="">All categories</option>${[...new Set(u.tx.map(t=>t.cat))].map(c=>`<option>${c}</option>`).join("")}</select></div>
<div id="tl"></div></section>`},
transfer(){const a=me().accounts;
return`<div class="card auth" style="max-width:520px"><h1 style="font-size:28px">Send money</h1><form id="f" novalidate>
<label for="from">From</label><select id="from">${Object.entries(a).map(([k,x])=>`<option value="${k}">${x.label} (${R(x.bal)})</option>`).join("")}</select>
<label for="to">To</label><select id="to"><option value="own">My other account</option><option value="payee">Someone else</option></select>
<div id="py" hidden><label for="pn">Payee name</label><input id="pn"><label for="pa">Account number</label><input id="pa" inputmode="numeric"></div>
<label for="am">Amount (ZAR)</label><input id="am" type="number" min="0" step="0.01" inputmode="decimal">
<label for="rf">Reference</label><input id="rf" maxlength="30">
<div class="err" id="er"></div><button class="btn" style="width:100%;margin-top:8px">Send money</button></form></div>`},
cards(){const c=me().card;
return`<h1 style="font-size:30px">Your card</h1><div class="grid g2" style="align-items:start"><div class="bank-card ${c.frozen?"frozen":""}"><div style="display:flex;justify-content:space-between"><b style="font-family:var(--hf)">Vortex</b><span>${c.frozen?"Frozen":"Active"}</span></div><div class="num">${c.show?c.no:"•••• •••• •••• "+c.no.slice(-4)}</div><div style="display:flex;justify-content:space-between"><span>${esc(me().name)}</span><span>09/29</span></div></div>
<div class="card"><h3>Card controls</h3><div class="row"><span>Freeze card</span><button class="btn sm" id="fz" aria-pressed="${c.frozen}">${c.frozen?"Unfreeze":"Freeze"}</button></div><div class="row"><span>Card number</span><button class="btn sm ghost" id="sh">${c.show?"Hide":"Show"}</button></div><p class="mute">While frozen, purchases and withdrawals are declined.</p></div></div>`},
insights(){const u=me(),sp={};u.tx.filter(t=>t.amt<0).forEach(t=>sp[t.cat]=(sp[t.cat]||0)+-t.amt);
const e=Object.entries(sp).sort((a,b)=>b[1]-a[1]),mx=e[0]?e[0][1]:1,out=e.reduce((s,x)=>s+x[1],0),inc=u.tx.filter(t=>t.amt>0).reduce((s,t)=>s+t.amt,0);
return`<h1 style="font-size:30px">Spending insights</h1><div class="grid g3"><div class="card"><span class="mute">Money in</span><div class="stat pos">${R(inc)}</div></div><div class="card"><span class="mute">Money out</span><div class="stat neg">${R(out)}</div></div><div class="card"><span class="mute">Saved</span><div class="stat">${inc?Math.round((inc-out)/inc*100):0}%</div></div></div>
<section class="sec card"><h2 style="font-size:22px">Where your money went</h2>${e.length?e.map(([k,v])=>`<div class="row"><span style="width:120px">${k}</span><div class="bk"><i style="width:${v/mx*100}%"></i></div><b>${R(v)}</b></div>`).join(""):'<p class="mute">No spending yet. Send money to see it here.</p>'}</section>`}
};
const prot=["dashboard","transfer","cards","insights"];
function navHtml(r){const l=me()?[["dashboard","Overview"],["transfer","Send money"],["cards","Card"],["insights","Insights"]]:[["home","Home"],["login","Log in"],["signup","Open an account"]];
return l.map(([k,t])=>`<a href="#${k}" ${k===r?'aria-current="page"':""}>${t}</a>`).join("")+(me()?'<button class="btn ghost sm" id="out">Log out</button>':"")}
function drawTx(){const u=me(),q=($("#q").value||"").toLowerCase(),c=$("#c").value;
const l=u.tx.filter(t=>(!c||t.cat===c)&&(!q||t.desc.toLowerCase().includes(q)));
$("#tl").innerHTML=l.length?l.map(t=>`<div class="row"><div><b>${esc(t.desc)}</b><br><span class="mute">${t.d} · <span class="pill">${t.cat}</span></span></div><b class="${t.amt<0?"neg":"pos"}">${t.amt<0?"−":"+"}${R(Math.abs(t.amt))}</b></div>`).join(""):'<p class="mute">No transactions match. Clear the search or pick another category.</p>'}
async function route(){let r=(location.hash||"#home").slice(1);if(!pages[r])r="home";
if(prot.includes(r)&&!me()){location.hash="login";return}
if((r==="login"||r==="signup")&&me()){location.hash="dashboard";return}
$("#app").innerHTML=pages[r]();$("#nav").innerHTML=navHtml(r);document.title="Vortex Bank";window.scrollTo(0,0);$("#app").focus&&0;
const o=$("#out");if(o)o.onclick=()=>{db.me=null;save();toast("You’re logged out");location.hash="home";route()};
const f=$("#f"),er=$("#er");
if(r==="signup")f.onsubmit=async ev=>{ev.preventDefault();const n=$("#n").value.trim(),e=$("#e").value.trim().toLowerCase(),p=$("#p").value;
if(n.length<2)return er.textContent="Enter your full name.";if(!/^\S+@\S+\.\S+$/.test(e))return er.textContent="Enter a valid email address.";
if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(p))return er.textContent="Password needs 8+ characters with a letter and a number.";
if(db.users[e])return er.textContent="That email already has an account. Log in instead.";
const s=seed(n);s.hash=await hash(p);db.users[e]=s;db.me=e;save();toast("Welcome to Vortex, "+n.split(" ")[0]);location.hash="dashboard";route()};
if(r==="login")f.onsubmit=async ev=>{ev.preventDefault();const e=$("#e").value.trim().toLowerCase(),u=db.users[e];
if(!u||u.hash!==await hash($("#p").value))return er.textContent="Email or password is incorrect. Check both and try again.";
db.me=e;save();location.hash="dashboard";route()};
if(r==="dashboard"){drawTx();$("#q").oninput=drawTx;$("#c").onchange=drawTx}
if(r==="transfer"){const to=$("#to");to.onchange=()=>$("#py").hidden=to.value==="own";
f.onsubmit=ev=>{ev.preventDefault();const u=me(),from=$("#from").value,amt=parseFloat($("#am").value),own=to.value==="own",other=from==="cheque"?"savings":"cheque";
if(!(amt>0))return er.textContent="Enter an amount greater than zero.";
if(amt>u.accounts[from].bal)return er.textContent="That’s more than the available balance of "+R(u.accounts[from].bal)+".";
if(!own&&(!$("#pn").value.trim()||!/^\d{6,12}$/.test($("#pa").value.replace(/\s/g,""))))return er.textContent="Enter the payee’s name and a 6 to 12 digit account number.";
const name=own?"Transfer to "+u.accounts[other].label:"Payment to "+$("#pn").value.trim()+($("#rf").value?" ("+$("#rf").value.trim()+")":"");
u.accounts[from].bal-=amt;u.tx.unshift({d:day(0),desc:name,cat:own?"Transfers":"Payments",amt:-amt,acc:from});
if(own){u.accounts[other].bal+=amt;u.tx.unshift({d:day(0),desc:"Transfer from "+u.accounts[from].label,cat:"Income",amt:amt,acc:other})}
save();toast(R(amt)+" sent");location.hash="dashboard";route()}}
if(r==="cards"){const c=me().card;$("#fz").onclick=()=>{c.frozen=!c.frozen;save();toast(c.frozen?"Card frozen":"Card unfrozen");route()};$("#sh").onclick=()=>{c.show=!c.show;save();route()}}
}
window.addEventListener("hashchange",route);
$("#theme").onclick=()=>{const d=document.documentElement,dark=d.dataset.theme?d.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;d.dataset.theme=dark?"light":"dark"};
route();
