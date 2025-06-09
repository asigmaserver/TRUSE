// --- Cosmic background animation ---
const canvas = document.getElementById('cosmic-bg');
const ctx = canvas.getContext('2d');
let w = 0, h = 0;
let points = [];
function resize() {
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
}
function randRange(min,max) { return Math.random() * (max-min) + min; }
function initPoints() {
  points = [];
  let count = Math.floor(w*h/3500);
  for(let i=0;i<count;i++) {
    points.push({
      x: Math.random()*w, y: Math.random()*h,
      vx: randRange(-0.2,0.2), vy: randRange(-0.2,0.2),
      r: randRange(0.8,2.4)
    });
  }
}
function drawBg() {
  ctx.clearRect(0,0,w,h);
  // draw lines
  for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++) {
    let p=points[i],q=points[j];
    let dx=p.x-q.x,dy=p.y-q.y,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<120) {
      ctx.strokeStyle = 'rgba(67,163,255,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
    }
  }
  // draw points
  for(const p of points){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
    ctx.fillStyle='#38f8ff';
    ctx.globalAlpha=0.6+0.3*Math.random();
    ctx.fill();
    ctx.globalAlpha=1.0;
  }
}
function tick() {
  for(const p of points){
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
  }
  drawBg(); requestAnimationFrame(tick);
}
window.addEventListener('resize',()=>{resize();initPoints();});
resize(); initPoints(); tick();

// --- Login and Dashboard logic ---
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const dashboardPage = document.getElementById('dashboardPage');
const settingsPage = document.getElementById('settingsPage');
const navItems = document.querySelectorAll('.nav-item');
const domainBtns = document.querySelectorAll('.domain-btn');
const domainContent = document.getElementById('domainContent');

// Simulate login redirect (after OAuth, user lands with ?loggedin=1)
if (location.search.includes('loggedin=1')) showDashboard();
window.showDashboard = showDashboard;
function showDashboard() {
  loginScreen.style.display = "none";
  dashboardScreen.style.display = "flex";
  renderDomain("www.ro.blox.com.sc");
  document.querySelector('.domain-btn[data-domain="www.ro.blox.com.sc"]').classList.add('active');
}
window.onload = () => {
  // Simulate auto-login if ?loggedin=1 in url
  if(window.location.search.includes('loggedin=1')) showDashboard();
}

// Sidebar nav
navItems.forEach(item => {
  item.onclick = () => {
    navItems.forEach(it=>it.classList.remove('active'));
    item.classList.add('active');
    if(item.dataset.page==="dashboard"){
      dashboardPage.style.display = "";
      settingsPage.style.display = "none";
    } else {
      dashboardPage.style.display = "none";
      settingsPage.style.display = "";
    }
  }
});

// Switch domain section
domainBtns.forEach(btn=>{
  btn.onclick = function(){
    domainBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderDomain(btn.dataset.domain);
  }
})

