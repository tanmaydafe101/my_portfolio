/**
 * ==============================================================================
 * 🚀 TANMAY DAFE — PORTFOLIO CONFIGURATION (ANDROID + WEB + AI)
 * ==============================================================================
 * Multi-disciplinary engineering profile covering:
 * 1. Native Mobile (Android / Kotlin / Java)
 * 2. Full-Stack Web (Smart Campus [Live at smartcampus.site], PHP, MySQL, JS)
 * 3. Applied AI & Data Analytics (Python, Gemini API, PyTorch, Algorithms)
 * ==============================================================================
 */

export const CONFIG = {
  // ── Profile Information ──────────────────────────────────────────────
  name: "Tanmay Dafe",
  firstName: "Tanmay",
  role: "Full-Stack Engineer · Android, Web & AI Systems",
  tagline: "Architecting native Android applications, production web platforms, and applied AI systems.",
  bio: "B.Tech Information Technology student at St. Vincent Pallotti College of Engineering & Technology, Nagpur (CGPA 8.2). Experienced in native Android engineering (Java & Kotlin), production web deployment (smartcampus.site, PHP, MySQL), and applied AI architectures (Python, Gemini API & Data Analytics). Full-Stack Android Intern at Mountreach Solutions.",
  location: "Nagpur, Maharashtra",
  timezone: "Asia/Kolkata",
  phone: "+91 9175181390",
  email: "tanmaydafe855@gmail.com",
  statusBadge: "Available for Android, Full-Stack & AI Roles",
  githubUrl: "https://github.com/",
  linkedinUrl: "https://linkedin.com/",
  resumeUrl: "/Tanmay_Dafe_Resume.pdf",
  avatarUrl: "/img/avatar.jpg",

  // ── Hero Rotator Words ────────────────────────────────────────────────
  rotatorWords: [
    "Android apps.",
    "Full-Stack web.",
    "AI systems.",
    "smartcampus.site.",
    "scalable APIs."
  ],

  // ── Key Metrics & Stats ───────────────────────────────────────────────
  stats: [
    { value: "8.2", label: "B.Tech CGPA at SVPCET", em: "academics" },
    { value: "Live", label: "smartcampus.site Deployed", em: "production" },
    { value: "3 Domains", label: "Android · Web · Applied AI", em: "tri-stack" },
    { value: "81.1%", label: "Diploma in Computer Engineering", em: "distinction" }
  ],

  // ── Featured Production Systems / Highlights ──────────────────────────
  flagshipHighlight: {
    badge: "Live Deployed at smartcampus.site.je · Full-Stack Platform",
    title: "Smart Campus <em>Issue & Facility Portal</em>",
    company: "smartcampus.site.je",
    subtitle: "A centralized digital portal for reporting, tracking, and resolving campus facility, Wi-Fi, classroom, and electrical problems with Student and Admin portals.",
    points: [
      {
        title: "Live Cloud Deployment (smartcampus.site.je)",
        desc: "Publicly deployed and accessible at smartcampus.site.je/?i=1 with SSL security, real-time issue status tracking, and sub-100ms asset delivery."
      },
      {
        title: "Dual Portals: Student & Admin Dashboard",
        desc: "Dedicated Student Portal for instant complaint logging and Admin Dashboard for workflow status updates, technician assignment, and CSV exports."
      },
      {
        title: "Synchronized Native Android Application",
        desc: "Integrated with native Android app (Java + XML) in SmartCampus/android-app/ for mobile push notifications and real-time field diagnostics."
      }
    ],
    links: [
      { text: "Visit smartcampus.site.je ↗", url: "https://smartcampus.site.je/?i=1", primary: true },
      { text: "Launch Interactive Simulator ⚡", url: "#simulator", primary: false }
    ]
  },

  // ── Projects Showcase (Android + Web + AI) ─────────────────────────────
  projects: [
    {
      id: "smartcampus-site",
      name: "Smart Campus - Issue & Facility Portal",
      cat: "Web",
      domainBadge: "Full-Stack Web · Live Deployed 🚀",
      year: "2026",
      headline: "Centralized university issue management portal for reporting Wi-Fi, classroom, electrical problems with student & admin portals.",
      desc: "Live deployed at https://smartcampus.site.je/?i=1. Engineered with dual portal architecture (Student Sign In & Administrator Dashboard), real-time issue resolution tracking, MySQL database, and coupled with a native Android client (Java + XML).",
      tags: ["Full-Stack Web", "PHP", "MySQL", "JavaScript", "Bootstrap 5", "HTML5", "CSS3", "Live Deployed"],
      metrics: "Live at smartcampus.site.je · 100% Uptime",
      live: "https://smartcampus.site.je/?i=1",
      github: "https://github.com/",
      shot: "/img/project_smartcampus.svg",
      arch: {
        title: "Smart Campus Cloud Architecture",
        flow: "Cloud Hosting / SSL ➔ Apache Web Server ➔ PHP Session Controller ➔ MySQL Relational DB (Complaints, Users, Roles) ➔ Student/Admin Dashboards & Android Client",
        latency: "75ms edge load",
        models: ["smartcampus.site.je", "PHP 8.2", "MySQL 8.0", "Bootstrap 5"]
      }
    },
    {
      id: "correspondence-system",
      name: "Inward & Outward Correspondence System",
      cat: "Web",
      domainBadge: "Institutional Web · Govt Polytechnic 🏛️",
      year: "2024",
      headline: "Official institutional letter & document tracking portal digitizing inward and outward dispatch workflows.",
      desc: "Architected and deployed for Government Polytechnic to completely replace manual paper ledgers. Features dynamic search, instant barcode/token generation, department routing, PDF export, and role-based staff authentication.",
      tags: ["Government Polytechnic", "PHP 8.2", "MySQL 8.0", "JavaScript", "REST APIs", "Bootstrap 5", "Digitized Records"],
      metrics: "100% Zero Document Loss · 1,200+ Letters Digitized",
      github: "https://github.com/",
      shot: "/img/project_correspondence.jpg",
      arch: {
        title: "Enterprise Document Tracking Pipeline",
        flow: "Dispatch Desk ➔ Document Intake Form ➔ Barcode/ID Generator ➔ MySQL Normalized Ledger ➔ Department Routing Notification ➔ Archive",
        latency: "Instant SQL Querying",
        models: ["PHP PDO Prepared Statements", "Indexed MySQL 8.0", "Digital Barcode Generator"]
      }
    },
    {
      id: "elearning-app",
      name: "E-Learning Android Ecosystem",
      cat: "Android",
      domainBadge: "Mobile · Android Native",
      year: "2026",
      headline: "Comprehensive educational Android application with course catalog, video streaming, and student progress telemetry.",
      desc: "Developed during Full-Stack Developer internship at Mountreach Solutions Pvt. Ltd. Features user authentication, structured course modules, video lesson rendering, quiz engine, and MySQL backend communication via optimized REST endpoints.",
      tags: ["Kotlin", "Java", "Android Studio", "XML", "PHP", "MySQL", "REST APIs"],
      metrics: "Sub-120ms API Latency · Full Offline Course Cache",
      github: "https://github.com/",
      shot: "/img/project_elearning.jpg",
      arch: {
        title: "E-Learning Native Mobile Pipeline",
        flow: "Android Client (Kotlin) ➔ Retrofit HTTP Client ➔ Token-Auth Gateway ➔ PHP REST API Controller ➔ MySQL Database ➔ Video Stream Cache",
        latency: "120ms API response",
        models: ["Kotlin Coroutines", "Room Database", "Retrofit2"]
      }
    },
    {
      id: "ai-assistant-doc",
      name: "Intelligent Document AI & RAG Copilot",
      cat: "AI",
      domainBadge: "AI & Machine Learning",
      year: "2026",
      headline: "Smart document summarization and question-answering AI engine powered by Python and LLM embeddings.",
      desc: "An applied AI tool that ingests long institutional documents, extracts semantic chunks using Python & LangChain, and generates grounded instant answers with zero hallucinations via Gemini API and cosine vector similarity.",
      tags: ["Python", "Gemini API", "PyTorch", "FastAPI", "Vector Search", "Pandas"],
      metrics: "96.4% Answer Precision · Sub-400ms Retrieval",
      github: "https://github.com/",
      shot: "/img/project_correspondence.jpg",
      arch: {
        title: "Document Ingestion & RAG Loop",
        flow: "PDF/Doc Ingestion ➔ Recursive Chunking ➔ Semantic Vector Embeddings ➔ Cosine Similarity Search ➔ Gemini 1.5 Synthesis ➔ Grounded Answer",
        latency: "380ms",
        models: ["Gemini 1.5 Pro", "Sentence-Transformers", "FastAPI"]
      }
    },
    {
      id: "whatsapp-clone",
      name: "WhatsApp Clone Messenger",
      cat: "Android",
      domainBadge: "Mobile · Android Native",
      year: "2026",
      headline: "High-fidelity real-time chat application with authentication, instant messaging, and responsive Material 3 UI.",
      desc: "Built as an Android Application Development project at Mountreach Solutions. Implements phone & email authentication, one-to-one messaging, status updates, voice message player UI, and smooth RecyclerView layout rendering.",
      tags: ["Java", "Kotlin", "Android Studio", "Firebase", "XML", "Material 3"],
      metrics: "Real-time Message Sync · 60 FPS Smooth Scroll",
      github: "https://github.com/",
      shot: "/img/project_whatsapp.jpg",
      arch: {
        title: "Real-Time WebSocket & Push Architecture",
        flow: "Android UI ➔ ViewModel & LiveData ➔ Firebase Realtime WebSocket ➔ Local SQLite Cache ➔ Message Queue Dispatcher",
        latency: "45ms message broadcast",
        models: ["Firebase Auth", "Realtime Database", "ExoPlayer Audio"]
      }
    }
  ],

  // ── Technical Stack Matrix (Divided into 3 Pillars) ───────────────────
  stackMatrix: [
    {
      category: "1. Native Android & Mobile",
      skills: ["Kotlin", "Java", "Advance Java", "Android Studio", "XML Layouts", "Material Design 3", "Room DB", "Retrofit", "Coroutines"]
    },
    {
      category: "2. Full-Stack Web & Cloud",
      skills: ["smartcampus.site", "PHP", "JavaScript", "HTML5", "CSS3", "MySQL", "RESTful APIs", "Cloud Hosting", "Bootstrap", "Git & GitHub"]
    },
    {
      category: "3. Applied AI, ML & Data Analytics",
      skills: ["Python", "Gemini API", "Data Analytics (AICTE)", "Algorithms (IIT Madras)", "Pandas", "NumPy", "Google Colab", "C / C++"]
    }
  ],

  // ── Marquee Ribbons ──────────────────────────────────────────────────────
  stackRibbons: {
    ribbonA: [
      "smartcampus.site", "Kotlin", "Java", "Android Studio", "PHP", "MySQL", "Python",
      "Gemini API", "REST APIs", "Advance Java", "Retrofit", "Vector Search"
    ],
    ribbonB: [
      "Full-Stack Web", "JavaScript", "HTML5 & CSS3", "Data Analytics", "IIT Madras Algorithms",
      "Git & GitHub", "C++", "XML Layouts", "Room DB", "Linux", "FastAPI"
    ]
  },

  // ── Education (From Verified Resume) ────────────────────────────────────
  education: [
    {
      when: "2024 — 2027",
      degree: "Bachelor of Technology (B.Tech) — Information Technology",
      institution: "St. Vincent Pallotti College of Engineering & Technology, Nagpur",
      details: "Current CGPA: 8.2 / 10 · Core focus on Software Engineering, Android Architectures, Web Development, and Algorithm Design.",
      badge: "CGPA 8.2 · In Progress",
      isCurrent: true
    },
    {
      when: "2021 — 2024",
      degree: "Diploma in Computer Engineering",
      institution: "Government Polytechnic, Arvi, Wardha",
      details: "Secured 81.14% with Distinction · Built the institutional Correspondence Management System. Mastered fundamental algorithms, C/C++, Java, and Relational Databases.",
      badge: "81.14% Distinction",
      isCurrent: false
    },
    {
      when: "2021",
      degree: "Secondary School Certificate (Class X)",
      institution: "Municipal High School and Jr. College of Science, Arvi, Wardha",
      details: "Secured 87.65% with top percentile in Mathematics and Science.",
      badge: "87.65% Distinction",
      isCurrent: false
    }
  ],

  // ── Work Experience & Internships ───────────────────────────────────────
  experience: [
    {
      when: "Jun 2026 — Present",
      role: "Full Stack Developer (Android) Intern",
      company: "Mountreach Solutions Pvt. Ltd.",
      details: "Developing an E-Learning Android Application using Java, Kotlin, XML, PHP, MySQL, and REST APIs. Implementing user authentication, course video streaming, and backend synchronization.",
      isCurrent: true
    },
    {
      when: "2025 — 2026",
      role: "Android Application Development Intern",
      company: "Mountreach Solutions Pvt. Ltd., Amravati (Remote)",
      details: "Engineered a native WhatsApp Clone application focusing on clean Material 3 UI design, real-time messaging, and media attachments using Java, Kotlin, and XML in Android Studio.",
      isCurrent: false
    }
  ],

  // ── Verified Certifications ─────────────────────────────────────────────
  certifications: [
    {
      title: "Design and Analysis of Algorithms",
      issuer: "IIT Madras (NPTEL)",
      period: "Jul – Sep 2025",
      domain: "Computer Science & AI",
      icon: "🏛️"
    },
    {
      title: "Android Developer Virtual Internship",
      issuer: "EduSkills (AICTE Approved)",
      period: "Jan – Mar 2026",
      domain: "Mobile Engineering",
      icon: "📱"
    },
    {
      title: "Data Analytics Virtual Internship",
      issuer: "EduSkills (AICTE Approved)",
      period: "Jul – Sep 2025",
      domain: "Data & Machine Learning",
      icon: "📊"
    }
  ],

  // ── Engineering Philosophy ──────────────────────────────────────────────
  principles: [
    {
      num: "01",
      title: "Native Mobile First",
      desc: "Native Kotlin & Java deliver unparalleled responsiveness, battery efficiency, and hardware sensor control compared to web wrappers."
    },
    {
      num: "02",
      title: "Live Production Deployment",
      desc: "Building a project locally is only half the job. Deploying live platforms like smartcampus.site with real users, SSL, and domain routing tests true engineering maturity."
    },
    {
      num: "03",
      title: "Intelligent AI Augmentation",
      desc: "Modern applications shouldn't be passive forms. Integrating Gemini and semantic search transforms static software into proactive, intelligent companions."
    },
    {
      num: "04",
      title: "Clean Architecture (MVVM & SOLID)",
      desc: "Strict separation between UI layers, ViewModels, business logic, and repository data sources keeps large production codebases maintainable."
    }
  ],

  // ── Interactive AI Copilot Knowledge Base ──────────────────────────────
  aiBot: {
    systemPrompt: "You are Tanmay Dafe's AI Engineering Copilot.",
    initialGreeting: "👋 Hi! I'm Tanmay's AI Assistant. Ask me anything about Tanmay's deployed website (smartcampus.site), Android apps (Kotlin/Java), full-stack web platforms, applied AI tools, or his Mountreach Solutions internship!",
    quickPrompts: [
      "Tell me about smartcampus.site",
      "Inward & Outward Correspondence System?",
      "What Android apps has he built?",
      "How to contact Tanmay for internships/jobs?"
    ],
    answers: [
      {
        keywords: ["inward", "outward", "correspondence", "polytechnic", "letters", "dispatch", "government"],
        text: "Tanmay engineered the **Inward & Outward Correspondence System** for Government Polytechnic! It digitized over 1,200+ paper records, replacing manual ledger books with real-time barcode tracking, department routing, and instant SQL query lookups with 100% zero document loss."
      },
      {
        keywords: ["smartcampus", "deployed", "live", "site", "web"],
        text: "Tanmay engineered and deployed **smartcampus.site** — a live production university management platform! It features secure student/admin authentication, academic record management, and cloud deployment. You can visit it live at **https://smartcampus.site**!"
      },
      {
        keywords: ["android", "mobile", "kotlin", "elearning", "whatsapp"],
        text: "Tanmay specializes in native Android development using **Kotlin, Java, XML, and Android Studio**. Key projects include the **E-Learning Android Ecosystem** (built during his Mountreach Solutions internship with video streaming and progress tracking) and a real-time **WhatsApp Clone** with live chat!"
      },
      {
        keywords: ["ai", "machine learning", "python", "data", "analytics", "gemini"],
        text: "Tanmay integrates AI and Data Analytics into production systems using **Python, Gemini LLM APIs, and Pandas**. He holds a verified certification in **Data Analytics from AICTE (EduSkills)** and **Algorithms from IIT Madras (NPTEL)**!"
      },
      {
        keywords: ["internship", "mountreach", "experience", "work"],
        text: "Tanmay is currently a **Full-Stack Android Developer Intern at Mountreach Solutions Pvt. Ltd.**, building full-stack Android applications with Kotlin, Java, PHP REST microservices, and MySQL. He previously built a real-time messaging clone!"
      },
      {
        keywords: ["hire", "contact", "email", "phone", "resume"],
        text: "Tanmay is actively open to **Android, Full-Stack Web, and Software Engineering Roles**! You can email him at **tanmaydafe855@gmail.com**, call **+91 9175181390**, or download his official resume directly from this site!"
      }
    ],
    defaultReply: "Tanmay is a versatile engineer skilled in Android, Full-Stack Web (smartcampus.site), and Applied AI. Feel free to contact him directly at tanmaydafe855@gmail.com!"
  }
};
