"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";
import CategoryIcon from "./CategoryIcon";
import PixelIcon from "../../PixelIcon";

type SkillCategory = {
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

const DEFAULT_INDEX = 0;

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = SKILL_CATEGORIES[activeIndex];

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activeIndex];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <h2 className={styles.heading}>
          <PixelIcon variant="skills" />
          Skills
        </h2>
        <p className={styles.intro}>
          The languages, frameworks, and AI tooling I use to design, build, and ship
          production software.
        </p>

        <div className={styles.tabs} role="tablist" aria-label="Skill categories">
          <span
            className={styles.tabIndicator}
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
            }}
            aria-hidden="true"
          />
          {SKILL_CATEGORIES.map((category, index) => (
            <button
              key={category.title}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`skill-tab-${index}`}
              aria-selected={index === activeIndex}
              aria-controls={`skill-panel-${index}`}
              className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <CategoryIcon name={category.title} className={styles.tabIcon} />
              {category.title}
              {category.featured && <span className={styles.tabDot} aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div
          key={active.title}
          role="tabpanel"
          id={`skill-panel-${activeIndex}`}
          aria-labelledby={`skill-tab-${activeIndex}`}
          className={`${styles.panel} ${active.featured ? styles.panelFeatured : ""}`}
        >
          <div className={styles.panelInner}>
            {active.featured && (
              <p className={styles.featuredNote}>
                <span className={styles.featuredPulse} aria-hidden="true" />
                Actively building with these day to day
              </p>
            )}
            <ul className={styles.skillsList}>
              {active.skills.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
