"use client";

import styles from "./Certifications.module.css";

export default function Certifications() {
  return (
    <section id="certifications">
      
      <div className="container">
        <h2>Licenses & Certifications</h2>

        <div className={styles.certification}>
          <h3>PACR Internship Certificate of Completion</h3>
          <p>
            <strong>Issuer:</strong> PACR, Corp. |{" "}
            <strong>Issued:</strong> Dec 2025
          </p>
          <p>
            <strong>Role:</strong> Fullstack Development Intern
          </p>
          <p>
            <strong>Skills:</strong> React, Next.js, Frontend Development, Form Validation,
            Functional Programming
          </p>
          <a
            href="/files/PACR_Certificate_of_Completion_Mr.Kumaria.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show credential
          </a>
        </div>

        <div className={styles.certification}>
          <h3>WEB 101 - Intro to Web Development</h3>
          <p>
            <strong>Issuer:</strong> CodePath | <strong>Issued:</strong> Dec 2024
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

        <div className={styles.certification}>
          <h3>SkyIT Intership Certificate of Completion</h3>
          <p>
            <strong>Issuer:</strong> SkyIT Services (GBCS Group) |{" "}
            <strong>Issued:</strong> Aug 2024
          </p>
          <p>
            <strong>Skills:</strong> Django REST Framework, Python, MySQL, JSON,
            Postman, Leadership
          </p>
          <a
            href="/files/SkyIT_Kartikeya Kumaria_Certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show credential
          </a>
        </div>

        <div className={styles.certification}>
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
  );
}