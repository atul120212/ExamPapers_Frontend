// Main entry point for ExamVault

// Initialization
(async () => {
  console.log("🚀 ExamVault Initializing...");
  try {
    // 1. Load config
    const success = await loadConfig();
    if (!success) {
      toast("❌ Could not load configuration. Please try again later.");
    }

    // 2. Check Auth
    if (typeof _sb.auth.getSession === 'function') {
      await checkUser();
    }
    
    // 3. Initial Render
    render();
    
    console.log("✅ Initialization complete.");
  } catch (err) {
    console.error("❌ Initialization failed:", err);
  }
})();

// ── NAVIGATION & STATE HELPERS ──

function setMode(m) {
  S.mode = m;
  S.step = 0;
  S.board = '';
  S.cls = '';
  S.stream = '';
  render();
}

function setBoard(b) {
  S.board = b;
  S.step = 1;
  render();
}

function setEntrance(e) {
  S.board = e;
  S.step = 4; // Skip to results
  finishSteps();
}

function setCls(c) {
  S.cls = c;
  if (S.mode === 'college') {
    // Check if course has branches
    const allCourses = [...(COURSES.ug || []), ...(COURSES.pg || []), ...(COURSES.diploma || [])];
    const course = allCourses.find(x => x.id === c);
    if (course && course.branches && course.branches.length > 1) {
      S.step = 2; // Go to Branch
    } else {
      S.stream = 'General'; // Skip branch
      S.step = 3; // Go to Semester
    }
  } else {
    S.step = 2; // School Class -> Stream
  }
  render();
}

function setBranch(b) {
  S.stream = b; // We reuse stream for Branch in college mode
  S.step = 3; // Go to Semester
  render();
}

function setSem(s) {
  S.branch = S.stream; // Save branch
  S.stream = s; // Use stream for semester ID in query
  finishSteps();
}

function nextStep() { S.step++; render(); }
function prevStep() { S.step--; render(); }

async function finishSteps() {
  S.step = 4;
  S.page = 1;
  toast("🔍 Fetching your papers...");
  await fetchPapers();
  render();
}

async function toggleFilter(key, val) {
  const idx = S.filters[key].indexOf(val);
  if (idx > -1) S.filters[key].splice(idx, 1);
  else S.filters[key].push(val);
  S.page = 1;
  await fetchPapers();
  render();
}

async function setSort(val) {
  S.sort = val;
  S.page = 1;
  await fetchPapers();
  render();
}

async function setPage(p) {
  S.page = p;
  await fetchPapers();
  render();
}

async function clearFilters() {
  S.filters = { years: [], types: [], subjects: [] };
  S.page = 1;
  await fetchPapers();
  render();
}

/**
 * Handles paper download
 */
async function downloadPaper(id) {
  const p = PAPERS.find(x => x.id == id);
  if (p) {
    try {
      const res = await fetch(`${API_BASE}/api/get-download-link/${id}?download=true`);
      const data = await res.json();
      if (data.url) {
        const u = data.url;
        const finalUrl = u.startsWith('http') ? u : `${API_BASE}${u}`;
        
        // Trigger download
        let dlFrame = document.getElementById('dlFrame');
        if (!dlFrame) {
          dlFrame = document.createElement('iframe');
          dlFrame.id = 'dlFrame';
          dlFrame.style.display = 'none';
          document.body.appendChild(dlFrame);
        }
        dlFrame.src = finalUrl;
        toast(`✅ "${p.subject}" download started!`);
      } else {
        toast("❌ Could not secure a download link.");
      }
    } catch (err) {
      toast("❌ Connection error while securing link.");
    }
  }
}

/**
 * Handles paper preview
 */
async function previewPaper(id) {
  const p = PAPERS.find(x => x.id == id);
  if (!p) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/get-download-link/${id}`);
    const data = await res.json();
    if (data.url) {
      const u = data.url;
      const finalUrl = u.startsWith('http') ? u : `${API_BASE}${u}`;
      
      const modal = document.getElementById('previewModal');
      const title = document.getElementById('previewTitle');
      const body = document.getElementById('previewBody');
      
      if (modal && title && body) {
        title.textContent = `${p.subject} - ${p.year} Preview`;
        body.innerHTML = `<iframe src="${finalUrl}#toolbar=0" width="100%" height="100%" style="border:none"></iframe>`;
        modal.classList.add('show');
      }
    } else {
      toast("❌ Could not load preview.");
    }
  } catch (err) {
    toast("❌ Connection error.");
  }
}

function closePreview() {
  const modal = document.getElementById('previewModal');
  const body = document.getElementById('previewBody');
  if (modal) modal.classList.remove('show');
  if (body) body.innerHTML = ''; // Stop iframe loading
}

// Global modal/ui helpers
function toast(msg, duration=3000) {
  const el = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (el && msgEl) {
    msgEl.textContent = msg;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), duration);
  }
}

function openPaper(id) {
    // Implement paper detail modal if needed, or just download
    downloadPaper(id);
}

// Expose functions to window for onclick handlers
window.setMode = setMode;
window.setBoard = setBoard;
window.setEntrance = setEntrance;
window.setCls = setCls;
window.setBranch = setBranch;
window.setSem = setSem;
window.setStream = setStream;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.finishSteps = finishSteps;
window.toggleFilter = toggleFilter;
window.clearFilters = clearFilters;
window.setSort = setSort;
window.setPage = setPage;
window.previewPaper = previewPaper;
window.closePreview = closePreview;
window.downloadPaper = downloadPaper;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleAuth = handleAuth;
window.toggleAuthMode = toggleAuthMode;
window.handleLogout = handleLogout;
window.updateRole = updateRole;
window.fetchAdminUsers = fetchAdminUsers;
window.render = render;
