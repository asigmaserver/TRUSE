// Sample data for initial vouches
const initVouches = [
  {
    username: "@Hexio[BOS]",
    date: "5/10",
    vouch: "vouch @The Professional Sigma MM'ed PP for JB"
  },
  {
    username: "@Kubkulubq_",
    date: "5/12",
    vouch: "vouch @The Professional Sigma MM'ed JB for PP"
  },
  {
    username: "@Kz",
    date: "5/10",
    vouch: "vouch @The Professional Sigma legit"
  },
  {
    username: "@patti",
    date: "5/1",
    vouch: "vouch @The Professional Sigma MM'ed PP for Carb and Airtail"
  }
];

let vouches = [...initVouches];

// Helper to get initials from username
function getInitial(name) {
  if (!name) return "?";
  let match = name.match(/@([a-zA-Z0-9])/);
  return match ? match[1].toUpperCase() : name[1]?.toUpperCase() || "?";
}

// Render all vouches
function renderVouches() {
  const list = document.getElementById('vouch-list');
  list.innerHTML = '';
  for (let i = 0; i < vouches.length; ++i) {
    const v = vouches[vouches.length - 1 - i]; // newest first
    const vouchCard = document.createElement('div');
    vouchCard.className = 'vouch-card';
    vouchCard.innerHTML = `
      <div class="avatar">${getInitial(v.username)}</div>
      <div class="vouch-content">
        <span class="vouch-username">${v.username}</span>
        <span class="vouch-date">${v.date}</span>
        <div class="vouch-text">${v.vouch}</div>
      </div>
      <span class="vouch-number">#${vouches.length - i}</span>
    `;
    list.appendChild(vouchCard);
  }
  document.getElementById('totalVouches').textContent = `${vouches.length} Total Vouches`;
}

renderVouches();

// Handle form submission
document.getElementById('vouch-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const vouch = document.getElementById('vouch').value.trim();
  if (!username || !vouch) return;

  // Add new vouch (today's date for demo)
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
  vouches.push({
    username: username,
    date: dateStr,
    vouch: vouch
  });
  renderVouches();
  this.reset();
});