// UI Rendering logic for ExamVault

/**
 * Main render function
 */
function render() {
  const content = document.getElementById('renderArea');
  if (!content) return;

  if (S.step === 'admin') {
    content.innerHTML = renderAdminUsers();
    return;
  }

  if (S.step === 4) {
    content.innerHTML = renderPapersPage();
  } else {
    content.innerHTML = renderHero();
  }
}

function renderHero() {
  // Logic from index.html renderHero()
  return `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-badge"><span></span> Live Vault: Class 9-12 & University</div>
        <h1>Your Ultimate Archive of <em>Exam Papers.</em></h1>
        <p class="hero-sub">Access over 10,000+ previous year question papers, sample papers, and notes for all major Indian boards and universities. Completely free, organized, and high-quality.</p>
        
        <div class="mode-row">
          <div class="mode-card ${S.mode === 'school' ? 'active' : ''}" onclick="setMode('school')">
            <span class="mode-icon">🏫</span>
            <div class="mode-title">School Boards</div>
            <div class="mode-desc">CBSE, ICSE, UP, and all State Boards (Class 9-12)</div>
          </div>
          <div class="mode-card ${S.mode === 'college' ? 'active' : ''}" onclick="setMode('college')">
            <span class="mode-icon">🎓</span>
            <div class="mode-title">Universities</div>
            <div class="mode-desc">AKTU, DU, MU, B.Tech, BCA, MBA, and more</div>
          </div>
          <div class="mode-card ${S.mode === 'entrance' ? 'active' : ''}" onclick="setMode('entrance')">
            <span class="mode-icon">🏆</span>
            <div class="mode-title">Entrance Exams</div>
            <div class="mode-desc">JEE Main, NEET, GATE, CAT, UPSC, and more</div>
          </div>
        </div>

        <div class="stats-row">
          <div><span class="stat-n">10k+</span><span class="stat-l">Papers</span></div>
          <div><span class="stat-n">15+</span><span class="stat-l">Boards</span></div>
          <div><span class="stat-n">50k+</span><span class="stat-l">Downloads</span></div>
        </div>
      </div>
    </div>
    
    <div class="main">
      <div class="content">
        <div class="step-wizard">
          ${renderStepWizard()}
        </div>
      </div>
    </div>
  `;
}

