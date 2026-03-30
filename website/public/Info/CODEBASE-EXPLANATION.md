# Personal Portfolio Codebase: Complete Technical Explanation formatted by GitHub Copilot

## 1) High-Level Overview

This project is a personal portfolio website built with the **Next.js App Router** architecture, using **React + TypeScript + CSS Modules**, and deployed on **Vercel**.

Primary goals of the codebase:

1. Present career experience, projects, skills, certifications, and resume in a clean single-page flow.
2. Provide rich visual customization (themes, fonts, day/night mode).
3. Keep styles modular and colocated with components for maintainability.
4. Be responsive across desktop, laptop, tablet, and mobile.

Core implementation style:

1. **Composition-first page design** (`page.tsx` composes sections in order).
2. **Global design tokens + local component styles**.
3. **Client-side stateful theming via context**.
4. **Static data-driven content** (no backend API required).

---

## 2) Repository and Folder Structure

The project is a monorepo-style root with a single active app under `website/`.

```text
Personal_Website/
	README.md
	website/
		package.json
		tsconfig.json
		next.config.ts
		app/
			layout.tsx
			page.tsx
			globals.css
			components/
				ThemeProvider/
					index.tsx
					ThemeProvider.module.css
				Navbar/
					index.tsx
					Navbar.module.css
				Header/
					index.tsx
					Header.module.css
				Footer/
					index.tsx
					Footer.module.css
				Sections/
					About/
						index.tsx
						About.module.css
					Skills/
						index.tsx
						Skills.module.css
					Experience/
						index.tsx
						Experience.module.css
					Projects/
						index.tsx
						Projects.module.css
					Certifications/
						index.tsx
						Certifications.module.css
					Resume/
						index.tsx
						Resume.module.css
		public/
			PDFs/
			photos/
			SVGs/
			info/
				CODEBASE-EXPLANATION.md
```

Why this structure matters:

1. Every feature section is self-contained.
2. CSS for each component lives beside it.
3. Theming logic is centralized in one provider folder.
4. Assets are clearly separated (`photos`, `PDFs`, `SVGs`, and `info`).

---

## 3) Tech Stack and Tooling

From `package.json`:

1. Runtime:
	 - `next` 16
	 - `react` 19
	 - `react-dom` 19
2. Language/tooling:
	 - TypeScript 5
	 - ESLint 9 + `eslint-config-next`
3. Styling dependencies present:
	 - Tailwind v4 packages are installed, but this app's actual styling is CSS Modules + CSS variables.

Scripts:

1. `npm run dev` --> local development.
2. `npm run build` --> production build.
3. `npm run start` --> run built app.
4. `npm run lint` --> linting.

---

## 4) Rendering and Data Flow

### 4.1 App Entry (`layout.tsx`)

`app/layout.tsx` does three things:

1. Imports global CSS (`globals.css`).
2. Defines metadata (title, description, favicon).
3. Wraps app content with `ThemeProvider`.

It also injects a pre-hydration script intended to apply theme classes early. The current script reflects older class naming (`theme-default`, mode/variant combinations) while the live provider now uses `theme-<name>` and `mode-<mode>`. Runtime theming still works because `ThemeProvider` applies the correct classes on mount.

### 4.2 Page Composition (`page.tsx`)

`app/page.tsx` is a pure composition file:

1. `Navbar`
2. `Header`
3. `About`
4. `Skills`
5. `Experience`
6. `Projects`
7. `Certifications`
8. `Resume`
9. `Footer`

No fetch logic, no server data dependencies.

### 4.3 Theming Context (`ThemeProvider/index.tsx`)

`ThemeProvider` owns customization state:

1. `theme` --> 10 choices:
	 - `daylight`, `sunset`, `ocean`, `forest`, `monochrome`, `cyberpunk`, `vintage`, `pastel`, `warm`, `cool`
2. `fontChoice` --> 8 choices:
	 - `system`, `serif`, `mono`, `modern`, `reading`, `rounded`, `typewriter`, `classic`
3. `mode` --> `day` or `night`
4. Legacy toggle fields still present in context:
	 - `isDefault`, `toggleDefault` (UI control removed from Navbar, but logic remains)

Persistence:

1. Theme metadata in localStorage key: `site-theme`.
2. Font in localStorage key: `site-font`.
3. Mode in localStorage key: `site-mode`.
4. Theme metadata mirrored to cookie `site-theme` for early-read compatibility.

Class application strategy:

