"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { parseProjectSummaries, ProjectSummary } from "./parseProjectSummaries";

type ProjectDetailsProps = {
  tldr: boolean;
  isFetching: boolean;
  summary?: string;
  children: ReactNode;
};

function ProjectDetails({ tldr, isFetching, summary, children }: ProjectDetailsProps) {
  if (tldr && summary) {
    return <p className={styles.tldrText}>{summary}</p>;
  }
  if (tldr && isFetching) {
    return <p className={styles.loadingNote}>Loading summary…</p>;
  }
  return <>{children}</>;
}

export default function Projects() {
  const [tldr, setTldr] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState<string | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const fetchStartedRef = useRef(false);

  useEffect(() => {
    if (!tldr || rawMarkdown !== null || fetchStartedRef.current) return;

    fetchStartedRef.current = true;
    let cancelled = false;

    fetch("/info/SUMMARIZE-PROJECTS.md")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setRawMarkdown(text);
      })
      .catch(() => {
        if (!cancelled) {
          fetchStartedRef.current = false;
          setFetchFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tldr, rawMarkdown]);

  const isFetching = tldr && rawMarkdown === null && !fetchFailed;

  const summaries = useMemo<ProjectSummary[] | null>(
    () => (rawMarkdown ? parseProjectSummaries(rawMarkdown) : null),
    [rawMarkdown]
  );

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.headerRow}>
          <h2>Projects</h2>
          <button
            type="button"
            className={styles.viewToggle}
            onClick={() => setTldr((t) => !t)}
            aria-pressed={tldr}
          >
            {tldr ? "Show Full Details" : "Show TLDR Summaries"}
          </button>
        </div>

        {/* AI Nexus */}
        <div className={styles.project}>
          <h3>
            <a
              href="https://ai-nexus-5e5vxuuemq-uc.a.run.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Nexus - Full-Stack AI Engineering Learning Platform
            </a>
          </h3>
          <p>
            <em>July 16th 2026 – July 20, 2026</em> |{" "}
            <a
              href="https://github.com/Karti722/ai-nexus"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[0]?.summary}>
            <ul>
              <li>
                Built a full-stack AI engineering platform spanning 10 interactive
                chapters covering RAG, AI agents, MCP tool-calling, prompt engineering,
                and applied concerns like caching and evaluation, each backed by a real
                working implementation instead of a mockup.
              </li>
              <li>
                Architected a polyglot microservices system across 4 containerized
                services (Next.js, Express, FastAPI, MCP server) communicating over
                REST and MCP&apos;s stdio protocol, run locally with Docker Compose
                and deployed to Google Cloud Run in production.
              </li>
              <li>
                Integrated real hosted AI APIs — Anthropic Claude (chat, agent
                tool-calling, token counting), Voyage AI (embeddings), and
                WeatherAPI.com (a live external tool call through a custom MCP
                server) — alongside hand-rolled algorithms (TextRank summarization,
                semantic caching, ROUGE-L/embedding-based evaluation) for the concepts
                best learned by implementing them directly.
              </li>
              <li>
                Built a pgvector-backed PostgreSQL vector store with HNSW indexing for
                real RAG retrieval, and a custom MCP client/server pair exposing tools
                to the AI agent over stdio.
              </li>
              <li>
                Deployed the full stack to Google Cloud Run on a $0/month architecture
                (serverless Postgres, Secret Manager, Artifact Registry) and automated
                redeployment with a GitHub Actions CI/CD pipeline authenticated via
                Workload Identity Federation, no long-lived service-account keys.
              </li>
            </ul>
          </ProjectDetails>
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
            <em>June 4 – July 10, 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/LogBlog"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[1]?.summary}>
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
          </ProjectDetails>
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
            <em>July 18 – September 9, 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/surveyKarrot"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[2]?.summary}>
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
          </ProjectDetails>
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
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[3]?.summary}>
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
          </ProjectDetails>
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
            <em>Feb – May 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/lumaa-spring-2025-swe-submission-from-kartikeya"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[4]?.summary}>
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
          </ProjectDetails>
        </div>

        {/* TicTacToe AI */}
        <div className={styles.project}>
          <h3>TicTacToeWithEmotionAI</h3>
          <p>
            <em>Collaborated with Peters</em>
          </p>
          <ProjectDetails tldr={tldr} isFetching={isFetching} summary={summaries?.[5]?.summary}>
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
          </ProjectDetails>
        </div>
      </div>
    </section>
  );
}
