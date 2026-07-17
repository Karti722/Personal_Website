"use client";

import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>

        {/* AI Nexus */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://github.com/Karti722/ai-nexus"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Nexus - Full-Stack AI Engineering Learning Platform
            </a>
          </h3>
          <p>
            <em>May 2026 – Present</em>
          </p>
          <ul>
            <li>
              Built a full-stack AI engineering platform spanning 10 interactive
              chapters covering RAG, embeddings-based retrieval, AI agents, MCP,
              and Anthropic Claude API integration.
            </li>
            <li>
              Architected a polyglot microservices system across 4 containerized
              services (Next.js, Express, FastAPI, MCP server) exposing 15 REST
              endpoints, orchestrated with Docker Compose.
            </li>
            <li>
              Implemented 7 from-scratch algorithms for cost optimization and
              quality assurance, including BPE tokenization, semantic caching,
              TextRank summarization, and ROUGE-L/embedding-based evaluation.
            </li>
            <li>
              Integrated a pgvector-backed PostgreSQL vector store for RAG
              retrieval and a custom MCP server exposing tools to the AI agent
              over stdio.
            </li>
            <li>
              Wrote deployment guides for AWS, Azure, and GCP, citing 40+
              academic and industry sources.
            </li>
          </ul>
        </div>

        {/* LogBlog */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://logblog-karti.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LogBlog - AI-Powered Full-Stack Blog Platform
            </a>
          </h3>
          <p>
            <em>June 4 â July 10, 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/LogBlog"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ul>
            <li>
              Developed comprehensive full-stack blog platform with AI tutorial
              generation using Django REST Framework.
            </li>
            <li>
              Built responsive frontend with React, Vite, Tailwind, and Context API.
            </li>
            <li>
              Engineered ML pipeline using SentenceTransformer, PyTorch, and NLP tools.
            </li>
            <li>
              Deployed microservices: Railway (backend), Supabase (DB), Vercel (frontend).
            </li>
            <li>
              Implemented tutorial tracking, ratings, categorization, and ML suggestions.
            </li>
            <li>
              <a
                href="https://youtu.be/tTxGYLBY74Y"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo Video
              </a>
            </li>
          </ul>
        </div>

        {/* SurveyKarrot */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://survey-karrot.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SurveyKarrot - Full-Stack Survey Platform
            </a>
          </h3>
          <p>
            <em>July 18 â September 9, 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/surveyKarrot"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ul>
            <li>
              Built full-stack survey platform with React, TypeScript, Node.js, Express.
            </li>
            <li>
              Implemented JWT auth, role-based access, and PostgreSQL integration.
            </li>
            <li>
              Features include survey creation, submissions, and responsive dashboard.
            </li>
            <li>
              Tested backend with Jest and deployed on Vercel.
            </li>
            <li>
              Clean TypeScript codebase with ESLint and documentation.
            </li>
            <li>
              <a
                href="https://youtu.be/AyQK4trzsLU"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo Video
              </a>
            </li>
          </ul>
        </div>

        {/* Evil Number Guessing Game */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://evil-number-guessing-game-kartikeya.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Evil Number Guessing Game
            </a>
          </h3>
          <p>
            <em>Aug 2024</em> |{" "}
            <a
              href="https://github.com/Karti722/NumberGuessingGame"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ul>
            <li>
              Built full-stack guessing game with Node.js backend and MongoDB.
            </li>
            <li>
              Implemented sound effects, dynamic UI states, and game logic APIs.
            </li>
            <li>
              Real-time feedback and surrender functionality.
            </li>
            <li>
              <a
                href="https://youtu.be/VBFLeXFMKIM"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo Video
              </a>
            </li>
          </ul>
        </div>

        {/* Task Manager */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://lumaa-spring-2025-swe-submission-from-tok6.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Task Manager App
            </a>
          </h3>
          <p>
            <em>Feb â May 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/lumaa-spring-2025-swe-submission-from-kartikeya"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ul>
            <li>
              Built full-stack app with React, Redux, Node.js, Express, PostgreSQL.
            </li>
            <li>
              Implemented JWT authentication and REST APIs.
            </li>
            <li>
              Optimized backend performance and UI responsiveness.
            </li>
            <li>
              <a
                href="https://youtu.be/p-ASm9P76kY"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo Video
              </a>
            </li>
          </ul>
        </div>

        {/* TicTacToe AI */}
        <div className={styles.project}>
          <h3>TicTacToeWithEmotionAI</h3>
          <p>
            <em>Collaborated with Peters</em>
          </p>
          <ul>
            <li>
              Built AI-driven Tic-Tac-Toe using emotion recognition via webcam.
            </li>
            <li>
              Trained models using TensorFlow/Keras for emotion classification.
            </li>
            <li>
              Integrated OpenCV for real-time image capture.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
