"use client";
import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Experience from "./components/Sections/Experience";
import Projects from "./components/Sections/Projects";
import Resume from "./components/Sections/Resume";
import Certifications from "./components/Sections/Certifications";
import About from "./components/Sections/About";
import Skills from "./components/Sections/Skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Resume />
      <Footer />
    </>
  );
}
