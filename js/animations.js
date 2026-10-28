/**
 * ==============================================================================
 * ✨ ADVANCED ANIMATIONS & MICRO-INTERACTIONS
 * ==============================================================================
 * Custom Cyber Cursor, Magnetic Buttons, Hacker Text Decrypt,
 * Scroll-triggered Number Counters, and APK Installation Simulator.
 * ==============================================================================
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { sound } from './sound.js';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  initCustomCursor();
  initMagneticButtons();
  initTextDecrypt();
  initNumberCounters();
  initApkSimulator();
}

// ── 1. Custom Cyber Cursor Follower ──────────────────────────────────
function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  let cursorDot = document.querySelector('.cyber-cursor-dot');
  let cursorRing = document.querySelector('.cyber-cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.className = 'cyber-cursor-dot';
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.className = 'cyber-cursor-ring';
    document.body.appendChild(cursorRing);
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth ring follow
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover expansion on clickable elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .proj-card, .glass, .tech-pill');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('is-hovered');
      sound.playHover();
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('is-hovered');
    });
  });
}

// ── 2. Magnetic Buttons ──────────────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  const magneticBtns = document.querySelectorAll('.btn, .nav-icon-btn, .sim-phone-tab, .ai-dock-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

// ── 3. Hacker Text Decrypt Scramble ──────────────────────────────────
function initTextDecrypt() {
  const chars = '01ABCDEFXYZ$#%&*+/<>~_';
  const decryptTargets = document.querySelectorAll('.decrypt-text, .section-title em, .hero-kicker .kicker-tag');

  decryptTargets.forEach(el => {
    const originalText = el.textContent;
    let isRunning = false;

    const runScramble = () => {
      if (isRunning) return;
      isRunning = true;
      let iteration = 0;
      const interval = setInterval(() => {
        el.textContent = originalText.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
          el.textContent = originalText;
          isRunning = false;
        }
        iteration += 1 / 2;
      }, 30);
    };

    // Scramble on scroll reveal
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: runScramble
    });

    // Scramble on hover
    el.addEventListener('mouseenter', runScramble);
  });
}

// ── 4. Animated Number Counters ──────────────────────────────────────
function initNumberCounters() {
  const statItems = document.querySelectorAll('.telem-val, .f-point-num, .stat-counter');
  statItems.forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/([0-9.]+)/);
    if (!match) return;

    const targetVal = parseFloat(match[1]);
    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + match[1].length);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = prefix + (targetVal % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          }
        });
      }
    });
  });
}

// ── 5. APK Installation Simulator ────────────────────────────────────
function initApkSimulator() {
  const apkTrigger = document.getElementById('simulateApkBtn');
  if (!apkTrigger) return;

  apkTrigger.addEventListener('click', () => {
    sound.playChime();
    apkTrigger.disabled = true;
    apkTrigger.innerHTML = `
      <span class="apk-spinner"></span> Installing APK to Android Runtime...
    `;

    setTimeout(() => {
      sound.playChime();
      apkTrigger.disabled = false;
      apkTrigger.innerHTML = `✓ APK Installed Successfully!`;
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#ffffff']
      });

      window.showToast?.('E-Learning Android APK (v2.4.0) verified & running!');

      // Switch simulator tab to E-learning
      const elearningTab = document.getElementById('simTabElearning');
      if (elearningTab) elearningTab.click();
    }, 1800);
  });
}
