"use client";
import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Experience from "./components/Sections/Experience";
import Projects from "./components/Sections/Projects";

export default function HomePage() {
  return (
    <>
      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== ABOUT ===== */}
      <section id="about" className="summary">
        <div className="container">
          <h2>About Me</h2>
          <p>
            I’m a driven full-stack software developer who
            completed a Bachelor of Science in Computer Science from
            <a href="https://www.ucsc.edu/"> University of California, Santa Cruz</a>.
            What encourages my drive is turning ideas into
             something real, transforming a idea on paper
              into full applications with tools, experiences, and interfaces
            that make people’s lives easier.
            I love working across the stack, designing clean and responsive
             front ends while building the logic behind them. I enjoy the
           problem-solving side of engineering just as much as the human
              side of collaboration: brainstorming with others, learning
              from different perspectives, and iterating toward something
            better together.I’m the kind of person who sticks with a challenge
            until it’s solved, who believes in learning by doing, and who sees
            every project as a chance to grow. More than anything, I want to
            create technology that feels thoughtful, software that not only
          works well but also connects with the people who use it.
          </p>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Skills</h2>
          <ul>
            <li>JavaScript / TypeScript</li>
            <li>React.js / Next.js</li>
            <li>Django / Django REST Framework</li>
            <li>Node.js, SQL (MySQL, PostgreSQL)</li>
            <li>Agile, Git, Debugging, Communication</li>
          </ul>
        </div>
      </section>

    {/* ===== EXPERIENCE ===== */}
    <Experience />

    {/* ===== PROJECTS ===== */}
    <Projects />

      {/* ===== CERTIFICATIONS ===== */}
      <section id="certifications" className="certifications">
        <div className="container">
          <h2>Licenses & Certifications</h2>

          <div className="certification">
            <h3>WEB 101 - Intro to Web Development</h3>
            <p>
              <strong>Issuer:</strong> CodePath | <strong>Issued:</strong> Dec
              2024
            </p>
            <p>
              <strong>Skills:</strong> HTML, CSS, JavaScript
            </p>
            <img
              src="/photos/codepath.png"
              alt="WEB 101 Certificate"
              style={{ maxWidth: "300px" }}
            />
          </div>

          <div className="certification">
            <h3>SkyIT Certificate of Completion</h3>
            <p>
              <strong>Issuer:</strong> SkyIT Services (GBCS Group) |{" "}
              <strong>Issued:</strong> Aug 2024
            </p>
            <p>
              <strong>Skills:</strong> Django REST Framework, Python, MySQL,
              JSON, Postman, Leadership
            </p>
            <a
              href="https://drive.google.com/file/d/1eLSAd0xzImy1HpPkSSetRVlh00CbomWn/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show credential
            </a>
          </div>

          <div className="certification">
            <h3>CodeDay Labs Micro-Intern</h3>
            <p>
              <strong>Issuer:</strong> Canvas Credentials |{" "}
              <strong>Issued:</strong> Apr 2024
            </p>
            <p>
              <strong>Credential ID:</strong> 6629141bb1afdc68657da11e
            </p>
            <p>
              <strong>Skills:</strong> Node.js, Mocha.js, Docker, Teamwork, Test
              Automation
            </p>
            <a
              href="https://badgr.com/public/assertions/FXrB84uZRIiRGFyJ2a6n3g"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show credential
            </a>
          </div>
        </div>
      </section>

      {/* ===== RESUME ===== */}
      <section id="resume" className="resume">
        <div className="container">
          <h2>Resume</h2>
          <div className="resume-container">
            <div className="resume-actions">
              <a
                href="/files/Kartikeya_Resume.pdf"
                target="_blank"
                className="resume-btn download-btn"
              >
                <span>📄</span> Download Resume
              </a>
              <a
                href="/files/Kartikeya_Resume.pdf"
                target="_blank"
                className="resume-btn view-btn"
              >
                <span>👁️</span> View Full Screen
              </a>
            </div>
            <div className="resume-embed">
              <iframe
                src="/files/Kartikeya_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                width="100%"
                height="600"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
}
