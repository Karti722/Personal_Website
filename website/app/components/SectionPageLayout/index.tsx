import { ReactNode } from "react";
import Navbar from "../Navbar";

type SectionPageLayoutProps = {
  children: ReactNode;
};

export default function SectionPageLayout({ children }: SectionPageLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
