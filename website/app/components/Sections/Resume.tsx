"use client";

export default function Resume() {
  return (
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
  );
}