import React from 'react';
import { ArrowUp, Code } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="brand-logo">
            <Code className="logo-icon-footer" size={18} />
            <span>INDRAJEET KUMBHAR</span>
          </div>
          <p className="brand-desc">Designing intelligent Multi-Agent architectures and Generative AI microservices.</p>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Indrajeet Kumbhar. All rights reserved.
          </p>
          <a href="#home" onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
            <span>Scroll to Top</span>
            <ArrowUp size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 48px 0;
          color: var(--text-secondary);
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .logo-icon-footer {
          color: var(--primary);
        }

        .brand-desc {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 0.85rem;
        }

        .scroll-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .scroll-top-btn:hover {
          color: var(--primary);
        }

        @media (max-width: 576px) {
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
