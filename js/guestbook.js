/**
 * ==============================================================================
 * 🎨 16×16 PIXEL ART GUESTBOOK 2.0
 * ==============================================================================
 * Interactive retro cyber pixel canvas where visitors leave their mark.
 * Features 12 neon swatches, eraser, preset stickers, undo, and local wall.
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initPixelGuestbook() {
  const canvas = document.getElementById('gbCanvas');
  const paletteEl = document.getElementById('gbPalette');
  const nameInput = document.getElementById('gbName');
  const submitBtn = document.getElementById('gbSubmit');
  const clearBtn = document.getElementById('gbClear');
  const undoBtn = document.getElementById('gbUndo');
  const exportBtn = document.getElementById('gbExport');
  const wallEl = document.getElementById('gbWall');
  const presetsEl = document.getElementById('gbPresets');

  if (!canvas || !paletteEl || !wallEl) return;

  const ctx = canvas.getContext('2d');
  const GRID_SIZE = 16;
  const PIXEL_PX = canvas.width / GRID_SIZE; // 320 / 16 = 20px

  const colors = [
    '#eb1e3c', '#ff4d6d', '#a855f7', '#6366f1',
    '#38bdf8', '#2dd4bf', '#22c55e', '#eab308',
    '#f97316', '#ffffff', '#94a3b8', '#000000'
  ];

  let currentColor = colors[0];
  let isDrawing = false;
  let grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  let history = [];

  // Render palette
  paletteEl.innerHTML = colors.map((c, i) => `
    <button type="button" class="gb-color ${i === 0 ? 'is-active' : ''}" style="--c:${c}" data-color="${c}" aria-label="Color ${c}"></button>
  `).join('');

  paletteEl.querySelectorAll('.gb-color').forEach(btn => {
    btn.addEventListener('click', () => {
      currentColor = btn.getAttribute('data-color');
      paletteEl.querySelectorAll('.gb-color').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      sound.playClick();
    });
  });

  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    ctx.fillStyle = '#111116';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * PIXEL_PX, 0);
      ctx.lineTo(i * PIXEL_PX, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * PIXEL_PX);
      ctx.lineTo(canvas.width, i * PIXEL_PX);
      ctx.stroke();
    }

    // Draw active cells
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c]) {
          ctx.fillStyle = grid[r][c];
          ctx.fillRect(c * PIXEL_PX, r * PIXEL_PX, PIXEL_PX, PIXEL_PX);
        }
      }
    }
  };

  const getCellFromEvent = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor((x / rect.width) * GRID_SIZE);
    const r = Math.floor((y / rect.height) * GRID_SIZE);
    return { r, c };
  };

  const setPixel = (r, c) => {
    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
      if (grid[r][c] !== currentColor) {
        saveState();
        grid[r][c] = currentColor;
        drawGrid();
        sound.playHover();
      }
    }
  };

  const saveState = () => {
    history.push(JSON.parse(JSON.stringify(grid)));
    if (history.length > 20) history.shift();
  };

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const { r, c } = getCellFromEvent(e);
    setPixel(r, c);
  });

  window.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      const { r, c } = getCellFromEvent(e);
      setPixel(r, c);
    }
  });

  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    const touch = e.touches[0];
    const { r, c } = getCellFromEvent(touch);
    setPixel(r, c);
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) {
      const touch = e.touches[0];
      const { r, c } = getCellFromEvent(touch);
      setPixel(r, c);
    }
  }, { passive: false });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      saveState();
      grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
      drawGrid();
      sound.playClick();
    });
  }

  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      if (history.length > 0) {
        grid = history.pop();
        drawGrid();
        sound.playClick();
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `pixel-signature-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      sound.playChime();
    });
  }

  // Pre-seed and local signatures
  const loadWall = () => {
    let entries = JSON.parse(localStorage.getItem('portfolio_guestbook') || '[]');
    if (entries.length === 0) {
      entries = [
        { name: "Alex · AI Researcher", time: "2 hours ago", data: generateSeedData('brain') },
        { name: "Maya · Frontend Lead", time: "Yesterday", data: generateSeedData('heart') },
        { name: "Vikram · YC Founder", time: "3 days ago", data: generateSeedData('rocket') }
      ];
    }

    wallEl.innerHTML = entries.map(item => `
      <div class="gb-card glass">
        <img class="gb-thumb" src="${item.data}" alt="Pixel signature" />
        <div class="gb-meta">
          <span class="gb-author">${escapeHtml(item.name)}</span>
          <span class="gb-time">${escapeHtml(item.time)}</span>
        </div>
      </div>
    `).join('');
  };

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = (nameInput?.value.trim()) || 'Anonymous Visionary';
      const dataUrl = canvas.toDataURL();

      const newEntry = {
        name,
        time: 'Just now',
        data: dataUrl
      };

      const entries = JSON.parse(localStorage.getItem('portfolio_guestbook') || '[]');
      entries.unshift(newEntry);
      localStorage.setItem('portfolio_guestbook', JSON.stringify(entries.slice(0, 24)));

      loadWall();
      sound.playChime();
      window.showToast?.('Pixel signature added to wall!');

      // Reset
      grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
      drawGrid();
      if (nameInput) nameInput.value = '';
    });
  }

  drawGrid();
  loadWall();
}

function generateSeedData(type) {
  const c = document.createElement('canvas');
  c.width = 160;
  c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#111116';
  ctx.fillRect(0, 0, 160, 160);

  ctx.fillStyle = type === 'heart' ? '#eb1e3c' : (type === 'rocket' ? '#38bdf8' : '#a855f7');
  // Simple retro pattern
  ctx.beginPath();
  ctx.arc(80, 80, 45, 0, Math.PI * 2);
  ctx.fill();

  return c.toDataURL();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
