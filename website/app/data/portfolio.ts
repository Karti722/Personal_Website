// Single source of truth for portfolio content.
// Consumed by the About/Skills/Experience/Projects/Certifications
// components AND by scripts/generate-portfolio-pdf.mjs, so the
// downloadable PDF always matches whatever is edited here.

export const PROFILE = {
  name: "Kartikeya Kumaria",
  role: "Full-Stack Software Developer — B.S. Computer Science, UC Santa Cruz",
  email: "kartikeyaku@gmail.com",
  linkedinUrl: "https://linkedin.com/in/kartikeya-kumaria",
  linkedinLabel: "linkedin.com/in/kartikeya-kumaria",
  githubUrl: "https://github.com/karti722",
  githubLabel: "github.com/karti722",
  photo: "/photos/karti.png",
};

export const UNIVERSITY = {
  name: "University of California, Santa Cruz",
  url: "https://www.ucsc.edu/",
};

export const ABOUT = {
  full: {
    before:
      "My name is Kartikeya Kumaria and I’m a driven software developer who has completed a Bachelor of Science in Computer Science from the ",
    after:
      ". What motivates me is turning ideas into something real, taking concepts from paper and developing them into fully functional applications with tools, experiences, and interfaces that make people’s lives easier. I enjoy working across the stack, designing clean and responsive front ends while building the logic that powers them. I value both the problem-solving side of engineering and the human side of collaboration, including brainstorming with others, learning from different perspectives, and iterating toward better solutions together. I am the kind of person who sticks with a challenge until it is solved, believes in learning by doing, and sees every project as an opportunity to grow. Above all, I want to create technology that feels thoughtful, software that not only works well but also connects with the people who use it.",
  },
  tldr: {
    before: "Full stack developer with a Computer Science degree from the ",
    after:
      ". I build software that turns ideas into real, usable applications. I enjoy working across the stack, creating clean and responsive front ends while developing the logic that powers them. I value problem-solving and collaboration, and I approach every project as an opportunity to learn and improve.",
  },
};

