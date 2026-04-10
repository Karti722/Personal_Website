"use client";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/Sections/About";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
    </>
  );
}
