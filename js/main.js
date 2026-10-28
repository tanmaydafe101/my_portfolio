/**
 * ==============================================================================
 * 🚀 MAIN ENTRY POINT & ORCHESTRATION — TANMAY DAFE PORTFOLIO
 * ==============================================================================
 * Smooth scrolling, GSAP reveals, 3D card tilts, Android App Simulator,
 * Developer CLI Terminal, and interactive systems.
 * ==============================================================================
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CONFIG } from './config.js';
import { sound } from './sound.js';
import { initParticles } from './particles.js';
import { initCommandPalette } from './commandPalette.js';
import { initAiAssistant } from './aiAssistant.js';
import { initProjectInspector } from './projectInspector.js';
import { initAndroidSimulator } from './androidSimulator.js';
import { initGithubGraph } from './githubGraph.js';
import { initPixelGuestbook } from './guestbook.js';
import { initLoFiPlayer } from './lofiPlayer.js';
import { initAnimations } from './animations.js';

gsap.registerPlugin(ScrollTrigger);

// ── Smooth Inertia Scroll (Lenis) ─────────────────────────────────────
let lenis;
try {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch (e) {
  console.warn('Lenis initialized with fallback');
}

// ── Document Ready ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateHeroAndMeta();

  // Initialize interactive engines
  initParticles('cyberCanvas');
  initAnimations();
  initCommandPalette(CONFIG);
  initAiAssistant(CONFIG);
  initProjectInspector(CONFIG.projects);
  initAndroidSimulator();
  initGithubGraph();
  initPixelGuestbook();
  initLoFiPlayer();

  // Core UI interactions
  initThemeSwitch();
  initSoundButton();
  initClock();
  initRotator();
  initSpatialHorizontalShowcase();
  initRibbons();
  initBentoInteractions();
  initContactForm();
  initToast();

  initScrollAnimations();
  initLuxuryInteractions();
  document.body.classList.add('ready');
});

// ── Populate Hero & Meta ──────────────────────────────────────────────
function populateHeroAndMeta() {
  const brandName = document.getElementById('navBrandName');
  if (brandName) brandName.textContent = CONFIG.name;

  const heroName = document.getElementById('heroName');
  if (heroName) heroName.textContent = CONFIG.firstName;

  const heroKicker = document.getElementById('heroKickerText');
  if (heroKicker) heroKicker.textContent = `${CONFIG.name} · ${CONFIG.role}`;

  const heroBio = document.getElementById('heroBio');
  if (heroBio) heroBio.textContent = CONFIG.bio;

  const statusBadge = document.getElementById('heroStatusBadge');
  if (statusBadge) statusBadge.textContent = CONFIG.statusBadge;
}

// ── Hero Rotator Words ────────────────────────────────────────────────
function initRotator() {
  const rotWord = document.getElementById('rotWord');
  if (!rotWord) return;

  const words = CONFIG.rotatorWords;
  let idx = 0;

  setInterval(() => {
    rotWord.classList.add('out');
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      rotWord.textContent = words[idx];
      rotWord.classList.remove('out');
      rotWord.classList.add('in');
      setTimeout(() => rotWord.classList.remove('in'), 50);
    }, 380);
  }, 2600);
}

// ── Live Clock & Timezone ─────────────────────────────────────────────
function initClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  const update = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      timeZone: CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };
  update();
  setInterval(update, 1000);
}

// ── 02 // SPATIAL 3D HORIZONTAL SHOWCASE — TANMAY DAFE ─────────────────
function initSpatialHorizontalShowcase() {
  const container = document.getElementById('spatialHscroll');
  const pin = document.getElementById('spatialPin');
  const track = document.getElementById('spatialTrack');
  const viewport = document.getElementById('spatialViewport');
  const hudDomain = document.getElementById('spatialActiveDomain');
  const capsules = document.querySelectorAll('.spatial-capsule');
  const scrubFill = document.getElementById('spatialScrubFill');
  const currNum = document.getElementById('spatialCurrentNum');
  const totalNum = document.getElementById('spatialTotalNum');
  const prevBtn = document.getElementById('spatialPrevBtn');
  const nextBtn = document.getElementById('spatialNextBtn');

  if (!container || !track) return;

  let activeCat = 'all';
  let scrollTriggerInstance = null;

  const renderCards = () => {
    // Clean up previous ScrollTrigger instance if any
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
      gsap.set(track, { clearProps: 'all' });
    }

    const filtered = activeCat === 'all'
      ? CONFIG.projects
      : CONFIG.projects.filter(p => p.cat.toLowerCase() === activeCat.toLowerCase());

    if (totalNum) {
      totalNum.textContent = String(filtered.length).padStart(2, '0');
    }

    track.innerHTML = filtered.map((p, idx) => `
      <article class="spatial-card glass" data-id="${p.id}" data-cat="${p.cat}" data-domain="${p.domainBadge || p.cat}">
        <div class="sc-preview">
          <div class="sc-browser-bar font-mono">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="sc-url">${p.live ? p.live.replace(/^https?:\/\//, '') : 'github.com/tanmaydafe/' + p.id}</span>
            ${p.live ? '<span class="sc-live-pill font-mono"><span class="pulse-dot"></span> LIVE DEPLOYED</span>' : ''}
          </div>
          <div class="sc-img-container">
            <img src="${p.shot}" alt="${p.name}" class="sc-img" loading="lazy" />
            <div class="sc-overlay-hologram">
              <button type="button" class="btn btn-accent btn-sm" onclick="window.inspectProject('${p.id}')">
                <span>Inspect Blueprint</span> ↗
              </button>
            </div>
          </div>
        </div>

        <div class="sc-body">
          <div class="sc-meta font-mono">
            <span class="sc-domain-badge">${p.domainBadge || p.cat}</span>
            <span class="sc-year">${p.year}</span>
          </div>

          <h3 class="sc-title">${p.name}</h3>
          <p class="sc-headline">${p.headline}</p>
          <p class="sc-desc">${p.desc}</p>

          <div class="sc-telemetry-pill font-mono">
            <span>⚡</span>
            <span>${p.metrics}</span>
          </div>

          <div class="sc-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>

          <div class="sc-actions">
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm"><span class="pulse-dot"></span> Live Site ↗</a>` : ''}
            <button type="button" class="btn btn-glass btn-sm" onclick="window.inspectProject('${p.id}')">System Blueprint ↗</button>
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm font-mono">GitHub ↗</a>
          </div>
        </div>
      </article>
    `).join('');

    setupSpatialInteraction(filtered);
  };

  const setupSpatialInteraction = (currentProjects) => {
    const cards = Array.from(track.querySelectorAll('.spatial-card'));
    if (!cards.length) return;

    // Linear/Stripe style dynamic mouse spotlight inside each card
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    // Desktop GSAP Pin & Scrub (window.innerWidth >= 900)
    if (window.innerWidth >= 900 && pin) {
      const getScrollDist = () => {
        const trackWidth = track.scrollWidth;
        const viewWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewWidth + 240);
      };

      const hTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 1.8, getScrollDist() * 1.2)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (scrubFill) {
              scrubFill.style.transform = `scaleX(${Math.max(0.1, progress)})`;
            }

            const screenCenter = window.innerWidth / 2;
            let closestCard = null;
            let minDiff = Infinity;
            let closestIdx = 0;

            cards.forEach((card, idx) => {
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.left + rect.width / 2;
              const diff = cardCenter - screenCenter;
              const absDiff = Math.abs(diff);

              if (absDiff < minDiff) {
                minDiff = absDiff;
                closestCard = card;
                closestIdx = idx;
              }

              // Dynamic 3D Spatial Curvature scrub (Obsidian-Emerald styling)
              const norm = diff / (window.innerWidth * 0.55);
              const clamped = Math.max(-1.5, Math.min(1.5, norm));
              const rotY = clamped * -14;
              const transZ = Math.abs(clamped) * -65;
              const scale = 1 - Math.abs(clamped) * 0.05;
              const opacity = 1 - Math.abs(clamped) * 0.28;

              card.style.transform = `perspective(1200px) rotateY(${rotY.toFixed(2)}deg) translateZ(${transZ.toFixed(1)}px) scale(${scale.toFixed(3)})`;
              card.style.opacity = Math.max(0.4, opacity).toFixed(3);

              if (absDiff < rect.width * 0.45) {
                card.classList.add('is-focused');
              } else {
                card.classList.remove('is-focused');
              }
            });

            if (closestCard) {
              if (currNum) currNum.textContent = String(closestIdx + 1).padStart(2, '0');
              if (hudDomain && closestCard.dataset.domain) {
                hudDomain.textContent = closestCard.dataset.domain;
              }
            }
          }
        }
      });

      scrollTriggerInstance = hTween.scrollTrigger;
    } else {
      // Mobile / tablet touch handling: update HUD on scroll
      if (viewport) {
        viewport.addEventListener('scroll', () => {
          const scrollLeft = viewport.scrollLeft;
          const maxScroll = viewport.scrollWidth - viewport.clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          if (scrubFill) scrubFill.style.transform = `scaleX(${Math.max(0.1, progress)})`;

          const vpCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
          let closestIdx = 0;
          let minDiff = Infinity;
          let closestCard = null;

          cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const diff = Math.abs(center - vpCenter);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
              closestCard = card;
            }
          });

          if (currNum) currNum.textContent = String(closestIdx + 1).padStart(2, '0');
          if (hudDomain && closestCard?.dataset.domain) {
            hudDomain.textContent = closestCard.dataset.domain;
          }
        }, { passive: true });
      }
    }
  };

  // Category filter capsules
  capsules.forEach(cap => {
    cap.addEventListener('click', () => {
      capsules.forEach(c => c.classList.remove('is-active'));
      cap.classList.add('is-active');
      activeCat = cap.getAttribute('data-cat') || 'all';
      sound.playClick();
      renderCards();
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });
  });

  // Prev / Next arrow controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      sound.playClick();
      if (window.innerWidth >= 900 && scrollTriggerInstance) {
        const step = (scrollTriggerInstance.end - scrollTriggerInstance.start) / Math.max(1, CONFIG.projects.length);
        const target = Math.max(scrollTriggerInstance.start, window.scrollY - step);
        if (lenis) lenis.scrollTo(target);
        else window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (viewport) {
        viewport.scrollBy({ left: -360, behavior: 'smooth' });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sound.playClick();
      if (window.innerWidth >= 900 && scrollTriggerInstance) {
        const step = (scrollTriggerInstance.end - scrollTriggerInstance.start) / Math.max(1, CONFIG.projects.length);
        const target = Math.min(scrollTriggerInstance.end, window.scrollY + step);
        if (lenis) lenis.scrollTo(target);
        else window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (viewport) {
        viewport.scrollBy({ left: 360, behavior: 'smooth' });
      }
    });
  }

  // Keyboard arrow glide
  window.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowRight') {
        nextBtn?.click();
      } else if (e.key === 'ArrowLeft') {
        prevBtn?.click();
      }
    }
  });

  // Window resize handler to refresh ScrollTrigger
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderCards();
    }, 250);
  });

  renderCards();
}

// ── 3D Card Hover Perspective ─────────────────────────────────────────
function init3DTilt() {
  const cards = document.querySelectorAll('.card-tilt-3d');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// ── Marquee Ribbons ───────────────────────────────────────────────────
function initRibbons() {
  const rA = document.getElementById('ribbonTrackA');
  const rB = document.getElementById('ribbonTrackB');
  if (!rA || !rB) return;

  const buildRun = (items) => {
    const content = items.map(t => `<span class="rb-item">${t}</span><span class="rb-star">✦</span>`).join('');
    return `<div class="rb-run">${content}</div><div class="rb-run" aria-hidden="true">${content}</div>`;
  };

  rA.innerHTML = buildRun(CONFIG.stackRibbons.ribbonA);
  rB.innerHTML = buildRun(CONFIG.stackRibbons.ribbonB);
}

// ── Bento Grid Interactions ───────────────────────────────────────────
function initBentoInteractions() {
  // Education Timeline
  const eduContainer = document.getElementById('bentoEduList');
  if (eduContainer) {
    eduContainer.innerHTML = CONFIG.education.map(e => `
      <div class="tl-item ${e.isCurrent ? 'is-current' : ''}">
        <div class="tl-when">${e.when}</div>
        <div class="tl-degree">${e.degree}</div>
        <div class="tl-inst">${e.institution}</div>
        <div class="tl-details">${e.details}</div>
      </div>
    `).join('');
  }

  // Work Experience / Internships
  const expContainer = document.getElementById('bentoExpList');
  if (expContainer) {
    expContainer.innerHTML = CONFIG.experience.map(e => `
      <div class="tl-item ${e.isCurrent ? 'is-current' : ''}">
        <div class="tl-when">${e.when}</div>
        <div class="tl-degree">${e.role}</div>
        <div class="tl-inst text-accent">${e.company}</div>
        <div class="tl-details">${e.details}</div>
      </div>
    `).join('');
  }

  // Certifications List
  const certContainer = document.getElementById('bentoCertList');
  if (certContainer) {
    certContainer.innerHTML = CONFIG.certifications.map(c => `
      <div class="ach-badge">
        <span class="ach-icon">${c.icon}</span>
        <div>
          <div class="ach-title">${c.title}</div>
          <div class="ach-org">${c.issuer} · ${c.period}</div>
        </div>
      </div>
    `).join('');
  }

  // Engineering Principles
  const princContainer = document.getElementById('principlesGrid');
  if (princContainer) {
    princContainer.innerHTML = CONFIG.principles.map(p => `
      <article class="principle-card glass">
        <span class="principle-num">${p.num}</span>
        <h3 class="principle-title">${p.title}</h3>
        <p class="principle-desc">${p.desc}</p>
      </article>
    `).join('');
  }
}

// ── Contact Form & Direct Copy ────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  const copyBtn = document.getElementById('copyEmailBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CONFIG.email).then(() => {
        window.showToast?.(`Copied ${CONFIG.email} to clipboard!`);
        sound.playChime();
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sound.playChime();
      window.showToast?.('Message sent! Tanmay will get in touch shortly.');
      form.reset();
    });
  }
}

// ── Toast System ──────────────────────────────────────────────────────
function initToast() {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  window.showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3400);
  };
}

// ── Theme Switch ──────────────────────────────────────────────────────
function initThemeSwitch() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio_theme', next);
    sound.playClick();
  };

  if (themeBtn) themeBtn.addEventListener('click', toggle);
  window.toggleThemeMode = toggle;
}

// ── Sound Toggle ──────────────────────────────────────────────────────
function initSoundButton() {
  const btn = document.getElementById('soundToggleBtn');
  if (!btn) return;

  const update = (active) => {
    btn.classList.toggle('is-on', active);
    btn.setAttribute('title', active ? 'Sound FX On' : 'Sound FX Muted');
  };

  btn.addEventListener('click', () => {
    const active = sound.toggleSound();
    update(active);
    window.showToast?.(active ? 'Sound FX Enabled' : 'Sound FX Muted');
  });

  window.toggleSoundFx = () => {
    const active = sound.toggleSound();
    update(active);
  };

  update(!sound.isMuted());
}

// ── Ultra-Luxury Micro-Interactions (Spotlight, Custom Cursor, Magnetic Buttons) ──
function initLuxuryInteractions() {
  const spotlight = document.getElementById('cursorSpotlight');
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

  let mouseX = -500;
  let mouseY = -500;
  let ringX = -500;
  let ringY = -500;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      if (spotlight) spotlight.style.opacity = '1';
    }

    if (dot) {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    if (spotlight) {
      spotlight.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  }, { passive: true });

  // Smooth lerp animation for outer luxury ring
  const updateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    if (ring) {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    requestAnimationFrame(updateRing);
  };
  requestAnimationFrame(updateRing);

  // Hover state detection on interactive targets
  const hoverTargets = 'a, button, .btn, .spatial-card, .sim-phone-tab, .magnetic-element, input, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Magnetic Button Effect
  const magneticEls = document.querySelectorAll('.magnetic-element');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

// ── GSAP Scroll Reveals ───────────────────────────────────────────────
function initScrollAnimations() {
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  });
}

