#!/usr/bin/env node
// Regenerates public/pdfs/Kartikeya_Portfolio.pdf whenever the shared
// content data (app/data/portfolio.ts) changes — the same file the About,
// Skills, Experience, Projects, and Certifications sections render from,
// so editing the site's content keeps the PDF in sync automatically.

import { watch } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generatePortfolioPdf, OUTPUT_PDF } from "./generate-portfolio-pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WATCH_DIR = path.join(__dirname, "..", "app", "data");
const DEBOUNCE_MS = 300;

let timer = null;

function regenerate(reason) {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const startedAt = new Date().toLocaleTimeString();
    try {
      await generatePortfolioPdf();
      console.log(`[pdf:watch] ${startedAt} — regenerated ${OUTPUT_PDF} (${reason})`);
    } catch (err) {
      console.error(`[pdf:watch] ${startedAt} — failed to regenerate PDF: ${err.message}`);
    }
  }, DEBOUNCE_MS);
}

console.log(`[pdf:watch] Watching ${WATCH_DIR} for changes. Press Ctrl+C to stop.`);
regenerate("initial run");

watch(WATCH_DIR, { recursive: true }, (_eventType, filename) => {
  regenerate(filename || "file change");
});
