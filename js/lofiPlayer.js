/**
 * ==============================================================================
 * 🎧 AMBIENT LO-FI BEATS & EQUALIZER VISUALIZER
 * ==============================================================================
 * Live interactive audio widget featuring generative ambient chord synthesis,
 * animated equalizer frequency bars, and spinning vinyl disc mechanics.
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initLoFiPlayer() {
  const container = document.getElementById('lofiWidget');
  const playBtn = document.getElementById('lofiPlayBtn');
  const vinylDisc = document.getElementById('lofiVinylDisc');
  const eqBars = document.getElementById('lofiEqBars');
  const statusLabel = document.getElementById('lofiStatus');

  if (!container || !playBtn) return;

  let isPlaying = false;

  const quickNavBtn = document.getElementById('lofiQuickToggle');

  const updateUI = (active) => {
    isPlaying = active;
    playBtn.innerHTML = isPlaying ? `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
    ` : `
      <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    `;

    if (vinylDisc) vinylDisc.classList.toggle('is-spinning', isPlaying);
    if (eqBars) eqBars.classList.toggle('is-active', isPlaying);
    if (quickNavBtn) {
      quickNavBtn.classList.toggle('is-playing', isPlaying);
      quickNavBtn.setAttribute('title', isPlaying ? 'Lo-Fi Synth Playing (Click to pause)' : 'Toggle Ambient Coding Synth');
    }
    if (statusLabel) {
      statusLabel.textContent = isPlaying ? 'Streaming Ambient Coding Chords' : 'Ambient Lo-Fi Synth (Offline)';
    }

    window.showToast?.(isPlaying ? '🎵 Ambient Lo-Fi Synth Started' : '⏸ Ambient Lo-Fi Synth Paused');
  };

  playBtn.addEventListener('click', () => {
    sound.toggleLoFi((active) => {
      updateUI(active);
    });
  });

  // Global trigger for command palette and nav bar
  window.toggleLoFiBeats = () => {
    sound.toggleLoFi((active) => {
      updateUI(active);
    });
  };
}
