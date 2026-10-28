/**
 * ==============================================================================
 * 💻 IN-BROWSER INTERACTIVE DEVELOPER CLI TERMINAL
 * ==============================================================================
 * Functional developer terminal emulator for Tanmay Dafe's portfolio.
 * Supports commands: help, skills, projects, edu, bio, resume, contact, clear.
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initDeveloperTerminal(config) {
  const terminalInput = document.getElementById('termInput');
  const terminalOutput = document.getElementById('termOutput');
  if (!terminalInput || !terminalOutput) return;

  const history = [];
  let historyIdx = 0;

  const commands = {
    help: () => `
Available Commands:
  <span class="text-accent">projects</span>    - List Tanmay's production Android & web projects
  <span class="text-accent">skills</span>      - Display technical matrix & tools
  <span class="text-accent">experience</span>  - Mountreach Solutions internship details
  <span class="text-accent">education</span>   - B.Tech (SVPCET 8.2 CGPA) & Diploma (81.14%)
  <span class="text-accent">resume</span>      - Download verified resume (PDF)
  <span class="text-accent">contact</span>     - Show direct email and phone number
  <span class="text-accent">clear</span>       - Clear terminal window
`,
    projects: () => `
<strong class="text-accent">PRODUCTIONS & INTERNSHIP PROJECTS:</strong>
1. <span class="text-accent">E-Learning Android App</span> [Mountreach Solutions]
   - Stack: Kotlin, Java, XML, PHP, MySQL, REST APIs
   - Features: Video streaming, course catalog, progress tracker
2. <span class="text-accent">WhatsApp Clone Application</span> [Mountreach Solutions]
   - Stack: Java, Kotlin, XML, Firebase Realtime, Material 3
   - Features: User auth, instant messaging, chat bubble UI
3. <span class="text-accent">Correspondence & Official Records System</span>
   - Stack: PHP, MySQL, JavaScript, HTML5, CSS3
   - Features: Official document tracking, dispatch ledger, analytics
`,
    skills: () => `
<strong class="text-accent">TECHNICAL STACK:</strong>
• Languages: Java, Kotlin, Advance Java, C, C++, Python, PHP, JavaScript, SQL
• Mobile: Android Studio, XML Layouts, Material Design 3, Coroutines, Room DB
• Web & DB: REST APIs, MySQL, HTML5, CSS3, JSON, Bootstrap
• Tools: Git, GitHub, VS Code, Google Colab, Linux
• Communication: English, Hindi, Marathi
`,
    experience: () => `
<strong class="text-accent">WORK EXPERIENCE & INTERNSHIPS:</strong>
1. <span class="text-accent">Full Stack Developer (Android) Intern</span>
   Mountreach Solutions Pvt. Ltd. | Jun 2026 – Present
   - Building E-learning mobile application with Kotlin, Java, PHP & MySQL.
2. <span class="text-accent">Android Application Development Intern</span>
   Mountreach Solutions Pvt. Ltd., Amravati (Remote)
   - Developed full WhatsApp Clone application in Android Studio.
`,
    education: () => `
<strong class="text-accent">ACADEMIC FOUNDATION:</strong>
• <span class="text-accent">B.Tech in Information Technology</span> (2024 – 2027)
  St. Vincent Pallotti College of Engineering & Technology, Nagpur | CGPA: 8.2
• <span class="text-accent">Diploma in Computer Engineering</span> (2021 – 2024)
  Government Polytechnic, Arvi, Wardha | 81.14% Distinction
• <span class="text-accent">Secondary (X)</span> (2021)
  Municipal High School & Jr. College of Science, Arvi | 87.65%
`,
    contact: () => `
<strong class="text-accent">DIRECT CONTACT:</strong>
• Email: <a href="mailto:${config.email}" class="term-link">${config.email}</a>
• Phone: <a href="tel:${config.phone}" class="term-link">${config.phone}</a>
• Location: ${config.location}
• Status: Available for Android & Software Engineering Roles
`,
    resume: () => {
      const a = document.createElement('a');
      a.href = config.resumeUrl;
      a.download = 'Tanmay_Dafe_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return `<span class="text-accent">✓ Initiated download of Tanmay_Dafe_Resume.pdf!</span>`;
    },
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  const handleCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.push(raw);
    historyIdx = history.length;

    sound.playClick();

    // Print command line
    terminalOutput.innerHTML += `
      <div class="term-cmd-row">
        <span class="term-prompt">tanmay@svpcet:~$</span>
        <span class="term-entered">${escapeHtml(raw)}</span>
      </div>
    `;

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        terminalOutput.innerHTML += `<div class="term-res">${result}</div>`;
      }
    } else {
      terminalOutput.innerHTML += `
        <div class="term-res text-muted">
          Command not found: "${escapeHtml(raw)}". Type <span class="text-accent">help</span> for available commands.
        </div>
      `;
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIdx > 0) {
        historyIdx--;
        terminalInput.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        terminalInput.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        terminalInput.value = '';
      }
    }
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
