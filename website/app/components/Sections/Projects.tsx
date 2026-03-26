"use client";

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Projects</h2>

        {/* LogBlog */}
        <div className="project">
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
        <div className="project">
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
        <div className="project">
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

        {/* Outer Space 3D World */}
        <div className="project">
          <h3>
            <a
              href="https://kkumariacse160asgn5threejs.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Outer Space 3D World (Three.js)
            </a>
          </h3>
          <p>
            <em>March 2025</em> |{" "}
            <a
              href="https://github.com/Karti722/ThreeJS3DWorld_Asgn5_CSE160"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <ul>
            <li>Built interactive 3D world using Three.js.</li>
            <li>Implemented dynamic object placement and textures.</li>
            <li>Imported models and optimized rendering.</li>
          </ul>
        </div>

        {/* Task Manager */}
        <div className="project">
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
        <div className="project">
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