export type SkillCategory = {
  title: string;
  skills: string[];
  featured?: boolean;
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C", "C++"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Nest.js",
      "Express",
      "FastAPI",
      "Django REST Framework (DRF)",
      "Sequelize",
    ],
  },
  {
    title: "AI / ML",
    featured: true,
    skills: [
      "LLM APIs (Anthropic Claude)",
      "Retrieval-Augmented Generation (RAG)",
      "Embeddings",
      "AI Agents",
      "Model Context Protocol (MCP)",
      "Prompt Engineering",
      "Vector Databases (pgvector, HNSW)",
      "LLM Evaluation",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: ["Docker", "AWS", "GCP", "Azure", "Git", "GitHub", "CI/CD", "CodeQL"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firestore", "pgvector"],
  },
];

export type Job = {
  role: string;
  company: string;
  url: string;
  summaryPoints: string[];
  date: string;
};

export const JOBS: Job[] = [
  {
    role: "AI Enabler Apprentice",
    company: "Redminds",
    url: "https://rediminds.com/",
    summaryPoints: [
      "Shipped end-to-end features across a clinical case management platform, including a clinician due-date system, case notifications, and autosave for case review and editing.",
      "Enriched the case summary view with 39 additional database fields via two new reusable React components.",
      "Delivered mobile responsiveness across the entire platform in a 12-commit, 35-file pull request while maintaining CodeQL compliance.",
      "Partnered with the AI engineering team to integrate a FastAPI/Gemini microservice that auto-extracts structured data from uploaded clinical PDFs.",
    ],
    date: "Jan 12th, 2026 – July 10th, 2026",
  },
  {
    role: "Software Developer",
    company: "UCSC BLUEPRINT",
    url: "https://www.ucscblueprint.com/",
    summaryPoints: [
      "Built and deployed a volunteer registration mobile app (Expo, React Native) for a nonprofit arts center, cutting sign-up time 60% and lifting conversions 40%.",
      "Translated 12+ Figma components into responsive iOS/Android UI, improving cross-device compatibility by 95%.",
      "Integrated Firebase Firestore and Authentication with custom error handling, improving profile load times 30% and cutting failed logins 50%.",
      "Designed and launched YFIOB, a K–12 career-discovery web app with 100% test coverage, onboarding 5+ contributors.",
    ],
    date: "Feb 1st, 2024 – Feb 12th, 2026",
  },
  {
    role: "Full Stack Developer Intern",
    company: "PACR",
    url: "https://pacr.co/",
    summaryPoints: [
      "Integrated the backend Search API into 10+ frontend components, improving user engagement 25% and cutting query latency 35%.",
      "Built and documented 8+ React pages spanning login, registration, profile, and research search experiences.",
      "Automated environment setup, linting, and CI workflows with Node.js, MongoDB, Docker, and AWS, cutting new-developer onboarding time 50%.",
    ],
    date: "Jul 15th, 2025 – Dec 15th, 2025",
  },
  {
    role: "Webmaster",
    company: "CruzHacks 2025",
    url: "https://cruzhacks.com/",
    summaryPoints: [
      "Implemented Figma designs for the CruzHacks website, contributing to a 20% increase in task completion.",
      "Built 15+ reusable React components, cutting future development time by 30%.",
      "Led weekly team meetings, boosting collaboration by 25%.",
    ],
    date: "Oct 1st, 2024 – Apr 12th, 2025",
  },
  {
    role: "Backend Developer Intern",
    company: "SKYIT (Subsidiary of GBCS Group)",
    url: "https://skyit.services/",
    summaryPoints: [
      "Restored client onboarding functionality by cleaning null entries in MySQL and correcting CSV inputs.",
      "Developed a Django REST API endpoint to validate the authentication flow and verified database schema mappings.",
      "Onboarded 3 backend developer interns and reduced internal bug reports by 20%.",
    ],
    date: "Apr 1st, 2024 – Aug 15th, 2024",
  },
  {
    role: "Software Engineer Intern",
    company: "CodeDay",
    url: "https://labs.codeday.org/",
    summaryPoints: [
      "Implemented BTU conversion functionality for the Open Energy Dashboard, merging a public pull request.",
      "Built a JavaScript-based conversion engine for CSV energy data with Mocha.js unit and integration tests.",
      "Documented the implementation and testing process in a 12-page write-up on test-driven development.",
    ],
    date: "Oct 1st, 2023 – Dec 15th, 2023",
  },
];

export type ProjectBullet = string | { label: string; href: string };

export type Project = {
  name: string;
  url?: string;
  status: "Live" | "Prototype";
  dateRange: string;
  githubUrl?: string;
  summary: string;
  bullets: ProjectBullet[];
};

export const PROJECTS: Project[] = [
  {
    name: "AI Nexus - Full-Stack AI Engineering Learning Platform",
    url: "https://ai-nexus-textbook.com/",
    status: "Live",
    dateRange: "July 16th 2026 – July 23, 2026",
    githubUrl: "https://github.com/Karti722/ai-nexus",
    summary:
      "A full-stack, 10-chapter platform teaching AI engineering hands-on with RAG, AI agents, and MCP tool-calling — built as a 4-service polyglot microservices system (Next.js, Express, FastAPI, MCP server) integrating real Anthropic, Voyage AI, and WeatherAPI calls, deployed live on Google Cloud Run with a GitHub Actions CI/CD pipeline authenticated via Workload Identity Federation.",
    bullets: [
      "Built a full-stack AI engineering platform spanning 10 interactive chapters covering RAG, AI agents, MCP tool-calling, prompt engineering, and applied concerns like caching and evaluation, each backed by a real working implementation instead of a mockup.",
      "Architected a polyglot microservices system across 4 containerized services (Next.js, Express, FastAPI, MCP server) communicating over REST and MCP's stdio protocol, run locally with Docker Compose and deployed to Google Cloud Run in production.",
      "Integrated real hosted AI APIs — Anthropic Claude (chat, agent tool-calling, token counting), Voyage AI (embeddings), and WeatherAPI.com (a live external tool call through a custom MCP server) — alongside hand-rolled algorithms (TextRank summarization, semantic caching, ROUGE-L/embedding-based evaluation) for the concepts best learned by implementing them directly.",
      "Built a pgvector-backed PostgreSQL vector store with HNSW indexing for real RAG retrieval, and a custom MCP client/server pair exposing tools to the AI agent over stdio.",
      "Deployed the full stack to Google Cloud Run on a $0/month architecture (serverless Postgres, Secret Manager, Artifact Registry) and automated redeployment with a GitHub Actions CI/CD pipeline authenticated via Workload Identity Federation, no long-lived service-account keys.",
      { label: "Demo Video", href: "https://youtu.be/5a_kGe4lKwo" },
    ],
  },
  {
    name: "LogBlog - AI-Powered Full-Stack Blog Platform",
    url: "https://logblog-karti.vercel.app/",
    status: "Live",
    dateRange: "June 4 – July 10, 2025",
    githubUrl: "https://github.com/Karti722/LogBlog",
    summary:
      "An AI-powered blog platform that auto-generates tutorials from posts using a custom ML pipeline (SentenceTransformer, PyTorch), with a Django REST Framework backend and a React/Vite frontend deployed across Railway, Supabase, and Vercel.",
    bullets: [
      "Developed comprehensive full-stack blog platform with AI tutorial generation using Django REST Framework.",
      "Built responsive frontend with React, Vite, Tailwind, and Context API.",
      "Engineered ML pipeline using SentenceTransformer, PyTorch, and NLP tools.",
      "Deployed microservices: Railway (backend), Supabase (DB), Vercel (frontend).",
      "Implemented tutorial tracking, ratings, categorization, and ML suggestions.",
      { label: "Demo Video", href: "https://youtu.be/tTxGYLBY74Y" },
    ],
  },
  {
    name: "SurveyKarrot - Full-Stack Survey Platform",
    url: "https://survey-karrot.vercel.app/",
    status: "Live",
    dateRange: "July 18 – September 9, 2025",
    githubUrl: "https://github.com/Karti722/surveyKarrot",
    summary:
      "A full-stack survey platform with JWT authentication, role-based access, and a responsive dashboard for creating and analyzing surveys, built with React, TypeScript, Node.js/Express, and PostgreSQL.",
    bullets: [
      "Built full-stack survey platform with React, TypeScript, Node.js, Express.",
      "Implemented JWT auth, role-based access, and PostgreSQL integration.",
      "Features include survey creation, submissions, and responsive dashboard.",
      "Tested backend with Jest and deployed on Vercel.",
      "Clean TypeScript codebase with ESLint and documentation.",
      { label: "Demo Video", href: "https://youtu.be/AyQK4trzsLU" },
    ],
  },
  {
    name: "Evil Number Guessing Game",
    url: "https://evil-number-guessing-game-kartikeya.vercel.app/",
    status: "Live",
    dateRange: "Aug 2024",
    githubUrl: "https://github.com/Karti722/NumberGuessingGame",
    summary:
      "A full-stack number-guessing game with a Node.js/MongoDB backend, dynamic UI states, sound effects, and real-time feedback.",
    bullets: [
      "Built full-stack guessing game with Node.js backend and MongoDB.",
      "Implemented sound effects, dynamic UI states, and game logic APIs.",
      "Real-time feedback and surrender functionality.",
      { label: "Demo Video", href: "https://youtu.be/VBFLeXFMKIM" },
    ],
  },
  {
    name: "Task Manager App",
    url: "https://lumaa-spring-2025-swe-submission-from-tok6.onrender.com",
    status: "Live",
    dateRange: "Feb – May 2025",
    githubUrl: "https://github.com/Karti722/lumaa-spring-2025-swe-submission-from-kartikeya",
    summary:
      "A full-stack task manager with JWT-authenticated REST APIs, built with React, Redux, Node.js, Express, and PostgreSQL.",
    bullets: [
      "Built full-stack app with React, Redux, Node.js, Express, PostgreSQL.",
      "Implemented JWT authentication and REST APIs.",
      "Optimized backend performance and UI responsiveness.",
      { label: "Demo Video", href: "https://youtu.be/p-ASm9P76kY" },
    ],
  },
  {
    name: "TicTacToeWithEmotionAI",
    status: "Prototype",
    dateRange: "Collaborated with Peters",
    summary:
      "An AI-driven Tic-Tac-Toe game that reads the player's facial expression via webcam in real time, using TensorFlow/Keras for emotion classification and OpenCV for image capture.",
    bullets: [
      "Built AI-driven Tic-Tac-Toe using emotion recognition via webcam.",
      "Trained models using TensorFlow/Keras for emotion classification.",
      "Integrated OpenCV for real-time image capture.",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  role?: string;
  credentialId?: string;
  skills: string;
  credential?:
    | { type: "pdf" | "external"; href: string; label: string }
    | { type: "image"; src: string; alt: string; width: number; height: number };
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "PACR Internship Certificate of Completion",
    issuer: "PACR, Corp.",
    issued: "Dec 2025",
    role: "Fullstack Development Intern",
    skills: "React, Next.js, Frontend Development, Form Validation, Functional Programming",
    credential: {
      type: "pdf",
      href: "/pdfs/PACR_Certificate_of_Completion_Mr.Kumaria.pdf",
      label: "Show credential",
    },
  },
  {
    name: "WEB 101 - Intro to Web Development",
    issuer: "CodePath",
    issued: "Dec 2024",
    skills: "HTML, CSS, JavaScript",
    credential: {
      type: "image",
      src: "/photos/codepath.png",
      alt: "WEB 101 Certificate",
      width: 300,
      height: 200,
    },
  },
  {
    name: "SkyIT Internship Certificate of Completion",
    issuer: "SkyIT Services (GBCS Group)",
    issued: "Aug 2024",
    skills: "Django REST Framework, Python, MySQL, JSON, Postman, Leadership",
    credential: {
      type: "pdf",
      href: "/pdfs/SkyIT_Kartikeya Kumaria_Certificate.pdf",
      label: "Show credential",
    },
  },
  {
    name: "CodeDay Labs Micro-Intern",
    issuer: "Canvas Credentials",
    issued: "Apr 2024",
    credentialId: "6629141bb1afdc68657da11e",
    skills: "Node.js, Mocha.js, Docker, Teamwork, Test Automation",
    credential: {
      type: "external",
      href: "https://badgr.com/public/assertions/FXrB84uZRIiRGFyJ2a6n3g",
      label: "Show credential",
    },
  },
];
