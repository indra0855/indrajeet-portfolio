import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

export default function App() {
  // Read theme from localStorage or default to dark (false for lightTheme means darkTheme is active)
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <div className="app-container">
      <Navbar isLightTheme={isLightTheme} toggleTheme={toggleTheme} />
      <Home />
      <Footer />
    </div>
  );
}
