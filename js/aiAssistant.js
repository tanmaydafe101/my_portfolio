/**
 * ==============================================================================
 * 🤖 INTERACTIVE AI COPILOT / AGENT ASSISTANT — TANMAY DAFE
 * ==============================================================================
 * Real-time token streaming chat assistant answering visitor questions
 * regarding Tanmay's Android apps, web platforms, AI architectures, and contact.
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initAiAssistant(config) {
  const modal = document.getElementById('aiAssistantModal');
  const chatLog = document.getElementById('aiChatLog');
  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('aiSend');
  const quickPills = document.getElementById('aiQuickPills');
  const closeBtn = document.getElementById('aiClose');
  const triggerBtn = document.getElementById('aiTriggerBtn');

  if (!modal || !chatLog || !input) return;

  const aiData = config.aiBot;
  let isTyping = false;

  const openAi = () => {
    modal.classList.add('is-open');
    sound.playChime();
    if (chatLog.children.length === 0) {
      appendMessage('assistant', aiData.initialGreeting);
      renderQuickPills();
    }
    setTimeout(() => input.focus(), 100);
  };

  const closeAi = () => {
    modal.classList.remove('is-open');
  };

  const renderQuickPills = () => {
    if (!quickPills) return;
    quickPills.innerHTML = aiData.quickPrompts.map(p => `
      <button class="ai-pill" type="button">${escapeHtml(p)}</button>
    `).join('');

    quickPills.querySelectorAll('.ai-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isTyping) return;
        const query = btn.textContent.trim();
        handleUserQuery(query);
      });
    });
  };

  const appendMessage = (role, text) => {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${role === 'user' ? 'ai-user' : 'ai-agent'}`;

    const icon = role === 'user' ? '👤' : '🤖';
    const author = role === 'user' ? 'You' : `${config.firstName}'s Copilot`;

    msg.innerHTML = `
      <div class="ai-avatar">${icon}</div>
      <div class="ai-bubble">
        <div class="ai-author">${author}</div>
        <div class="ai-text"></div>
      </div>
    `;

    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;

    const textContainer = msg.querySelector('.ai-text');

    if (role === 'assistant') {
      isTyping = true;
      streamText(textContainer, text, () => {
        isTyping = false;
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    } else {
      textContainer.textContent = text;
    }
  };

  const streamText = (el, text, onDone) => {
    const words = text.split(' ');
    let idx = 0;
    el.innerHTML = '';

    const interval = setInterval(() => {
      if (idx < words.length) {
        el.innerHTML += (idx > 0 ? ' ' : '') + formatMarkdown(words[idx]);
        idx++;
        chatLog.scrollTop = chatLog.scrollHeight;
        if (idx % 3 === 0) sound.playHover();
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, 28);
  };

  const handleUserQuery = (query) => {
    if (!query || isTyping) return;
    appendMessage('user', query);
    input.value = '';

    // Match query against knowledge base
    const lower = query.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (const item of aiData.answers) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) score += 2;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item.text;
      }
    }

    const reply = bestMatch || aiData.defaultReply;

    setTimeout(() => {
      appendMessage('assistant', reply);
    }, 350);
  };

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      handleUserQuery(input.value.trim());
    });
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserQuery(input.value.trim());
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeAi);
  if (triggerBtn) triggerBtn.addEventListener('click', openAi);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAi();
  });

  window.openAiCopilot = openAi;
}

function formatMarkdown(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
