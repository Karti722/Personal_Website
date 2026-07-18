"use client";

import styles from "./Skills.module.css";

type SkillCategory = {
  title: string;
  skills: string[];
  featured?: boolean;
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript"],
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
    title: "Tools & Platforms",
    skills: ["Docker", "AWS", "GCP", "Azure", "Git", "GitHub", "CI/CD", "CodeQL"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firestore", "pgvector"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <h2>Skills</h2>
        <p className={styles.intro}>
          The languages, frameworks, and AI tooling I use to design, build, and ship
          production software — from full-stack web apps to LLM-powered agents.
        </p>

        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className={`${styles.category} ${
              category.featured ? styles.categoryFeatured : ""
            }`}
          >
            <h3 className={styles.categoryTitle}>
              {category.title}
              {category.featured && (
                <span className={styles.featuredBadge}>currently building with</span>
              )}
            </h3>
            <ul className={styles.skillsList}>
              {category.skills.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
