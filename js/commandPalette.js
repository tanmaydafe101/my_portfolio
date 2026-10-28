/**
 * ==============================================================================
 * ⌨️ SPOTLIGHT COMMAND PALETTE (Cmd+K / Ctrl+K)
 * ==============================================================================
 * Keyboard-first command menu for rapid navigation, theme toggles,
 * AI assistant triggers, and developer shortcuts.
 * ==============================================================================
 */

import { sound } from './sound.js';
import confetti from 'canvas-confetti';

export function initCommandPalette(config) {
  const modal = document.getElementById('cmdPaletteModal');
  const input = document.getElementById('cmdInput');
  const list = document.getElementById('cmdList');
  if (!modal || !input || !list) return;

  const commands = [
    { id: 'jump-flagship', title: 'Visit smartcampus.site.je (Live Cloud Platform)', cat: 'Featured', icon: '🌐', action: () => window.open('https://smartcampus.site.je/?i=1', '_blank') },
    { id: 'jump-projects', title: 'Applications Showcase (3D Card View Grid)', cat: 'Navigation', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'jump-bento', title: 'Tri-Stack Matrix (Android · Web · AI)', cat: 'Navigation', icon: '🧠', action: () => scrollToSection('#bento') },
    { id: 'jump-github', title: 'GitHub Contributions & Code Velocity', cat: 'Navigation', icon: '📈', action: () => scrollToSection('#github') },
    { id: 'jump-simulator', title: 'Interactive Multi-Stack Workbench & Simulator', cat: 'Navigation', icon: '📱', action: () => scrollToSection('#simulator') },
    { id: 'jump-principles', title: 'Engineering Principles & Craft', cat: 'Navigation', icon: '📐', action: () => scrollToSection('#principles') },
    { id: 'jump-guestbook', title: '16×16 Pixel Art Guestbook Wall', cat: 'Navigation', icon: '🎨', action: () => scrollToSection('#guestbook') },
    { id: 'jump-contact', title: 'Connect / Get In Touch', cat: 'Navigation', icon: '✉️', action: () => scrollToSection('#contact') },
    { id: 'open-ai', title: `Ask ${config.firstName}’s AI Copilot Agent`, cat: 'AI Assistant', icon: '🤖', action: () => window.openAiCopilot?.() },
    { id: 'toggle-sound', title: 'Toggle Procedural Sound FX', cat: 'Preferences', icon: '🔊', action: () => window.toggleSoundFx?.() },
    { id: 'toggle-lofi', title: 'Toggle Ambient Lo-Fi Beats Synthesizer', cat: 'Audio', icon: '🎧', action: () => window.toggleLoFiBeats?.() },
    { id: 'toggle-theme', title: 'Switch Theme (Dark / Light)', cat: 'Preferences', icon: '🌗', action: () => window.toggleThemeMode?.() },
    { id: 'copy-email', title: `Copy Email (${config.email})`, cat: 'Action', icon: '📋', action: () => copyEmail(config.email) },
    { id: 'download-resume', title: 'Download Resume (PDF)', cat: 'Action', icon: '📄', action: () => downloadResume(config.resumeUrl) },
    { id: 'celebrate', title: 'Launch Celebration Confetti 🚀', cat: 'Easter Egg', icon: '🎉', action: () => triggerConfetti() }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  const renderCommands = () => {
    if (filteredCommands.length === 0) {
      list.innerHTML = `<li class="cmd-empty">No matching commands found for "${escapeHtml(input.value)}"</li>`;
      return;
    }

    list.innerHTML = filteredCommands.map((cmd, idx) => `
      <li class="cmd-item ${idx === selectedIndex ? 'is-selected' : ''}" data-idx="${idx}">
        <span class="cmd-icon">${cmd.icon}</span>
        <div class="cmd-info">
          <span class="cmd-title">${escapeHtml(cmd.title)}</span>
          <span class="cmd-cat">${cmd.cat}</span>
        </div>
        <kbd class="cmd-enter">↵</kbd>
      </li>
    `).join('');

    // Attach click handlers
    list.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(item.getAttribute('data-idx'));
        updateSelection();
        sound.playHover();
      });
      item.addEventListener('click', () => {
        executeCommand(filteredCommands[selectedIndex]);
      });
    });
  };

  const updateSelection = () => {
    list.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.classList.toggle('is-selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  const executeCommand = (cmd) => {
    if (!cmd) return;
    sound.playClick();
    closePalette();
    cmd.action();
  };

  const openPalette = () => {
    modal.classList.add('is-open');
    input.value = '';
    filteredCommands = [...commands];
    selectedIndex = 0;
    renderCommands();
    setTimeout(() => input.focus(), 50);
    sound.playChime();
  };

  const closePalette = () => {
    modal.classList.remove('is-open');
  };

  // Keyboard events
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    filteredCommands = commands.filter(c =>
      c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q)
    );
    selectedIndex = 0;
    renderCommands();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      updateSelection();
      sound.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      updateSelection();
      sound.playHover();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Global hotkeys (Cmd+K / Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('is-open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closePalette();
    }
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Close button
  const closeBtn = document.getElementById('cmdClose');
  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  // Trigger button in nav or floating dock
  const triggers = document.querySelectorAll('[data-open-cmd]');
  triggers.forEach(btn => btn.addEventListener('click', openPalette));

  // Expose global open method
  window.openCommandPalette = openPalette;
}

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    window.showToast?.(`Copied ${email} to clipboard!`);
    triggerConfetti();
  });
}

function downloadResume(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Shaurya_Verma_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.showToast?.('Resume download started!');
}

function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#eb1e3c', '#a855f7', '#38bdf8', '#ffffff']
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
