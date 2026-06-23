import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code } from 'lucide-react';

export default function Navbar({ isLightTheme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link highlight detection
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, 'home')}>
          <Code className="logo-icon" />
          <span>INDRAJEET KUMBHAR</span>
        </a>

        {/* Desktop Nav */}
        <div className="navbar-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="navbar-toggle-mobile">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="navbar-menu-mobile glass-panel">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Embedded CSS rules specific to Navbar design */}
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
        }
        
        .navbar-scrolled {
          height: 70px;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .logo-icon {
          color: var(--primary);
          animation: spin 8s linear infinite;
        }

        .text-highlight {
          color: var(--secondary);
        }

        .navbar-links-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width var(--transition-normal);
          border-radius: var(--radius-full);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.03);
          transition: all var(--transition-normal);
        }

        .theme-toggle-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.08);
          transform: scale(1.05);
        }

        .navbar-toggle-mobile {
          display: none;
          align-items: center;
          gap: 16px;
        }

        .menu-btn {
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }

        .navbar-menu-mobile {
          position: absolute;
          top: 80px;
          left: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 16px;
          border-radius: var(--radius-lg);
          z-index: 999;
          animation: slideDown 0.3s ease-out;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--text-primary);
          padding-left: 8px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .navbar-links-desktop {
            display: none;
          }
          
          .navbar-toggle-mobile {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