1. Removes old classes matching prefixes (`theme-`, `mode-`, `font-`).
2. Adds class tokens to `document.documentElement`:
	 - `theme-<themeName>`
	 - `mode-<day|night>`
	 - `font-<fontName>`

Context API exposed via `useSiteSettings()` and consumed by Navbar.

---

## 5) Styling System Architecture

The styling model is split into two layers:

### 5.1 Theme Token Layer (`ThemeProvider.module.css`)

This file uses `:global(...)` selectors inside a CSS module to intentionally define global theme classes.

It defines:

1. Default variables in `:root`.
2. Font class tokens: `.font-*`.
3. Theme class tokens: `.theme-*`.
4. Mode class tokens: `.mode-day`, `.mode-night`.

Important token categories:

1. Surface and text: `--section-bg`, `--text-color`, `--muted-color`, `--link-color`.
2. Header contact links: `--header-link-color`.
3. Accent and gradients: `--accent-gradient`, `--accent-strong`.
4. Cards and skills: `--card-bg`, `--skill-bg`, etc.
5. Toggle and shadows: `--toggle-shadow`, `--toggle-active-shadow`, `--box-shadow`.
6. Theme-aware CTA tokens (used by "green" buttons):
	 - `--success-gradient`
	 - `--success-border`
	 - `--success-glow`
	 - `--success-glow-strong`

These success tokens are now set per theme, which means CTA buttons visually shift with the active theme.

### 5.2 Global Layout Layer (`globals.css`)

This file now mostly contains shared global rules:

1. Reset rules (`*`, `box-sizing` etc).
2. Layout utility `.container`.
3. Base section visuals and heading decorations.
4. Base link behavior.
5. Reusable animations (`fadeInUp`, `shimmer`, etc).
6. Responsive and print rules.
7. Scrollbar hiding.

### 5.3 Component Layer (CSS Modules)

Every component has a colocated `.module.css` file, keeping component-specific styling local.

---

## 6) Component-by-Component Explanation

## 6.1 Navbar

Files:

1. `components/Navbar/index.tsx`
2. `components/Navbar/Navbar.module.css`

Responsibilities:

1. Fixed top navigation with section anchors.
2. Responsive menu (desktop links + mobile hamburger menu).
3. Settings popover for:
	 - cycling theme
	 - cycling font
	 - toggling day/night mode

UX logic:

1. Click-away closes settings menu.
2. `Escape` key closes settings menu.
3. Mobile menu and settings close when a nav link is clicked.

Recent refinements implemented in this codebase:

1. Settings icon enlarged for touch targets (desktop + mobile).
2. Theme set toggle removed from dropdown for cleaner controls.
3. Settings icon now uses `next/image` with source `/SVGs/settings.svg`.

## 6.2 Header

Files:

1. `components/Header/index.tsx`
2. `components/Header/Header.module.css`

Responsibilities:

1. Hero/profile area with profile image (`next/image`).
2. Name, email link, LinkedIn and GitHub links.
3. Uses theme gradients and shimmer effect.
4. Contact links are plain text links styled by theme token `--header-link-color` (not button badges).

## 6.3 About

Files:

1. `components/Sections/About/index.tsx`
2. `components/Sections/About/About.module.css`

Responsibilities:

1. About section content.
2. Internal TLDR toggle button with `isTLDR` local state.
3. Switches between full narrative and concise summary.

Styling behavior:

1. TLDR button uses theme accent tokens (`--accent-gradient`, toggle shadows).
2. Paragraph text explicitly uses `--muted-color` for better theme readability (including cyberpunk tuning).

## 6.4 Skills

Files:

1. `components/Sections/Skills/index.tsx`
2. `components/Sections/Skills/Skills.module.css`

Responsibilities:

1. Renders static skills list.
2. Uses responsive CSS grid.
3. Skill cards pull from theme variables (`--skill-bg`, `--skill-text`, shadows).

## 6.5 Experience

Files:

1. `components/Sections/Experience/index.tsx`
2. `components/Sections/Experience/Experience.module.css`

Responsibilities:

1. Multi-entry work experience timeline-like cards.
2. Styled card accent bar via pseudo-element.
3. Bullet icons and hover transitions.

## 6.6 Projects

Files:

1. `components/Sections/Projects/index.tsx`
2. `components/Sections/Projects/Projects.module.css`

Responsibilities:

1. Project showcase cards with links to live demos and repos.
2. Uses same visual card pattern as experience for consistency.

## 6.7 Certifications

Files:

1. `components/Sections/Certifications/index.tsx`
2. `components/Sections/Certifications/Certifications.module.css`

