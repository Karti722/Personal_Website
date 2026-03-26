"use client";

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Experience</h2>

        {/* UCSC BLUEPRINT */}
        <div className="job">
          <h3>
            Software Developer @{" "}
            <a
              href="https://www.ucscblueprint.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UCSC BLUEPRINT
            </a>
          </h3>
          <p>
            <em>Feb 2024 – Feb 2026</em>
          </p>
          <ul>
            <li>
              Built and deployed volunteer registration mobile app for Santa Cruz
              Mountain Arts Center (SCMAC) using Expo, React Native, and CSS,
              reducing manual sign-up time by 60% and increasing volunteer
              conversions by 40% within first 3 months.
            </li>
            <li>
              Translated over 12 Figma components into fully responsive UI for both
              iOS and Android platforms, ensuring consistent performance across
              various screen sizes including tablets, improving cross-device
              compatibility by 95%.
            </li>
            <li>
              Integrated Firebase Firestore to fetch and render user-specific data
              (name, date of birth, email) on profile views, enhancing data
              accessibility and improving profile load times by 30%.
            </li>
            <li>
              Implemented custom error-handling for login and profile update
              workflows using Firebase Authentication, resulting in 50% decrease in
              failed login attempts and improved user feedback during credential
              validation.
            </li>
            <li>
              Designed and launched YFIOB, a survey-based web app for K–12 career
              discovery using React.js, Next.js, Tailwind CSS, and Firebase,
              achieving 100% functional test coverage with React Testing Library,
              and onboarding 5+ contributors via documented Notion workflows and
              pair programming sessions.
            </li>
            <li>
              Successfully deployed YFIOB application to production at{" "}
              <a
                href="https://yfiob2--yfiob2.us-central1.hosted.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://yfiob2--yfiob2.us-central1.hosted.app/
              </a>
            </li>
          </ul>
        </div>

        {/* PACR */}
        <div className="job">
          <h3>
            Full Stack Developer Intern @{" "}
            <a
              href="https://pacr.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PACR
            </a>
          </h3>
          <p>
            <em>Jul 2025 – Dec 2025</em>
          </p>
          <ul>
            <li>
              Integrated backend Search API into 10+ frontend components using
              Next.js and React, enabling real-time loading and SEO-optimized
              filtering that improved user engagement by 25% and reduced average
              query latency by 35%.
            </li>
            <li>
              Developed and documented 8+ React-based pages, including login,
              registration, profile, and research search experiences, improving
              frontend feature coverage and streamlining user onboarding flows.
            </li>
            <li>
              Implemented authentication persistence for concurrent user sessions,
              fetched user profile photos, and built loading states for async
              search results, improving session reliability and overall user
              experience.
            </li>
            <li>
              Automated environment setup, linting, and CI workflows with Node.js,
              MongoDB, Docker, and AWS, reducing onboarding time for new
              developers by 50%.
            </li>
          </ul>
        </div>

        {/* CRUZHACKS */}
        <div className="job">
          <h3>
            Webmaster @{" "}
            <a
              href="https://cruzhacks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CruzHacks
            </a>
          </h3>
          <p>
            <em>Oct 2024 – Apr 2025</em>
          </p>
          <ul>
            <li>
              Implemented Figma designs for CruzHacks websites, contributing to a
              20% increase in task completion.
            </li>
            <li>
              Built 15+ reusable React components, reducing future development time
              by 30%.
            </li>
            <li>
              Maintained the website codebase and updated 2025 content.
            </li>
            <li>
              Led weekly meetings and boosted team collaboration by 25%.
            </li>
          </ul>
        </div>

        {/* SKYIT */}
        <div className="job">
          <h3>
            Backend Developer Intern @{" "}
            <a
              href="https://skyit.services/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKYIT (GBCS)
            </a>
          </h3>
          <p>
            <em>Apr 2024 – Aug 2024</em>
          </p>
          <ul>
            <li>
              Updated and cleaned client onboarding data by modifying null entries
              in MySQL and correcting CSV inputs, restoring full onboarding
              functionality within 2 days.
            </li>
            <li>
              Onboarded 3 backend developer interns by setting up local environments
              and resolving MySQL configuration issues.
            </li>
            <li>
              Developed Django REST API endpoint to validate authentication flow and
              verified database schema mappings.
            </li>
            <li>
              Managed API enhancements and reduced internal bug reports by 20%.
            </li>
            <li>
              Participated in sprint planning to align backend and frontend timelines.
            </li>
          </ul>
        </div>

        {/* CODEDAY */}
        <div className="job">
          <h3>
            Software Engineer Intern @{" "}
            <a
              href="https://labs.codeday.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeDay
            </a>
          </h3>
          <p>
            <em>Oct 2023 – Dec 2023</em>
          </p>
          <ul>
            <li>
              Extended Open Energy Dashboard (OED) with features for federal climate
              analytics compliance.
            </li>
            <li>
              Merged{" "}
              <a
                href="https://github.com/OpenEnergyDashboard/OED/pull/1087"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pull Request #1087
              </a>{" "}
              implementing BTU conversion functionality.
            </li>
            <li>
              Built JavaScript-based conversion engine for CSV energy data.
            </li>
            <li>
              Wrote unit and integration tests using Mocha.js.
            </li>
            <li>
              Used Docker and Git for collaborative development and deployment.
            </li>
            <li>
              Debugged and deployed Node.js features across environments.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}