function renderStepWizard() {
    // Determine current options based on mode and step
    let title = "";
    let options = "";
    
    if (S.step === 0) {
      if (S.mode === 'entrance') {
        title = "Select Entrance Exam";
        options = ENTRANCE_EXAMS.map(e => `
          <div class="opt-card ${S.board === e.id ? 'selected' : ''}" onclick="setEntrance('${e.id}')">
            <div class="opt-card-icon">${e.icon || '🏆'}</div>
            <div>
              <div class="opt-card-name">${e.name}</div>
              <div class="opt-card-sub">${e.full || ''}</div>
            </div>
          </div>
        `).join('');
      } else {
        title = S.mode === 'school' ? "Select Your Board" : "Select Your University";
        const items = S.mode === 'school' ? BOARDS : UNIVERSITIES;
        options = items.map(b => `
          <div class="opt-card ${S.board === b.id ? 'selected' : ''}" onclick="setBoard('${b.id}')">
            <div class="opt-card-icon">${b.icon || '🏛️'}</div>
            <div>
              <div class="opt-card-name">${b.name}</div>
              <div class="opt-card-sub">${b.sub || ''}</div>
            </div>
          </div>
        `).join('');
      }
    } else if (S.step === 1) {
      title = S.mode === 'school' ? "Select Class" : "Select Course";
      let items = [];
      if (S.mode === 'school') {
        items = CLASSES.school || [];
      } else {
        // For college, we might want to show UG/PG/Diploma first or just all courses
        items = [...(COURSES.ug || []), ...(COURSES.pg || []), ...(COURSES.diploma || [])];
      }
      options = items.map(c => `
        <button class="opt-btn ${S.cls === c.id ? 'selected' : ''}" onclick="setCls('${c.id}')">
          ${c.label || c.name || c.id}
          ${c.sub ? `<span class="opt-sub">${c.sub}</span>` : ''}
        </button>
      `).join('');
    } else if (S.step === 2) {
      if (S.mode === 'college') {
        title = "Select Branch";
        const allCourses = [...(COURSES.ug || []), ...(COURSES.pg || []), ...(COURSES.diploma || [])];
        const course = allCourses.find(x => x.id === S.cls);
        const branches = course ? course.branches : ["General"];
        let items = branches.map(b => ({ id: b, name: b }));
        options = items.map(s => `
          <button class="opt-btn ${S.branch === s.id ? 'selected' : ''}" onclick="setBranch('${s.id}')">
            ${s.name}
          </button>
        `).join('');
      } else {
        title = "Select Stream";
        const streams = STREAMS[S.cls] || [];
        items = streams.map(s => ({ id: s, name: s }));
        options = items.map(s => `
          <button class="opt-btn ${S.stream === s.id ? 'selected' : ''}" onclick="setStream('${s.id}')">
            ${s.name}
          </button>
        `).join('');
      }
    } else if (S.step === 3 && S.mode === 'college') {
      title = "Select Semester";
      items = SEMESTERS.map(s => ({ id: s, name: s }));
      options = items.map(s => `
        <button class="opt-btn ${S.stream === s.id ? 'selected' : ''}" onclick="setSem('${s.id}')">
          ${s.name}
        </button>
      `).join('');
    }

    const totalSteps = S.mode === 'college' ? 4 : 3;
    let dots = '';
    for (let i = 0; i < totalSteps; i++) {
        if (S.mode === 'entrance' && i > 0) break;
        dots += `
          <div class="step-dot-wrap">
            <div class="step-dot ${S.step>=i?'active':''} ${S.step>i?'done':''}">
               ${S.step > i ? '✓' : i+1}
            </div>
            ${i < totalSteps - 1 ? `<div class="step-line ${S.step>i?'done':''}"></div>` : ''}
          </div>
        `;
    }

    return `
      <div class="step-indicator">
        ${dots}
      </div>
      <div class="option-section">
        <h4>${title}</h4>
        <div class="option-grid">${options}</div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:2rem">
        <button class="btn-preview" onclick="prevStep()" ${S.step===0?'disabled':''} style="${S.step===0?'opacity:0;pointer-events:none':''}">← Previous</button>
        ${(S.mode === 'school' && S.step === 2) || (S.mode === 'college' && S.step === 3) ? `<button class="btn-dl" onclick="finishSteps()">See All Papers →</button>` : ''}
      </div>
    `;
}