// --- Tabs and content for domain section ---
function renderDomain(domain){
  domainContent.innerHTML = `
    <div class="tabs-bar">
      <button class="tab-btn active" data-tab="profile">Profile</button>
      <button class="tab-btn" data-tab="communities">Communities</button>
      <button class="tab-btn" data-tab="games">Games</button>
      <button class="tab-btn" data-tab="settings">Settings</button>
    </div>
    <div id="tabContent"></div>
  `;
  const tabs = domainContent.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('tabContent');
  function showTab(tab){
    tabs.forEach(t=>t.classList.remove('active'));
    tabs.forEach(t=>{if(t.dataset.tab===tab)t.classList.add('active')});
    if(tab==='profile'){
      tabContent.innerHTML = `
        <div class="cosmic-panel">
          <h3 class="cosmic-gradient cosmic-glow" style="margin-bottom:22px;">Profile</h3>
          <div class="profile-grid">
            <div><span class="profile-label">Defaultio</span></div>
            <div></div>
            <div><span class="profile-label">Username</span> <span class="profile-value">vurqts</span></div>
            <div><span class="profile-label">Display Name</span> <span class="profile-value">Defaultio</span></div>
            <div><span class="profile-label">Premium</span> <span class="profile-value">Yes</span></div>
            <div><span class="profile-label">Friends</span> <span class="profile-value">18</span></div>
            <div><span class="profile-label">Followers</span> <span class="profile-value">1,845</span></div>
            <div><span class="profile-label">Followings</span> <span class="profile-value">6</span></div>
            <div><span class="profile-label">Status</span> <span class="profile-value">Online</span></div>
            <div><span class="profile-label">Creation Date</span> <span class="profile-value">2016-05-22</span></div>
            <div><span class="profile-label">Description</span> <span class="profile-value">Designer ★ owner of artificial. 100K sales.</span></div>
            <div></div>
            <div><span class="profile-label">REAL USERNAME</span> <span class="profile-value">vurqts</span></div>
            <div><span class="profile-label">FAKE USERNAME</span> <span class="profile-value">vurqts</span></div>
          </div>
        </div>
      `;
    } else if(tab==='communities'){
      tabContent.innerHTML = `
        <div class="cosmic-panel">
          <h3 class="cosmic-gradient cosmic-glow" style="margin-bottom:22px;">Communities</h3>
          <div style="margin-bottom:12px;"><span class="profile-label">unset</span> <span class="profile-value">By Defaultio</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">Members</span> <span class="profile-value">1</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">REAL GROUP URL</span> <a class="fake-link" href="https://www.roblox.com/communities/13193562/Group-Name" target="_blank">https://www.roblox.com/communities/13193562/Group-Name</a></div>
          <div style="margin-bottom:12px;"><span class="profile-label">GROUP OWNER</span> <span class="profile-value">Defaultio</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">GROUP NAME</span> <span class="profile-value">unset</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">FUNDS</span> <span class="profile-value">10344</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">VERIFIED BADGE</span> <span class="profile-value">No</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">DESCRIPTION</span> <span class="profile-value">unset</span></div>
          <div style="margin-bottom:12px;"><span class="profile-label">SHOUT</span> <span class="profile-value">unset</span></div>
        </div>
      `;
    } else if(tab==='games'){
      tabContent.innerHTML = `
        <div class="cosmic-panel">
          <h3 class="cosmic-gradient cosmic-glow" style="margin-bottom:22px;">Games</h3>
          <div class="search-bar">
            <input id="gameSearch" type="text" placeholder="Search Roblox games...">
          </div>
          <div class="game-list" id="gameList"></div>
        </div>
      `;
      // Sample fake games
      let games = [
        {name:"Jailbreak", id:"12345"},
        {name:"Adopt Me!", id:"34892"},
        {name:"Tower of Hell", id:"44123"},
        {name:"Blox Fruits", id:"87932"}
      ];
      function renderGames(filter=""){
        let show = games.filter(g=>g.name.toLowerCase().includes(filter.toLowerCase()));
        const list = document.getElementById('gameList');
        list.innerHTML = show.map(g=>`
          <div class="game-item">
            <span>${g.name}</span>
            <a class="fake-link" href="https://${domain}/games/${g.id}" target="_blank">https://${domain}/games/${g.id}</a>
          </div>
        `).join('');
      }
      renderGames();
      document.getElementById('gameSearch').oninput = e => renderGames(e.target.value);
    } else if(tab==='settings'){
      tabContent.innerHTML = `
        <div class="cosmic-panel">
          <h3 class="cosmic-gradient cosmic-glow" style="margin-bottom:22px;">Settings</h3>
          <p>Settings are coming soon for cosmic users!</p>
        </div>
      `;
    }
  }
  // Tab click
  domainContent.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.onclick = ()=>showTab(btn.dataset.tab);
  });
  showTab('profile');
}

// User menu and logout
window.toggleUserMenu = function(){
  let m = document.getElementById('userMenu');
  m.style.display = (m.style.display=="none"||!m.style.display) ? "block":"none";
}
window.logout = function(){
  window.location.href = window.location.pathname;
}
document.body.onclick = function(e){
  if (!e.target.closest('.sidebar-user') && !e.target.closest('#userMenu')) {
    document.getElementById('userMenu').style.display = "none";
  }
}