Responsibilities:

1. Certification cards with details and credential links.
2. Includes one inline image certificate preview.

CTA buttons:

1. "Show credential" buttons use the high-impact CTA style.
2. Colors and glow now derive from per-theme success tokens.

## 6.8 Resume

Files:

1. `components/Sections/Resume/index.tsx`
2. `components/Sections/Resume/Resume.module.css`

Responsibilities:

1. Provides external full-screen resume link.
2. Embeds PDF in iframe via `/files/Kartikeya_Resume.pdf` route in current implementation.
3. Responsive height/width behavior tuned for laptop/mobile.

CTA button:

1. "View Full Screen" uses same irresistible CTA treatment as certifications.
2. Theme-adaptive success tokens ensure style shifts across all themes.

## 6.9 Footer

Files:

1. `components/Footer/index.tsx`
2. `components/Footer/Footer.module.css`

Responsibilities:

1. Closing note about stack/deployment.
2. Link to GitHub portfolio codebase.
3. Contrast-enhanced styling for reliable readability across themes.

---

## 7) Refactoring History and Rationale

This codebase has undergone significant structure and styling refactors.

### 7.1 CSS Decomposition

Previous state:

1. Large, monolithic global stylesheet.

Current state:

1. Component-specific styles moved into colocated CSS Modules.
2. Global CSS retained only for shared base/layout/animation primitives.
3. Theme token definitions moved into `ThemeProvider.module.css`.

Benefit:

1. Better maintainability, lower regression risk, clearer ownership of styles.

### 7.2 Sections Folder Refactor

Previous state:

1. Section files were flatter and less isolated.

Current state:

1. Each section has its own folder (`About/`, `Skills/`, etc) with `index.tsx` + `.module.css`.

Benefit:

1. Easier navigation and future section-level scaling.

### 7.3 Theme System Expansion

Previous state:

1. Fewer theme/font choices.

Current state:

1. 10 named themes.
2. 8 font stacks.
3. Day/night mode.
4. Persisted personalization.

Benefit:

1. High UX customization with predictable context-driven implementation.

### 7.4 CTA Unification

Previous state:

1. Hardcoded green button styling in multiple places.

Current state:

1. Shared "success" variable model with per-theme overrides.
2. Uniform behavior (pulse, sheen, hover lift).
3. Cyberpunk/pastel and all other themes receive unique CTA color personality.

Benefit:

1. Visual consistency plus theme fidelity.

---

## 8) Accessibility and UX Notes

Implemented:

1. Descriptive `aria-label` on settings controls.
2. `role="switch"` + `aria-checked` for day/night toggle.
3. Click-away + keyboard Escape menu handling.
4. `prefers-reduced-motion` handling for animated CTA effects.
5. Improved touch targets for settings icon.

Areas to potentially improve further:

1. Replace decorative emojis in CTA labels with optional icon components and screen-reader-only text if needed.
2. Add visible focus rings for keyboard navigation in all modules.

---

## 9) Responsive Strategy

The responsive model is mostly breakpoint-based CSS:

1. `768px` breakpoint for tablet/mobile navigation and section spacing changes.
2. `480px` breakpoint for compact mobile adjustments.
3. Navbar converts to hamburger menu at smaller widths.
4. Resume viewer dimensions and button layouts adapt per breakpoint.

---

## 10) Static Assets and Content Sources

Under `public/`:

1. `photos/` for profile/certificate images.
2. `PDFs/` for resume and certificate PDFs.
3. `SVGs/` for icons (e.g., `settings.svg`, `favicon.svg`).
4. `info/` for project documentation (including this file).

Content model:

1. All profile/experience/project/certification data is currently hardcoded in TSX section components.

---

## 11) Operational Notes

Local development:

1. `cd website`
2. `npm install`
3. `npm run dev`

Build and run production:

1. `npm run build`
2. `npm run start`

Deployment:

1. Designed for Vercel deployment (as noted in project metadata and footer).

---

## 12) Summary

This codebase is now a modular, theme-rich, section-driven portfolio architecture built on Next.js App Router. It has been refactored from a heavier global-style approach into colocated component modules, while introducing a robust customization engine (themes, fonts, mode), adaptive CTA styling, and responsive UX patterns.

The most important architectural principle in the current code is:

1. **Global variables define design language.**
2. **Component modules consume that language locally.**
3. **ThemeProvider orchestrates runtime class changes and persistence.**

That separation is what makes the project both visually flexible and maintainable.
