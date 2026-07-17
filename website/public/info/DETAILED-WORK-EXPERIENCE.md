# Kartikeya Kumaria's Fully Detailed Work Experience

## AI Enabler Apprentice @ [Redminds](https://rediminds.com/)
*Jan 2026 – Jul 2026*

- Shipped a database migration and UI update replacing a patient-age field with a date-of-birth field on the case upload form, updating the Sequelize schema and input handling accordingly.
- Rebuilt the case attestation flow to point to an updated legal document and re-aligned the name, date, and signature input fields to match the new document layout, presenting the change directly in the IRO team meeting.
- Designed and shipped an end-to-end clinician due date feature: added a new required date field, built a dedicated `/clinician-date` API to calculate the suggested due date from case metadata, wired it into the case upload form with validation preventing an invalid due date, and surfaced the field across the case upload form, cases dashboard, and case details page.
- Enriched the case summary view with 39 additional case detail fields (parties, contact info, enrollee age, and more) pulled directly from the database, building two new reusable React components (`PreSummaryAdmin`, `DateTimeDisplayChip`) to render the data with proper table structure and date/timezone formatting.
- Built an autosave feature for the clinician case review page: implemented draft fetch/save through new `GET`/`PUT` `/decision/draft` endpoints backed by a PostgreSQL `DecisionData` table, ran saves on a 60-second interval, and added a toggle letting users disable autosave.
- Diagnosed and fixed a formatting bug where case summary and criteria text lost user-entered line breaks and spacing on re-render, replacing a fixed-size table cell with an autosizing textarea component and shipping the fix as a merged PR.
- Made suggested case-upload questions inline-editable by toggling between display and input states on click, and verified edited questions persist to the database on case submission.
- Added a conditional "partial approved units" quantity field to the clinical review flow, visible and required only when a reviewer marks a question "partial," including a new nullable database column, model update, and payload wiring from frontend form to backend API.
- Extended the case search bar to match on state reference number in addition to case number, then iterated on its layout twice based on direct engineering-leadership feedback, repositioning it next to the jurisdiction filters and restructuring result rows into indented, labeled fields.
- Implemented a case-notifications feature end-to-end, building three new REST endpoints (fetch, mark-one-read, mark-all-read) into a refactored, multi-file notification-center component and replacing the previous mock prototype data.
- Built automated case-status email notifications, refactoring the server-side email service to send distinct messages for case assignment, QA-changes-requested, and QA-approval, with recipient routing based on the assigned case reviewer.
- Added mobile responsiveness across the entire case management platform, applying responsive styling to 12+ page components (dashboard, case upload/edit, case details, messaging, document viewer, and more) in a 12-commit, 35-file pull request while maintaining CodeQL compliance.
- Reworked the case submission flow to make PDF upload optional, adding a submit button and read-only message preview to the decision-send modal so cases can be marked complete without a mandatory file upload.
- Partnered with the AI engineering team to extend the case schema with two new structured fields (guideline categories, bundling issues) and integrated a FastAPI/Gemini-based microservice endpoint that extracts these fields directly from uploaded clinical PDFs to auto-populate new cases.
- Added and validated two additional structured case fields (out-of-area referral flag and reason) across the case upload, edit, and details pages with Zod-enforced form validation, then handed the new columns to the AI team to extend the PDF-extraction automation.
- Built an autosave feature for the case-edit page with a user-facing toggle, immediate save-on-enable behavior, and prop-driven autosave state propagated to all nested question/service-code subcomponents.

## Software Developer @ [UCSC BLUEPRINT](https://www.ucscblueprint.com/)
*Feb 2024 – Feb 2026*

- Built and deployed volunteer registration mobile app for Santa Cruz Mountain Arts Center (SCMAC) using Expo, React Native, and CSS, reducing manual sign-up time by 60% and increasing volunteer conversions by 40% within first 3 months.
- Translated over 12 Figma components into fully responsive UI for both iOS and Android platforms, ensuring consistent performance across various screen sizes including tablets, improving cross-device compatibility by 95%.
- Integrated Firebase Firestore to fetch and render user-specific data (name, date of birth, email) on profile views, enhancing data accessibility and improving profile load times by 30%.
- Implemented custom error-handling for login and profile update workflows using Firebase Authentication, resulting in 50% decrease in failed login attempts and improved user feedback during credential validation.
- Designed and launched YFIOB, a survey-based web app for K–12 career discovery using React.js, Next.js, Tailwind CSS, and Firebase, achieving 100% functional test coverage with React Testing Library, and onboarding 5+ contributors via documented Notion workflows and pair programming sessions.
- Successfully deployed YFIOB application to production at [https://yfiob2--yfiob2.us-central1.hosted.app/](https://yfiob2--yfiob2.us-central1.hosted.app/)

## Full Stack Developer Intern @ [PACR](https://pacr.co/)
*Jul 2025 – Dec 2025*

- Integrated backend Search API into 10+ frontend components using Next.js and React, enabling real-time loading and SEO-optimized filtering that improved user engagement by 25% and reduced average query latency by 35%.
- Developed and documented 8+ React-based pages, including login, registration, profile, and research search experiences, improving frontend feature coverage and streamlining user onboarding flows.
- Implemented authentication persistence for concurrent user sessions, fetched user profile photos, and built loading states for async search results, improving session reliability and overall user experience.
- Automated environment setup, linting, and CI workflows with Node.js, MongoDB, Docker, and AWS, reducing onboarding time for new developers by 50%.

## Webmaster @ [CruzHacks](https://cruzhacks.com/)
*Oct 2024 – Apr 2025*

- Implemented Figma designs for CruzHacks websites, contributing to a 20% increase in task completion.
- Built 15+ reusable React components, reducing future development time by 30%.
- Maintained the website codebase and updated 2025 content.
- Led weekly meetings and boosted team collaboration by 25%.

## Backend Developer Intern @ [SKYIT (GBCS)](https://skyit.services/)
*Apr 2024 – Aug 2024*

- Updated and cleaned client onboarding data by modifying null entries in MySQL and correcting CSV inputs, restoring full onboarding functionality within 2 days.
- Onboarded 3 backend developer interns by setting up local environments and resolving MySQL configuration issues.
- Developed Django REST API endpoint to validate authentication flow and verified database schema mappings.
- Managed API enhancements and reduced internal bug reports by 20%.
- Participated in sprint planning to align backend and frontend timelines.

## Software Engineer Intern @ [CodeDay](https://labs.codeday.org/)
*Oct 2023 – Dec 2023*

- Extended the Open Energy Dashboard (OED) with features supporting federal climate analytics compliance.
- Merged [Pull Request #1087](https://github.com/OpenEnergyDashboard/OED/pull/1087) to implement BTU conversion functionality; documented the implementation and testing process in a 12-page [LinkedIn blog post](https://www.linkedin.com/posts/kartikeya-kumaria_the-significance-of-test-driven-development-ugcPost-7137670732314001408-gpGf/) (also available as a PDF).
- Built a JavaScript-based conversion engine for CSV energy data.
- Wrote unit and integration tests using Mocha.js.
- Used Docker and Git for collaborative development and deployment.
- Debugged and deployed Node.js features across multiple environments.
