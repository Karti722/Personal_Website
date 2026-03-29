"use client";

import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <h2>Skills</h2>
        <ul className={styles.skillsList}>
          <li className={styles.skillItem}>HTML5, CSS3, Tailwind CSS</li>
          <li className={styles.skillItem}>JavaScript / TypeScript</li>
          <li className={styles.skillItem}>Git Workflow (GitHub, GitLab, and Azure DevOps)</li>
          <li className={styles.skillItem}>React.js / Next.js</li>
          <li className={styles.skillItem}>RESTful API Development</li>
          <li className={styles.skillItem}>Django, Node.js, Sequelize ORM, Express, and Nest.js</li>
          <li className={styles.skillItem}>NoSQL + SQL Databases (MongoDB, MySQL, PostgreSQL)</li>
          <li className={styles.skillItem}>Agile, Scrum, Cross-Team Collaboration</li>
        </ul>
      </div>
    </section>
  );
}