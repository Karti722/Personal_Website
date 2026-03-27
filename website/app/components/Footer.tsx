"use client";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="footer-note">
          Note: Theme toggling is available on desktop and laptop.
          It is disabled on mobile to keep the layout clean.
        </p>
        <a
          href="https://github.com/Karti722/Personal_Website"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website Source Code
        </a>
      </div>
    </footer>
  );
}