function renderPapersPage() {
    return `
    <div class="main">
      <aside class="sidebar">
        <div class="sidebar-sticky">
          <div class="filter-box">
            <div class="filter-box-head">
              <h3>Filters</h3>
              <button class="filter-clear" onclick="clearFilters()">Clear All</button>
            </div>
            ${renderFilterSection('Years', 'years', FACETS.years)}
            ${renderFilterSection('Paper Type', 'types', FACETS.types)}
            ${renderFilterSection('Subjects', 'subjects', FACETS.subjects)}
          </div>
        </div>
      </aside>
      <div class="content">
        <div class="list-controls">
          <div class="result-count">Showing <strong>${PAPERS.length}</strong> of <strong>${TOTAL_PAPERS}</strong> papers</div>
          <div class="list-sort">
            <span class="sort-label">Sort by:</span>
            <select class="sort-select" onchange="setSort(this.value)">
              <option value="year_desc" ${S.sort==='year_desc'?'selected':''}>Newest First</option>
              <option value="year_asc" ${S.sort==='year_asc'?'selected':''}>Oldest First</option>
              <option value="az" ${S.sort==='az'?'selected':''}>Subject (A-Z)</option>
            </select>
          </div>
        </div>
        <div class="results-header-wrap">
          ${S.loading ? `<div class="loading-bar"></div>` : ''}
          <div class="${S.view === 'grid' ? 'papers-grid' : 'papers-list'}" style="transition: opacity 0.3s ease; ${S.loading ? 'opacity: 0.5; pointer-events: none;' : 'opacity: 1;'}">
            ${PAPERS.length ? PAPERS.map(p => renderPaperCard(p)).join('') : (S.loading ? '' : renderEmptyState())}
          </div>
        </div>
        ${renderPagination()}
      </div>
    </div>
    
    <!-- Preview Modal -->
    <div id="previewModal" class="modal-overlay">
      <div class="modal-content preview-modal">
        <div class="modal-head">
          <h3 id="previewTitle">Paper Preview</h3>
          <button class="modal-close" onclick="closePreview()">×</button>
        </div>
        <div class="preview-body" id="previewBody">
          <!-- iframe or pdf viewer here -->
        </div>
      </div>
    </div>
    `;
}

function renderFilterSection(title, key, options) {
  if (!options || !options.length) return '';
  return `
    <div class="filter-section">
      <div class="filter-section-head open">
        ${title} <span class="arrow">▼</span>
      </div>
      <div class="filter-options">
        ${options.map(opt => `
          <label class="filter-opt">
            <input type="checkbox" ${S.filters[key].includes(opt.value) ? 'checked' : ''} onchange="toggleFilter('${key}', '${opt.value}')">
            <div class="custom-cb"></div>
            <span class="filter-opt-label">${opt.value}</span>
            <span class="filter-opt-count">${opt.count}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPaperCard(p) {
  return `
    <div class="paper-card" onclick="openPaper('${p.id}')">
      ${p.hot ? `<span class="paper-hot">🔥 HOT</span>` : p.isNew ? `<span class="paper-new">✨ NEW</span>` : ''}
      <div class="pc-head">
        <div class="paper-subject-icon" style="background:${p.subColor || '#f0f0f0'}">
          ${p.subIcon || '📄'}
        </div>
        <span class="pc-badge ${p.badge}">${p.board.toUpperCase()}</span>
      </div>
      <div class="pc-subject">${p.subject}</div>
      <div class="pc-tags">
        <span class="pc-tag">${p.cls}</span>
        <span class="pc-tag">${p.type}</span>
      </div>
      <div class="pc-foot">
        <span class="pc-year">${p.year}</span>
        <div class="pc-actions">
          <button class="btn-preview-small" onclick="event.stopPropagation(); previewPaper('${p.id}')">
            <i>👁️</i> Preview
          </button>
          <button class="btn-dl-small" onclick="event.stopPropagation(); downloadPaper('${p.id}')">
            <i>⬇️</i> Download
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div class="empty-icon">📂</div>
      <div class="empty-title">No papers found</div>
      <div class="empty-sub">Try adjusting your filters or search query</div>
    </div>
  `;
}

function renderPagination() {
  const totalPages = Math.ceil(TOTAL_PAPERS / S.perPage);
  if (totalPages <= 1) return '';
  
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(`<button class="pg-btn ${S.page===i?'active':''}" onclick="setPage(${i})">${i}</button>`);
  }
  
  return `
    <div class="pagination">
      <button class="pg-btn" ${S.page===1?'disabled':''} onclick="setPage(S.page - 1)">←</button>
      ${pages.join('')}
      <button class="pg-btn" ${S.page===totalPages?'disabled':''} onclick="setPage(S.page + 1)">→</button>
    </div>
  `;
}

