"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header id="header">
      <div className="container">
        <div className="profile-section">
          <Image
            src="/photos/karti.png"
            alt="Kartikeya Kumaria Profile Photo"
            className="profile-photo"
            width={150}
            height={150}
          />

          <div className="profile-info">
            <h1 style={{ color: "white" }}>Kartikeya Kumaria</h1>

            <p style={{ color: "white" }}>
              Reach out to me at{" "}
              <a
                href="mailto:kartikeyaku@gmail.com"
                style={{ color: "white" }}
              >
                kartikeyaku@gmail.com
              </a>
            </p>

            <p style={{ color: "white" }}>
              <a
                href="https://linkedin.com/in/kartikeya-kumaria"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/karti722"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}