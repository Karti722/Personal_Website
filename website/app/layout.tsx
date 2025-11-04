// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import ThemeProvider from "./components/ThemeProvider";

export const metadata = {
  title: "Kartikeya Kumaria Portfolio",
  description: "Personal portfolio website built with Next.js and TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Use a client-side pre-hydration script to set theme quickly. It will look for a cookie first, then localStorage,
  // then prefers-color-scheme, then local time. This avoids flash of wrong theme while keeping server code simple.
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                if (document.documentElement.classList.length) return;
                // Check cookie first
                const cookies = document.cookie ? document.cookie.split(';').map(c=>c.trim()) : [];
                const themeCookie = cookies.find(c => c.startsWith('site-theme='));
                if (themeCookie) {
                  try {
                    const raw = decodeURIComponent(themeCookie.split('=')[1]);
                    const { mode, variant } = JSON.parse(raw);
                    if (mode && variant) { document.documentElement.classList.add('theme-' + mode + '-' + variant); return; }
                  } catch(e) {}
                }
                // localStorage next
                const raw = localStorage.getItem('site-theme');
                if (raw) {
                  try { const { mode, variant } = JSON.parse(raw); if (mode && variant) { document.documentElement.classList.add('theme-' + mode + '-' + variant); return; } } catch(e) {}
                }
                // prefers-color-scheme for variant
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const hour = new Date().getHours();
                const isDay = hour >= 6 && hour < 19;
                const variant = prefersDark ? 'dark' : 'light';
                document.documentElement.classList.add('theme-' + (isDay ? 'day' : 'night') + '-' + variant);
              } catch (e) {}
            })();`,
          }}
        />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
