/**
 * ==============================================================================
 * 📱 INTERACTIVE MULTI-STACK WORKBENCH & DEVICE SIMULATOR
 * ==============================================================================
 * Interactive frame allowing visitors to test Tanmay's:
 * 1. Android Native Apps (E-Learning & WhatsApp Clone)
 * 2. Live Deployed Web Platform (smartcampus.site)
 * 3. Applied AI & Token Intelligence Tester
 * 4. Backend REST API & MySQL Telemetry
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initAndroidSimulator() {
  const container = document.getElementById('androidSimulator');
  if (!container) return;

  const tabElearning = document.getElementById('simTabElearning');
  const tabSmartcampus = document.getElementById('simTabSmartcampus');
  const tabCorrespondence = document.getElementById('simTabCorrespondence');
  const tabWhatsapp = document.getElementById('simTabWhatsapp');
  const tabAi = document.getElementById('simTabAi');
  const tabTelemetry = document.getElementById('simTabTelemetry');
  const phoneScreen = document.getElementById('phoneScreenContent');

  let currentApp = 'smartcampus'; // Default to deployed smartcampus.site or elearning

  const renderScreen = () => {
    if (!phoneScreen) return;

    if (currentApp === 'smartcampus') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-smartcampus">
          <div class="phone-status-bar sc-status-bar">
            <span>smartcampus.site.je/?i=1</span>
            <span class="status-icons">🔒 SSL 200 OK</span>
          </div>

          <div class="sc-content">
            <div class="sc-brand-header">
              <span class="sc-live-pill font-mono">● System Online & Active</span>
              <h3 class="sc-title">Smart Campus Issue Management</h3>
              <p class="sc-sub">Centralized facility, Wi-Fi & classroom problem tracking</p>
            </div>

            <!-- Student Portal Mini Card -->
            <div class="sc-mini-portal sc-student-card">
              <div class="sc-portal-top">
                <span class="sc-portal-icon icon-blue">🎓</span>
                <div>
                  <h4 class="sc-portal-heading">Student Portal</h4>
                  <p class="sc-portal-text">Log Wi-Fi, classroom & electrical issues</p>
                </div>
              </div>
              <a href="https://smartcampus.site.je/?i=1" target="_blank" rel="noopener noreferrer" class="btn btn-primary-sc btn-sm w-100">
                Student Sign In ↗
              </a>
              <div class="sc-demo-acc font-mono">Demo: ananya.student@campus.edu</div>
            </div>

            <!-- Admin Portal Mini Card -->
            <div class="sc-mini-portal sc-admin-card">
              <div class="sc-portal-top">
                <span class="sc-portal-icon icon-amber">🛡️</span>
                <div>
                  <h4 class="sc-portal-heading">Admin Dashboard</h4>
                  <p class="sc-portal-text">Review complaints, assign technicians & reports</p>
                </div>
              </div>
              <a href="https://smartcampus.site.je/?i=1" target="_blank" rel="noopener noreferrer" class="btn btn-amber-sc btn-sm w-100">
                Administrator Sign In ↗
              </a>
              <div class="sc-demo-acc font-mono">Demo: admin@campus.edu</div>
            </div>

            <!-- Native Android App Sync -->
            <div class="sc-android-sync font-mono">
              <span>📱 Native Android App (Java + XML) Ready</span>
            </div>

            <a href="https://smartcampus.site.je/?i=1" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm sc-live-btn">
              Open Live smartcampus.site.je ↗
            </a>
          </div>
        </div>
      `;
    } else if (currentApp === 'correspondence') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-correspondence font-mono">
          <div class="phone-status-bar wa-status-bar">
            <span>GOVT POLYTECHNIC ARVI</span>
            <span class="status-icons">🏛️ ARCHIVE</span>
          </div>

          <div class="sc-content" style="padding: 1.15rem 1rem;">
            <div class="sc-brand-header">
              <span class="sc-live-pill font-mono" style="color: #10b981; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.12);">● Institutional Ledger Digitized</span>
              <h3 class="sc-title" style="font-size: 1.15rem; margin-top: 0.35rem;">Inward &amp; Outward Correspondence</h3>
              <p class="sc-sub">Official letter tracking &amp; barcode dispatch engine</p>
            </div>

            <div style="display: flex; gap: 0.5rem; margin: 0.85rem 0;">
              <button type="button" class="btn btn-accent btn-sm" id="correspInBtn" style="flex: 1; font-size: 0.72rem;">📥 Inward (842)</button>
              <button type="button" class="btn btn-glass btn-sm" id="correspOutBtn" style="flex: 1; font-size: 0.72rem;">📤 Outward (378)</button>
            </div>

            <div id="correspFeed" style="display: flex; flex-direction: column; gap: 0.65rem; max-height: 180px; overflow-y: auto; text-align: left;">
              <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #10b981;">
                <div style="display: flex; justify-content: space-between; color: #10b981; font-weight: 700; margin-bottom: 0.2rem;">
                  <span>INW-2024-0892</span>
                  <span style="color: var(--subtle);">12-Apr-2024</span>
                </div>
                <div style="color: #fff; font-weight: 600;">DTE Curriculum Circular &amp; Exam Schedule</div>
                <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">From: Directorate Tech Edu ➔ Routing: Comp. Dept</div>
              </div>
              <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #06b6d4;">
                <div style="display: flex; justify-content: space-between; color: #06b6d4; font-weight: 700; margin-bottom: 0.2rem;">
                  <span>INW-2024-0891</span>
                  <span style="color: var(--subtle);">10-Apr-2024</span>
                </div>
                <div style="color: #fff; font-weight: 600;">Govt Scholarship Verification Audit</div>
                <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">From: Social Welfare Dept ➔ Routing: Admin Office</div>
              </div>
            </div>

            <div style="margin-top: 0.85rem; display: flex; gap: 0.5rem;">
              <input type="text" id="correspSearchInput" class="wa-input" placeholder="Search reference number..." style="font-size: 0.75rem; padding: 0.45rem 0.75rem;" />
              <button type="button" class="btn btn-accent btn-sm" id="correspSearchBtn" style="white-space: nowrap; font-size: 0.72rem;">Lookup</button>
            </div>
          </div>
        </div>
      `;

      const inBtn = document.getElementById('correspInBtn');
      const outBtn = document.getElementById('correspOutBtn');
      const feed = document.getElementById('correspFeed');
      const searchBtn = document.getElementById('correspSearchBtn');
      const searchInput = document.getElementById('correspSearchInput');

      if (inBtn && outBtn && feed) {
        inBtn.addEventListener('click', () => {
          sound.playClick();
          inBtn.className = 'btn btn-accent btn-sm';
          outBtn.className = 'btn btn-glass btn-sm';
          feed.innerHTML = `
            <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #10b981;">
              <div style="display: flex; justify-content: space-between; color: #10b981; font-weight: 700; margin-bottom: 0.2rem;">
                <span>INW-2024-0892</span>
                <span style="color: var(--subtle);">12-Apr-2024</span>
              </div>
              <div style="color: #fff; font-weight: 600;">DTE Curriculum Circular &amp; Exam Schedule</div>
              <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">From: Directorate Tech Edu ➔ Routing: Comp. Dept</div>
            </div>
            <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #06b6d4;">
              <div style="display: flex; justify-content: space-between; color: #06b6d4; font-weight: 700; margin-bottom: 0.2rem;">
                <span>INW-2024-0891</span>
                <span style="color: var(--subtle);">10-Apr-2024</span>
              </div>
              <div style="color: #fff; font-weight: 600;">Govt Scholarship Verification Audit</div>
              <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">From: Social Welfare Dept ➔ Routing: Admin Office</div>
            </div>
          `;
        });

        outBtn.addEventListener('click', () => {
          sound.playClick();
          outBtn.className = 'btn btn-accent btn-sm';
          inBtn.className = 'btn btn-glass btn-sm';
          feed.innerHTML = `
            <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #f59e0b;">
              <div style="display: flex; justify-content: space-between; color: #f59e0b; font-weight: 700; margin-bottom: 0.2rem;">
                <span>OUT-2024-0412</span>
                <span style="color: var(--subtle);">18-May-2024</span>
              </div>
              <div style="color: #fff; font-weight: 600;">Annual Departmental Lab Equipment Audit</div>
              <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">To: MSBTE Board ➔ Status: Dispatched via SpeedPost</div>
            </div>
            <div class="glass" style="padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; border-left: 3px solid #10b981;">
              <div style="display: flex; justify-content: space-between; color: #10b981; font-weight: 700; margin-bottom: 0.2rem;">
                <span>OUT-2024-0411</span>
                <span style="color: var(--subtle);">15-May-2024</span>
              </div>
              <div style="color: #fff; font-weight: 600;">Student Industrial Training NOC Approvals</div>
              <div style="color: var(--muted); font-size: 0.68rem; margin-top: 0.2rem;">To: Mountreach Solutions ➔ Status: Dispatched</div>
            </div>
          `;
        });
      }

      if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
          const q = searchInput.value.trim();
          sound.playChime();
          window.showToast?.(q ? `Queried: "${q}" — 100% Index Match found in MySQL` : 'Generated instant barcode & tracking token!');
        });
      }
    } else if (currentApp === 'elearning') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-elearning">
          <div class="phone-status-bar">
            <span>09:41</span>
            <span class="status-icons">📶 🔋 85%</span>
          </div>

          <div class="el-header">
            <span class="el-back">←</span>
            <span class="el-title">COURSE: ANDROID & KOTLIN</span>
            <span class="el-menu">⋮</span>
          </div>

          <div class="el-video-preview">
            <div class="el-video-overlay">
              <button class="el-play-circle" id="elVideoPlay" type="button">▶</button>
            </div>
            <div class="el-video-badge font-mono">Module 4: MVVM Architecture</div>
          </div>

          <div class="el-progress-section">
            <div class="el-progress-label font-mono">
              <span>Course Progress</span>
              <span class="text-accent">85% Completed</span>
            </div>
            <div class="el-progress-bar"><div class="el-progress-fill" style="width: 85%"></div></div>
          </div>

          <div class="el-modules-list">
            <div class="el-module-item is-completed">
              <span class="el-check">✓</span>
              <div>
                <div class="el-m-title">01. Android Studio & Gradle Setup</div>
                <div class="el-m-sub font-mono">18 mins · Completed</div>
              </div>
            </div>
            <div class="el-module-item is-completed">
              <span class="el-check">✓</span>
              <div>
                <div class="el-m-title">02. Kotlin Coroutines & Asynchronous Flow</div>
                <div class="el-m-sub font-mono">34 mins · Completed</div>
              </div>
            </div>
            <div class="el-module-item is-active">
              <span class="el-check">▶</span>
              <div>
                <div class="el-m-title">03. REST API Integration with Retrofit & PHP</div>
                <div class="el-m-sub font-mono">Now Playing · 42 mins</div>
              </div>
            </div>
          </div>
        </div>
      `;

      const playBtn = document.getElementById('elVideoPlay');
      if (playBtn) {
        playBtn.addEventListener('click', () => {
          sound.playChime();
          window.showToast?.('Streaming E-Learning lecture module...');
        });
      }
    } else if (currentApp === 'whatsapp') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-whatsapp">
          <div class="phone-status-bar wa-status-bar">
            <span>10:14</span>
            <span class="status-icons">📶 🔋 92%</span>
          </div>

          <div class="wa-app-bar">
            <div class="wa-user-info">
              <span class="wa-avatar">👤</span>
              <div>
                <div class="wa-name">Mountreach Tech Lead</div>
                <div class="wa-status font-mono">online</div>
              </div>
            </div>
            <div class="wa-actions">📞 📹 ⋮</div>
          </div>

          <div class="wa-chat-canvas" id="waChatCanvas">
            <div class="wa-bubble wa-incoming">
              <p>Hey Tanmay! How is the E-Learning Android build coming along?</p>
              <span class="wa-time font-mono">10:12 AM</span>
            </div>
            <div class="wa-bubble wa-outgoing">
              <p>Going great! Just integrated Retrofit REST endpoints with PHP backend and verified MySQL auth tokens.</p>
              <span class="wa-time font-mono">10:13 AM ✓✓</span>
            </div>
            <div class="wa-bubble wa-incoming">
              <p>Awesome work! The RecyclerView scrolling is super smooth.</p>
              <span class="wa-time font-mono">10:14 AM</span>
            </div>
          </div>

          <div class="wa-input-row">
            <input type="text" id="waDirectInput" class="wa-input" placeholder="Type a message..." />
            <button type="button" class="wa-send-btn" id="waSendBtn">➤</button>
          </div>
        </div>
      `;

      const input = document.getElementById('waDirectInput');
      const send = document.getElementById('waSendBtn');
      const canvas = document.getElementById('waChatCanvas');

      const sendMsg = () => {
        const text = input.value.trim();
        if (!text) return;
        sound.playClick();
        const b = document.createElement('div');
        b.className = 'wa-bubble wa-outgoing';
        b.innerHTML = `<p>${escapeHtml(text)}</p><span class="wa-time font-mono">Just now ✓✓</span>`;
        canvas.appendChild(b);
        input.value = '';
        canvas.scrollTop = canvas.scrollHeight;

        setTimeout(() => {
          sound.playChime();
          const reply = document.createElement('div');
          reply.className = 'wa-bubble wa-incoming';
          reply.innerHTML = `<p>Received on Android Studio! Thanks for testing Tanmay's WhatsApp Clone app.</p><span class="wa-time font-mono">Just now</span>`;
          canvas.appendChild(reply);
          canvas.scrollTop = canvas.scrollHeight;
        }, 600);
      };

      if (send) send.addEventListener('click', sendMsg);
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') sendMsg();
        });
      }
    } else if (currentApp === 'ai') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-ai-screen font-mono">
          <div class="phone-status-bar ai-status-bar">
            <span>AI COPILOT</span>
            <span class="text-accent">GEMINI 1.5 PRO</span>
          </div>

          <div class="ai-screen-body">
            <div class="ai-screen-head">
              <span class="ai-brain-icon">🧠</span>
              <div>
                <strong>Document RAG Intelligence</strong>
                <p class="text-muted text-xs">Semantic Embedding &amp; Question Answering</p>
              </div>
            </div>

            <div class="ai-query-box glass">
              <span class="text-accent">Input Query:</span>
              <p>"Summarize semester attendance criteria from Smart Campus regulations."</p>
            </div>

            <div class="ai-tokens-visual">
              <span class="ai-tok t1">Semantic</span>
              <span class="ai-tok t2">Vector</span>
              <span class="ai-tok t3">Cosine: 0.94</span>
              <span class="ai-tok t4">Latency: 38ms</span>
            </div>

            <div class="ai-response-box glass">
              <span class="ai-res-label">Verified Output:</span>
              <p>Per institutional ledger, students must maintain ≥75% aggregate attendance to qualify for university end-semester examinations.</p>
            </div>
          </div>
        </div>
      `;
    } else if (currentApp === 'telemetry') {
      phoneScreen.innerHTML = `
        <div class="app-screen app-telemetry font-mono">
          <div class="phone-status-bar telem-status-bar">
            <span>DEV CONSOLE</span>
            <span class="text-accent">CONNECTED 200 OK</span>
          </div>

          <div class="telem-body">
            <div class="telem-block">
              <span class="telem-hdr">// HTTP REST API REQUEST</span>
              <pre><code>POST /api/v1/smartcampus/auth
Host: smartcampus.site
Content-Type: application/json
Payload: { "student_id": "SVPCET_82", "auth": "JWT_VERIFIED" }</code></pre>
            </div>

            <div class="telem-block">
              <span class="telem-hdr text-accent">// DATABASE QUERY (MySQL 8.0)</span>
              <pre><code>SELECT * FROM campus_records 
WHERE portal = 'smartcampus.site' 
AND status = 'ACTIVE' 
LIMIT 1;
-- Query Latency: 1.2ms [INDEXED]</code></pre>
            </div>

            <div class="telem-block">
              <span class="telem-hdr">// RUNTIME TELEMETRY</span>
              <div class="telem-stats-row">
                <div>FPS: <strong class="text-accent">60.0</strong></div>
                <div>RAM: <strong>138 MB</strong></div>
                <div>Network: <strong>38ms</strong></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  const setApp = (app) => {
    currentApp = app;
    sound.playClick();
    tabSmartcampus?.classList.toggle('is-on', app === 'smartcampus');
    tabCorrespondence?.classList.toggle('is-on', app === 'correspondence');
    tabElearning?.classList.toggle('is-on', app === 'elearning');
    tabWhatsapp?.classList.toggle('is-on', app === 'whatsapp');
    tabAi?.classList.toggle('is-on', app === 'ai');
    tabTelemetry?.classList.toggle('is-on', app === 'telemetry');
    renderScreen();
  };

  if (tabSmartcampus) tabSmartcampus.addEventListener('click', () => setApp('smartcampus'));
  if (tabCorrespondence) tabCorrespondence.addEventListener('click', () => setApp('correspondence'));
  if (tabElearning) tabElearning.addEventListener('click', () => setApp('elearning'));
  if (tabWhatsapp) tabWhatsapp.addEventListener('click', () => setApp('whatsapp'));
  if (tabAi) tabAi.addEventListener('click', () => setApp('ai'));
  if (tabTelemetry) tabTelemetry.addEventListener('click', () => setApp('telemetry'));

  renderScreen();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
