// API and Configuration logic for ExamVault
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? window.location.origin 
  : 'https://exampaper-backend.onrender.com'; // Replace with your actual Render URL

// Global state and configuration variables
let _sb = { 
    auth: { 
        getSession: async () => ({data:{session:null}}), 
        getUser: async () => ({data:{user:null}}), 
        onAuthStateChange: () => ({data:{subscription:{unsubscribe:()=>{}}}}) 
    }, 
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({data:null}) }) }) }) 
};

let BOARDS = [];
let CLASSES = { school: [] };
let STREAMS = [];
let UNIVERSITIES = [];
let COURSES = { college: [] };
let SEMESTERS = [];
let ENTRANCE_EXAMS = [];

// App State
const S = {
  mode: 'school', // 'school' or 'college'
  step: 0,        // 0:Hero, 1:Board/Uni, 2:Class/Course, 3:Stream/Sem, 4:Results
  board: '',      // Board or University ID
  cls: '',        // Class or Course ID
  stream: '',     // Stream or Semester ID
  search: '',
  loading: false,
  page: 1,
  perPage: 12,
  view: 'grid',   // 'grid' or 'list'
  sort: 'year_desc',
  filters: {
    years: [],
    types: [],
    subjects: []
  }
};

let PAPERS = [];
let TOTAL_PAPERS = 0;
let FACETS = { years: [], types: [], subjects: [] };
let USER = null;
let USER_ROLE = 'user';
let ADMIN_USERS = [];

/**
 * Loads configuration from the backend or server-injected global
 */
async function loadConfig() {
  // Check if configuration was injected by the server (Jinja2)
  if (window.SERVER_CONFIG) {
    const config = window.SERVER_CONFIG;
    BOARDS = config.BOARDS || [];
    CLASSES = config.CLASSES || { school: [] };
    STREAMS = config.STREAMS || [];
    UNIVERSITIES = config.UNIVERSITIES || [];
    COURSES = config.COURSES || { college: [] };
    SEMESTERS = config.SEMESTERS || [];
    ENTRANCE_EXAMS = config.ENTRANCE_EXAMS || [];
    
    if (config.SUPABASE_URL && config.SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
      _sb = supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
      console.log("✅ Supabase initialized from Server Config");
    }
    console.log("✅ Configuration loaded from Server SSR");
    return true;
  }

  // Fallback to API if not injected
  try {
    const res = await fetch(`${API_BASE}/api/config`);
    if (res.ok) {
      const config = await res.json();
      BOARDS = config.BOARDS || [];
      CLASSES = config.CLASSES || { school: [] };
      STREAMS = config.STREAMS || [];
      UNIVERSITIES = config.UNIVERSITIES || [];
      COURSES = config.COURSES || { college: [] };
      SEMESTERS = config.SEMESTERS || [];
      ENTRANCE_EXAMS = config.ENTRANCE_EXAMS || [];
      
      if (config.SUPABASE_URL && config.SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
        _sb = supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
      }
      return true;
    }
  } catch (e) {
    console.error("❌ Failed to load config from server:", e);
  }
  return false;
}

/**
 * Fetches papers based on current state and filters
 */
async function fetchPapers() {
  S.loading = true;
  if (typeof render === 'function') render();
  
  const params = new URLSearchParams({
    mode: S.mode,
    sort: S.sort,
    page: S.page,
    perPage: S.perPage
  });
  
  if (S.board) params.append(S.mode === 'school' ? 'board' : 'board', S.board);
  if (S.cls) params.append('cls', S.cls);
  if (S.stream) params.append(S.mode === 'school' ? 'stream' : 'branch', S.stream);
  if (S.search) params.append('search', S.search);
  
  if (S.filters.years.length) params.append('years', S.filters.years.join(','));
  if (S.filters.types.length) params.append('types', S.filters.types.join(','));
  if (S.filters.subjects.length) params.append('subjects', S.filters.subjects.join(','));

  try {
    const [pRes, fRes] = await Promise.all([
      fetch(`${API_BASE}/api/papers?${params.toString()}`),
      fetch(`${API_BASE}/api/facets?${params.toString()}`)
    ]);
    
    const pData = await pRes.json();
    PAPERS = pData.items;
    TOTAL_PAPERS = pData.total;
    FACETS = await fRes.json();
  } catch (e) {
    console.error("❌ Failed to fetch papers:", e);
  } finally {
    S.loading = false;
    if (typeof render === 'function') render();
  }
}

/**
 * Fetches user list for admin dashboard
 */
async function fetchAdminUsers() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/users`);
    ADMIN_USERS = await res.json();
    if (typeof render === 'function') render();
  } catch (e) { 
      if (typeof toast === 'function') toast("❌ Failed to fetch users"); 
  }
}

/**
 * Updates a user's role
 */
async function updateRole(userId, newRole) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/update-role`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user_id: userId, new_role: newRole })
    });
    if (res.ok) {
      if (typeof toast === 'function') toast("✅ Role updated successfully!");
      fetchAdminUsers();
    }
  } catch (e) { 
      if (typeof toast === 'function') toast("❌ Failed to update role"); 
  }
}
