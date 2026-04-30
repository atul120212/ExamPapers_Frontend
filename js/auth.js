// Authentication logic for ExamVault

/**
 * Checks current user session and role
 */
async function checkUser() {
  const { data: { session } } = await _sb.auth.getSession();
  USER = session ? session.user : null;
  
  if (USER) {
    // Fetch profile for role
    const { data: profile } = await _sb.from('profiles').select('role').eq('id', USER.id).single();
    USER_ROLE = profile ? profile.role : 'user';
  } else {
    USER_ROLE = 'user';
  }
  
  updateAuthUI();
}

/**
 * Updates UI elements based on authentication state
 */
function updateAuthUI() {
  const container = document.getElementById('authContainer');
  const uploadBtn = document.getElementById('uploadBtn');
  
  if (USER) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px">
        ${USER_ROLE === 'admin' ? `<button class="nav-pill" onclick="S.step='admin';fetchAdminUsers();render()" style="color:var(--gold);font-weight:700">Admin Dashboard</button>` : ''}
        <div style="text-align:right">
          <div style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:700;text-transform:uppercase">${USER_ROLE}</div>
          <div style="font-size:12px;color:#fff;font-weight:600">${USER.email.split('@')[0]}</div>
        </div>
        <button class="modal-close" onclick="handleLogout()" style="width:28px;height:28px;font-size:10px" title="Logout">✕</button>
      </div>
    `;
    if (USER) {
      uploadBtn.style.display = 'block';
    } else {
      uploadBtn.style.display = 'none';
    }
  } else {
    container.innerHTML = `<button class="nav-pill" id="loginBtn" onclick="openLoginModal()" style="color:var(--gold);border:1px solid rgba(240,180,41,0.3)">Login</button>`;
    uploadBtn.style.display = 'none';
  }
}

/**
 * Toggles between Login and Signup modes in the modal
 */
function toggleAuthMode() {
  const mode = document.getElementById('authMode');
  const title = document.getElementById('authModalTitle');
  const submitBtn = document.getElementById('authSubmitBtn');
  const toggleText = document.getElementById('authToggleText');
  const toggleLink = document.getElementById('authToggleLink');

  if (!mode) return;

  if (mode.value === 'login') {
    mode.value = 'signup';
    title.textContent = 'Create Contributor Account';
    submitBtn.textContent = 'Create Account';
    toggleText.textContent = 'Already have an account?';
    toggleLink.textContent = 'Login';
  } else {
    mode.value = 'login';
    title.textContent = 'Admin / Contributor Login';
    submitBtn.textContent = 'Sign In';
    toggleText.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign Up';
  }
}

/**
 * Handles Login/Signup form submission
 */
async function handleAuth(e) {
  e.preventDefault();
  const mode = document.getElementById('authMode').value;
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  
  if (mode === 'signup') {
    toast("🌱 Creating your account...");
    const { data, error } = await _sb.auth.signUp({ email, password });
    if (error) {
      toast("❌ Signup failed: " + error.message);
    } else {
      toast("✅ Account created! You can now login.");
      toggleAuthMode();
    }
  } else {
    toast("🔐 Authenticating...");
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) {
      toast("❌ Login failed: " + error.message);
    } else {
      toast("✅ Welcome back!");
      closeLoginModal();
      checkUser();
    }
  }
}

/**
 * Handles user logout
 */
async function handleLogout() {
  await _sb.auth.signOut();
  USER = null;
  USER_ROLE = 'user';
  updateAuthUI();
  if (S.step === 'admin') {
    S.step = 0;
    render();
  }
  toast("👋 Logged out successfully");
}

// Modal controls
function openLoginModal() { 
    const modal = document.getElementById('loginModalOverlay');
    if (modal) modal.classList.add('open'); 
}
function closeLoginModal() { 
    const modal = document.getElementById('loginModalOverlay');
    if (modal) modal.classList.remove('open'); 
}
