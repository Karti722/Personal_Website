"use client";

import { useState } from "react";
import styles from "./About.module.css";

export default function About() {
  const [isTLDR, setIsTLDR] = useState(false);

  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>

        <button
          onClick={() => setIsTLDR(!isTLDR)}
          className={styles.toggleBtn}
        >
          {isTLDR ? "Full Version" : "TLDR Summary"}
        </button>

        {!isTLDR ? (
          <p>
            Welcome to my portfolio. My name is Kartikeya Kumaria and I’m a driven full stack developer who has completed a Bachelor of Science in Computer Science from the{" "}
            <a href="https://www.ucsc.edu/" target="_blank" rel="noopener noreferrer">
              University of California, Santa Cruz
            </a>.
            What motivates me is turning ideas into something real, taking concepts from paper and developing them into fully functional applications with tools, experiences, and interfaces that make people’s lives easier.
            I enjoy working across the stack, designing clean and responsive front ends while building the logic that powers them.
            I value both the problem-solving side of engineering and the human side of collaboration, including brainstorming with others, learning from different perspectives, and iterating toward better solutions together.
            I am the kind of person who sticks with a challenge until it is solved, believes in learning by doing, and sees every project as an opportunity to grow.
            Above all, I want to create technology that feels thoughtful, software that not only works well but also connects with the people who use it.
            I am currently an AI Enabler Apprentice at Rediminds, a role I began on January 12, 2026.
          </p>
        ) : (
          <p>
            Full stack developer with a Computer Science degree from the{" "}
            <a href="https://www.ucsc.edu/" target="_blank" rel="noopener noreferrer">
              University of California, Santa Cruz
            </a>.
            I build software that turns ideas into real, usable applications. 
            I enjoy working across the stack, creating clean and responsive front ends while developing the logic that powers them.
            I value problem-solving and collaboration, and I approach every project as an opportunity to learn and improve.
            Currently, I’m an AI Enabler Apprentice at Rediminds.
          </p>
        )}
      </div>
    </section>
  );
}