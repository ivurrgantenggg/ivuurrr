// ===== HELPERS =====
function showNotif(msg, success=true){
  const box = document.getElementById('notifBox');
  box.innerText = msg;
  box.style.background = success ? '#e0fff6' : '#ffeff5';
  box.style.color = success ? '#1b7d66' : '#d8336d';
  box.style.display = 'block';
  setTimeout(()=>{ box.style.display='none'; }, 2500);
}
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// ===== INIT =====
document.getElementById('todayLabel').innerText = new Date().toLocaleDateString();

const PROMPTS=[
  "Hari ini aku lagi mikirin...",
  "Hal kecil yang bikin aku senyum hari ini adalah...",
  "Ada sesuatu yang bikin aku sedih/kecewa: ...",
  "Satu hal yang membuatku bangga hari ini: ...",
  "Kalau aku harus cerita rahasiaku hari ini, itu tentang...",
  "Sebelum tidur, yang aku rasakan adalah..."
];
const QUOTES=[
  "Nulis itu cara hati bernapas. Mulai aja, gak harus sempurna.",
  "Kamu sudah berusaha. Itu penting—dan layak diakui.",
  "Pelan-pelan. Setiap kata sedikit membantu merapikan hari.",
  "Tidak apa-apa lelah. Nulis itu bentuk berani untuk jujur pada diri sendiri.",
  "Kamu penting. Cerita kamu berarti."
];

function renderPrompts(){ 
  const p=document.getElementById('prompts'); 
  p.innerHTML=''; 
  PROMPTS.forEach(t=>{
    const div=document.createElement('div'); 
    div.className='prompt'; 
    div.innerText=t; 
    div.onclick=()=>{ 
      const ta=document.getElementById('curhatText'); 
      ta.value = ta.value? ta.value+'\n\n'+t : t; 
      ta.focus(); 
    }; 
    p.appendChild(div); 
  }); 
}
function setRandomQuote(){ 
  document.getElementById('quoteBox').innerText = QUOTES[Math.floor(Math.random()*QUOTES.length)]; 
}

// ===== STORAGE =====
const NAME="Ivur";
const PASS_KEY=`curhat_pass_${NAME}`;
const ENTRIES_KEY=`curhat_entries_${NAME}`;
function readEntries(){ 
  const raw=localStorage.getItem(ENTRIES_KEY); 
  return raw?JSON.parse(raw):[]; 
}
function writeEntries(arr){ 
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(arr)); 
}

// ===== LOGIN =====
window.addEventListener('load', ()=>{
  renderPrompts();
  setRandomQuote();
  const hint = document.getElementById('loginHint');
  hint.innerText = localStorage.getItem(PASS_KEY)? 
    'Password sudah ada. Masukkan untuk membuka curhatmu.' : 
    'Belum ada password — buat password baru untuk menyimpan curhat.';
  renderMoodStats();
  renderBadges();
});

function login(){
  const val=document.getElementById('passwordInput').value.trim();
  if(!val){ showNotif('Masukkan password singkat', false); return; }
  const stored=localStorage.getItem(PASS_KEY);
  if(stored && stored!==val){ showNotif('Password salah!', false); return; }
  if(!stored){ localStorage.setItem(PASS_KEY,val); showNotif('Password tersimpan!'); }
  document.getElementById('loginBox').style.display='none';
  document.getElementById('curhatPanel').style.display='block';
  renderEntries();
}

// ===== CURHAT =====
function saveEntry(){
  const text=document.getElementById('curhatText').value.trim();
  if(!text){ showNotif('Isi curhat dulu', false); return; }
  const mood=document.getElementById('moodSelect').value;
  let date=document.getElementById('dateInput').value; 
  if(!date) date=new Date().toISOString().split('T')[0];
  const entry={text, mood, date};
  const arr=readEntries(); 
  arr.unshift(entry); 
  writeEntries(arr);
  document.getElementById('curhatText').value='';
  renderEntries(); 
  renderMoodStats(); 
  showNotif('Curhat tersimpan!');
}

function renderEntries(){
  const list=document.getElementById('entriesList'); 
  list.innerHTML='';
  const arr=readEntries();
  arr.forEach((e,i)=>{
    const div=document.createElement('div'); 
    div.className='entry';
    div.innerHTML=`
      <div class="meta"><div><strong>${capitalize(e.mood)}</strong> • <span class="small-muted">${e.date}</span></div>
        <div class="control-row">
          <button class="delete-btn" onclick="deleteEntry(${i})">🗑 Hapus</button>
        </div>
      </div>
      <div class="text">${escapeHtml(e.text)}</div>
    `;
    list.appendChild(div);
  });
}

function deleteEntry(idx){ 
  const arr=readEntries(); 
  arr.splice(idx,1); 
  writeEntries(arr); 
  renderEntries(); 
  renderMoodStats(); 
  renderBadges(); 
}

function addQuick(txt){ 
  const ta=document.getElementById('curhatText'); 
  ta.value = ta.value? ta.value+'\n'+txt : txt; 
  ta.focus(); 
}

// ===== MOOD STATS =====
function renderMoodStats(){
  const arr=readEntries();
  const stats={}; 
  arr.forEach(e=>stats[e.mood]=(stats[e.mood]||0)+1);
  const container=document.getElementById('moodStats'); 
  container.innerHTML='';
  Object.keys(stats).forEach(k=>{
    const span=document.createElement('span'); 
    span.className='pill'; 
    span.innerText=`${capitalize(k)}: ${stats[k]}`;
    container.appendChild(span);
  });
}

// ===== BADGES =====
function renderBadges(){
  const arr=readEntries(); 
  const container=document.getElementById('badges'); 
  container.innerHTML='';
  if(arr.length>=5) container.innerHTML+='<span class="badge">5 Cerits ✅</span>';
  if(arr.length>=10) container.innerHTML+='<span class="badge">10 cerita ✅</span>';
}

// ===== CLEAR ALL =====
function clearAllConfirm(){ 
  if(confirm('Hapus semua curita dan password?')){
    localStorage.removeItem(PASS_KEY); 
    localStorage.removeItem(ENTRIES_KEY); 
    location.reload(); 
  } 
}
