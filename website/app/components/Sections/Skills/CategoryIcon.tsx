import { ReactNode } from "react";

type CategoryIconProps = {
  name: string;
  className?: string;
};

const ICON_PATHS: Record<string, ReactNode> = {
  Languages: (
    <>
      <path d="M8 4 3 9l5 5" />
      <path d="M13 4l5 5-5 5" />
    </>
  ),
  "AI / ML": (
    <>
      <path
        d="M9 2.5 10.4 6.6 14.5 8 10.4 9.4 9 13.5 7.6 9.4 3.5 8 7.6 6.6 9 2.5Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M15 10.5 15.7 12.3 17.5 13 15.7 13.7 15 15.5 14.3 13.7 12.5 13 14.3 12.3 15 10.5Z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  "Frameworks & Libraries": (
    <>
      <path d="M9 2 16 5.5 9 9 2 5.5 9 2Z" />
      <path d="M2 9 9 12.5 16 9" />
      <path d="M2 12.5 9 16 16 12.5" />
    </>
  ),
  "Tools & Platforms": (
    <path
      d="M12.7 2.3a3.5 3.5 0 0 0-4.6 4.2L3 11.6a1.7 1.7 0 0 0 2.4 2.4l5.1-5.1a3.5 3.5 0 0 0 4.2-4.6l-2.2 2.2-1.7-.4-.4-1.7 2.3-2.1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  Databases: (
    <>
      <ellipse cx="9" cy="4.2" rx="6" ry="2.2" />
      <path d="M3 4.2v4.6C3 10 5.7 11 9 11s6-1 6-2.2V4.2" />
      <path d="M3 8.8v4.6C3 14.6 5.7 15.6 9 15.6s6-1 6-2.2V8.8" />
    </>
  ),
};

export default function CategoryIcon({ name, className }: CategoryIconProps) {
  const path = ICON_PATHS[name];
  if (!path) return null;

  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
