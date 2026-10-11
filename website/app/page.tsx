"use client";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StatsBar from "./components/StatsBar";
import About from "./components/Sections/About";
import Skills from "./components/Sections/Skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Skills />
      <StatsBar />
    </>
  );
}