function renderAdminUsers() {
  return `
    <div class="step-wizard">
      <div class="option-section">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
          <div>
            <h4 style="margin:0">Admin Dashboard</h4>
            <p style="font-size:12px;color:var(--muted);margin-top:4px">System stats and user management</p>
          </div>
          <button class="btn-dl" onclick="S.step=0;render()">← Exit Dashboard</button>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:15px;margin-bottom:2rem">
          <div style="background:var(--teal-pale);padding:20px;border-radius:var(--r-lg);border:1px solid var(--teal)">
            <span style="font-size:12px;font-weight:700;color:var(--teal);text-transform:uppercase">Total Users</span>
            <div style="font-size:24px;font-weight:800;color:var(--ink);margin-top:5px">${ADMIN_USERS.length}</div>
          </div>
          <div style="background:var(--gold-pale);padding:20px;border-radius:var(--r-lg);border:1px solid var(--gold)">
            <span style="font-size:12px;font-weight:700;color:var(--gold-dim);text-transform:uppercase">Database Size</span>
            <div style="font-size:24px;font-weight:800;color:var(--ink);margin-top:5px">${TOTAL_PAPERS} Papers</div>
          </div>
          <div style="background:#f0fdf4;padding:20px;border-radius:var(--r-lg);border:1px solid #22c55e">
            <span style="font-size:12px;font-weight:700;color:#166534;text-transform:uppercase">System Status</span>
            <div style="font-size:24px;font-weight:800;color:var(--ink);margin-top:5px">Healthy 🟢</div>
          </div>
        </div>

        <h4 style="margin-bottom:1rem">User Management</h4>
        <div style="background:#fff;border-radius:var(--r-lg);border:1px solid var(--border);overflow:hidden">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead style="background:var(--page);border-bottom:1px solid var(--border)">
              <tr>
                <th style="text-align:left;padding:12px 20px">User Email</th>
                <th style="text-align:left;padding:12px 20px">Current Role</th>
                <th style="text-align:left;padding:12px 20px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${ADMIN_USERS.map(u => `
                <tr style="border-bottom:1px solid var(--border-soft)">
                  <td style="padding:12px 20px;font-weight:600">${u.email}</td>
                  <td style="padding:12px 20px">
                    <span style="padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;
                      ${u.role==='admin' ? 'background:#fee2e2;color:#991b1b' : u.role==='contributor' ? 'background:#e0f2fe;color:#0369a1' : 'background:var(--page);color:var(--muted)'}">
                      ${u.role || 'user'}
                    </span>
                  </td>
                  <td style="padding:12px 20px">
                    <select onchange="updateRole('${u.id}', this.value)" style="padding:4px 8px;border-radius:4px;border:1px solid var(--border);font-size:12px">
                      <option value="user" ${u.role==='user'?'selected':''}>Set as User</option>
                      <option value="contributor" ${u.role==='contributor'?'selected':''}>Set as Contributor</option>
                      <option value="admin" ${u.role==='admin'?'selected':''}>Set as Admin</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

/**
 * Updates breadcrumbs based on current state
 */
function updateBreadcrumbs() {
  const bc = document.getElementById('breadcrumb');
  if (S.step === 0) { bc.style.display = 'none'; return; }
  bc.style.display = 'flex';
  
  let html = `<div class="bc-item" onclick="S.step=0;render()">Home</div> <span class="bc-sep">/</span>`;
  
  if (S.step >= 1) {
    const bName = (S.mode === 'school' ? BOARDS : UNIVERSITIES).find(b=>b.id===S.board)?.name || S.board;
    html += `<div class="bc-item ${S.step===1?'active':''}" onclick="S.step=1;render()">${bName}</div>`;
  }
  if (S.step >= 2) {
    html += ` <span class="bc-sep">/</span> <div class="bc-item ${S.step===2?'active':''}" onclick="S.step=2;render()">${S.cls}</div>`;
  }
  if (S.step >= 3) {
    html += ` <span class="bc-sep">/</span> <div class="bc-item active">${S.stream}</div>`;
  }
  
  bc.innerHTML = html;
}
