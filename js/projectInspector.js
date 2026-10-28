/**
 * ==============================================================================
 * 🔍 ARCHITECTURE BLUEPRINT INSPECTOR
 * ==============================================================================
 * Deep-dive technical modal allowing engineers and tech leads to inspect
 * ML pipeline flowcharts, latency breakdown, and system architecture.
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initProjectInspector(projects) {
  const modal = document.getElementById('projectInspectorModal');
  const modalBody = document.getElementById('inspectorBody');
  const closeBtn = document.getElementById('inspectorClose');

  if (!modal || !modalBody) return;

  const openInspector = (projectId) => {
    const p = projects.find(item => item.id === projectId);
    if (!p) return;

    sound.playChime();

    modalBody.innerHTML = `
      <div class="insp-header">
        <span class="insp-badge">${p.cat}</span>
        <h2 class="insp-title">${escapeHtml(p.name)} Architecture</h2>
        <p class="insp-headline">${escapeHtml(p.headline)}</p>
      </div>

      <div class="insp-metrics-grid">
        <div class="insp-metric-card">
          <span class="insp-metric-label">Benchmark Metrics</span>
          <span class="insp-metric-val">${p.metrics || 'Production Ready'}</span>
        </div>
        <div class="insp-metric-card">
          <span class="insp-metric-label">Pipeline Latency</span>
          <span class="insp-metric-val text-accent">${p.arch?.latency || '<50ms'}</span>
        </div>
        <div class="insp-metric-card">
          <span class="insp-metric-label">Core Models</span>
          <span class="insp-metric-val">${p.arch?.models?.join(', ') || 'Custom Deep Learning'}</span>
        </div>
      </div>

      <div class="insp-flow-section">
        <h3 class="insp-sub">Pipeline Topology</h3>
        <div class="insp-flow-diagram">
          ${renderFlowchart(p.arch?.flow)}
        </div>
      </div>

      <div class="insp-details-section">
        <h3 class="insp-sub">Technical Implementation</h3>
        <p class="insp-desc">${escapeHtml(p.desc)}</p>
        <div class="insp-tags">
          ${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>

      <div class="insp-footer-links">
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm">Launch Live Demo ↗</a>` : ''}
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">View Source on GitHub ↗</a>` : ''}
      </div>
    `;

    modal.classList.add('is-open');
  };

  const closeInspector = () => {
    modal.classList.remove('is-open');
    sound.playClick();
  };

  const renderFlowchart = (flowStr) => {
    if (!flowStr) return '<p class="muted">Architecture diagram loading...</p>';
    const steps = flowStr.split('➔').map(s => s.trim());
    return `
      <div class="flow-nodes">
        ${steps.map((step, i) => `
          <div class="flow-node">
            <span class="flow-num">0${i + 1}</span>
            <span class="flow-text">${escapeHtml(step)}</span>
          </div>
          ${i < steps.length - 1 ? '<span class="flow-arrow">➔</span>' : ''}
        `).join('')}
      </div>
    `;
  };

  if (closeBtn) closeBtn.addEventListener('click', closeInspector);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeInspector();
  });

  window.inspectProject = openInspector;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
