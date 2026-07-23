#!/usr/bin/env node
// Renders public/pdfs/Kartikeya_Portfolio.pdf from the same data file the
// live site reads (app/data/portfolio.ts) — no separately-maintained HTML
// copy to fall out of sync. Run via `npm run pdf:portfolio` (or
// `npm run pdf:portfolio:watch` to regenerate automatically as that data
// file changes).

import { spawnSync } from "child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import os from "os";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_PDF = path.join(ROOT, "public", "pdfs", "Kartikeya_Portfolio.pdf");

const BROWSER_CANDIDATES = {
  win32: [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ],
  darwin: [
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ],
  linux: [
    "/usr/bin/microsoft-edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ],
};

function findBrowser() {
  const override = process.env.PORTFOLIO_PDF_BROWSER;
  if (override) {
    if (!existsSync(override)) {
      throw new Error(`PORTFOLIO_PDF_BROWSER is set but not found at ${override}`);
    }
    return override;
  }

  const candidates = BROWSER_CANDIDATES[process.platform] || [];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      "Could not find Chrome or Edge in the usual install locations. " +
        "Set PORTFOLIO_PDF_BROWSER to your browser's executable path and try again."
    );
  }
  return found;
}

// Vercel's build containers have no system browser, so the PDF is generated
// there via a bundled serverless Chromium instead of shelling out to a
// local install. Locally (Windows/macOS dev machines) we keep using
// whatever Edge/Chrome is already installed — @sparticuz/chromium only
// ships a Linux binary and can't run on a dev machine anyway.
async function printWithServerlessChromium(sourceUrl) {
  const { default: chromium } = await import("@sparticuz/chromium");
  const { default: puppeteer } = await import("puppeteer-core");

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.goto(sourceUrl, { waitUntil: "load" });
    await page.pdf({ path: OUTPUT_PDF, printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }
}

function printWithLocalBrowser(sourceUrl) {
  const browser = findBrowser();
  const profileDir = path.join(os.tmpdir(), "portfolio-pdf-profile");

  const result = spawnSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--user-data-dir=${profileDir}`,
      `--print-to-pdf=${OUTPUT_PDF}`,
      sourceUrl,
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.toString() : "";
    throw new Error(`Browser exited with status ${result.status}${stderr ? `: ${stderr}` : ""}`);
  }
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function link(href, label, extraClass) {
  return `<a class="${extraClass || ""}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

function renderBullet(bullet) {
  if (typeof bullet === "string") {
    return `<li>${esc(bullet)}</li>`;
  }
  return `<li>${link(bullet.href, bullet.label)}</li>`;
}

function renderProject(project) {
  const title = project.url ? link(project.url, project.name) : esc(project.name);
  const badgeClass = project.status === "Live" ? "badge" : "badge muted";
  const github = project.githubUrl
    ? ` &middot; ${link(project.githubUrl, "GitHub Repository")}`
    : "";

  return `
    <div class="project">
      <h3>${title} <span class="${badgeClass}">${esc(project.status)}</span></h3>
      <p class="meta">${esc(project.dateRange)}${github}</p>
      <ul class="bullets">${project.bullets.map(renderBullet).join("")}</ul>
    </div>
  `;
}

function renderCertification(cert) {
  const roleLine = cert.role ? `<p><strong>Role:</strong> ${esc(cert.role)}</p>` : "";
  const credentialIdLine = cert.credentialId
    ? `<p><strong>Credential ID:</strong> ${esc(cert.credentialId)}</p>`
    : "";

  return `
    <div class="cert">
      <h3>${esc(cert.name)}</h3>
      <p><strong>Issuer:</strong> ${esc(cert.issuer)} &nbsp;|&nbsp; <strong>Issued:</strong> ${esc(cert.issued)}</p>
      ${roleLine}
      ${credentialIdLine}
      <p><strong>Skills:</strong> ${esc(cert.skills)}</p>
    </div>
  `;
}

function renderSkillCategory(category) {
  const dot = category.featured ? '<span class="dot"></span>' : "";
  return `
    <div class="skill-cat">
      <span class="cat-title">${esc(category.title)}${dot}</span>
      <span class="items">${esc(category.skills.join(", "))}</span>
    </div>
  `;
}

function renderJob(job, index) {
  const badge = index === 0 ? '<span class="badge">Latest</span>' : "";
  return `
    <div class="job">
      <h3>${esc(job.role)} @ ${esc(job.company)} ${badge}</h3>
      <p class="meta">${esc(job.date)}</p>
      <ul class="bullets">${job.summaryPoints.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>
    </div>
  `;
}

function buildHtml(data, photoUrl) {
  const { PROFILE, UNIVERSITY, ABOUT, SKILL_CATEGORIES, JOBS, PROJECTS, CERTIFICATIONS } = data;

  const aboutFull = `${esc(ABOUT.full.before)}${link(UNIVERSITY.url, UNIVERSITY.name)}${esc(ABOUT.full.after)}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(PROFILE.name)} — Portfolio</title>
<style>
  @page { size: Letter; margin: 0.55in 0.6in; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", Calibri, Arial, sans-serif;
    color: #1c2230;
    font-size: 10.3pt;
    line-height: 1.42;
    margin: 0;
  }
  a { color: #1d5fae; text-decoration: none; }

  header.hero {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 3px solid #1d5fae;
    padding-bottom: 14px;
    margin-bottom: 16px;
  }
  header.hero img {
    width: 78px;
    height: 78px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid #1d5fae;
  }
  header.hero h1 {
    margin: 0 0 2px 0;
    font-size: 22pt;
    letter-spacing: 0.2px;
  }
  header.hero .tagline {
    margin: 0 0 6px 0;
    color: #4a5468;
    font-size: 10.5pt;
  }
  header.hero .links {
    font-size: 9.3pt;
    color: #3a4256;
  }
  header.hero .links span:not(:last-child)::after {
    content: "  •  ";
    color: #9aa3b4;
  }

  section { margin-bottom: 15px; break-inside: avoid-page; }
  h2.section-heading {
    font-size: 12.5pt;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #1d5fae;
    border-bottom: 1px solid #d6dce6;
    padding-bottom: 3px;
    margin: 0 0 8px 0;
  }

  .about-text { margin: 0; text-align: justify; color: #29303f; }

  .stats-row {
    display: flex;
    gap: 22px;
    margin: 10px 0 4px 0;
    font-size: 9.6pt;
    color: #4a5468;
  }
  .stats-row b { color: #1c2230; font-size: 12pt; }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 22px;
  }
  .skill-cat { break-inside: avoid; margin-bottom: 4px; }
  .skill-cat .cat-title {
    font-weight: 700;
    font-size: 9.8pt;
    color: #1c2230;
    display: block;
    margin-bottom: 2px;
  }
  .skill-cat .cat-title .dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #2fa36b;
    margin-left: 5px;
  }
  .skill-cat .items { color: #4a5468; }

  .job, .project, .cert {
    margin-bottom: 9px;
    break-inside: avoid;
  }
  .job h3, .project h3, .cert h3 {
    margin: 0 0 2px 0;
    font-size: 10.6pt;
    font-weight: 700;
    color: #1c2230;
  }
  .badge {
    display: inline-block;
    font-size: 7.6pt;
    font-weight: 700;
    color: #fff;
    background: #2fa36b;
    border-radius: 3px;
    padding: 1px 5px;
    margin-left: 6px;
    vertical-align: middle;
  }
  .badge.muted { background: #8a93a6; }
  .meta { margin: 0 0 3px 0; font-size: 9pt; color: #6a7386; }
  ul.bullets { margin: 3px 0 0 0; padding-left: 16px; }
  ul.bullets li { margin-bottom: 2px; color: #29303f; }

  .certs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 22px;
  }
  .cert p { margin: 1px 0; font-size: 9pt; color: #4a5468; }

  footer.note {
    margin-top: 18px;
    padding-top: 8px;
    border-top: 1px solid #d6dce6;
    font-size: 8.3pt;
    color: #8a93a6;
    text-align: center;
  }
</style>
</head>
<body>

  <header class="hero">
    <img src="${photoUrl}" alt="${esc(PROFILE.name)}" />
    <div>
      <h1>${esc(PROFILE.name)}</h1>
      <p class="tagline">${esc(PROFILE.role)}</p>
      <div class="links">
        <span>${esc(PROFILE.email)}</span>
        <span>${esc(PROFILE.linkedinLabel)}</span>
        <span>${esc(PROFILE.githubLabel)}</span>
      </div>
    </div>
  </header>

  <section id="about">
    <h2 class="section-heading">About</h2>
    <p class="about-text">${aboutFull}</p>
    <div class="stats-row">
      <span><b>${JOBS.length}</b> Roles Held</span>
      <span><b>${PROJECTS.length}</b> Projects Shipped</span>
      <span><b>${CERTIFICATIONS.length}</b> Certifications</span>
    </div>
  </section>

  <section id="skills">
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      ${SKILL_CATEGORIES.map(renderSkillCategory).join("")}
    </div>
  </section>

  <section id="experience">
    <h2 class="section-heading">Experience</h2>
    ${JOBS.map(renderJob).join("")}
  </section>

  <section id="projects">
    <h2 class="section-heading">Projects</h2>
    ${PROJECTS.map(renderProject).join("")}
  </section>

  <section id="certifications">
    <h2 class="section-heading">Licenses &amp; Certifications</h2>
    <div class="certs-grid">
      ${CERTIFICATIONS.map(renderCertification).join("")}
    </div>
  </section>

  <footer class="note">kartikeyakumaria.com &nbsp;·&nbsp; Generated from the live portfolio</footer>

</body>
</html>
`;
}

async function generatePortfolioPdf() {
  const dataModule = await import(
    pathToFileURL(path.join(ROOT, "app", "data", "portfolio.ts")).href
  );
  const photoUrl = pathToFileURL(path.join(ROOT, "public", dataModule.PROFILE.photo.replace(/^\//, ""))).href;
  const html = buildHtml(dataModule, photoUrl);

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "portfolio-pdf-"));
  const tmpHtml = path.join(tmpDir, "portfolio.html");
  writeFileSync(tmpHtml, html, "utf8");

  try {
    const sourceUrl = pathToFileURL(tmpHtml).href;
    if (process.env.VERCEL) {
      await printWithServerlessChromium(sourceUrl);
    } else {
      printWithLocalBrowser(sourceUrl);
    }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  return OUTPUT_PDF;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = await generatePortfolioPdf();
  console.log(`Portfolio PDF written to ${output}`);
}

export { generatePortfolioPdf, OUTPUT_PDF };
