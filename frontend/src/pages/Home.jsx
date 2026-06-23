import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="home-page-layout">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
    </main>
  );
}
