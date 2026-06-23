import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  // Particle Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    let mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim() || '#00e1d9';
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update & draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections (constellations)
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 1 - dist / 120;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      
      {/* Ambient Glows */}
      <div className="hero-glow-blob blob-1"></div>
      <div className="hero-glow-blob blob-2"></div>
      <div className="hero-glow-blob blob-3"></div>
      
      {/* Light Rays */}
      <div className="light-rays"></div>

      <div className="hero-container">
        {/* Portrait Section */}
        <div className="hero-portrait-wrapper">
          <div className="portrait-glow"></div>
          <img src="/images/indrajeet da .png" alt="Indrajeet Kumbhar" className="hero-portrait" />
          <div className="spotlight"></div>
        </div>

        {/* Text Content */}
        <div className="hero-text-content">
          <h1 className="hero-title">
            INDRAJEET KUMBHAR
          </h1>
        </div>
      </div>

      <style>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #000000;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* Ambient Glows */
        .hero-glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
          z-index: 1;
          pointer-events: none;
        }

        .blob-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          animation: float 20s ease-in-out infinite;
        }

        .blob-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 225, 217, 0.5) 0%, transparent 70%);
          bottom: -150px;
          left: -150px;
          animation: float 15s ease-in-out infinite reverse;
        }

        .blob-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-glow 8s ease-in-out infinite;
        }

        /* Light Rays */
        .light-rays {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(0, 225, 217, 0.1) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 40px 20px;
        }

        /* Portrait */
        .hero-portrait-wrapper {
          position: relative;
          margin-bottom: 20px;
          animation: float-portrait 6s ease-in-out infinite;
        }

        .portrait-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 140%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%);
          filter: blur(60px);
          z-index: -1;
        }

        .hero-portrait {
          width: min(480px, 48vh);
          height: auto;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          border-radius: 0;
          box-shadow: none;
          position: relative;
          z-index: 2;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 98%);
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 98%);
        }

        .spotlight {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse at top, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 80%);
          filter: blur(40px);
          z-index: 3;
          pointer-events: none;
        }

        /* Text Content */
        .hero-text-content {
          text-align: center;
          z-index: 10;
          margin-top: -100px; /* Pulls the text up to overlap the faded bottom of the portrait */
          position: relative;
          animation: fade-in-up 1s ease-out 0.5s both;
        }

        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.2rem, 6.5vw, 4.5rem);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          margin-bottom: 20px;
          text-shadow: 0 0 35px rgba(139, 92, 246, 0.3);
          -webkit-box-reflect: below -15px linear-gradient(transparent 30%, rgba(255, 255, 255, 0.15) 100%);
        }

        .hero-subtitle {
          font-size: clamp(0.9rem, 2.5vw, 1.3rem);
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          margin-bottom: 0;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes float-portrait {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-portrait {
            width: min(300px, 40vh);
            aspect-ratio: 3 / 4;
            max-height: none;
          }

          .floating-nav {
            bottom: 40px;
            padding: 10px 16px;
            flex-wrap: wrap;
            justify-content: center;
 border-radius: 30px;
          }

          .nav-item {
            padding: 8px 12px;
            font-size: 0.75rem;
          }

          .blob-1, .blob-2, .blob-3 {
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .hero-container {
            padding: 20px 15px;
          }

          .hero-portrait-wrapper {
            margin-bottom: 30px;
          }

          .floating-nav {
            bottom: 30px;
            gap: 4px;
          }

          .nav-item {
            padding: 6px 10px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
}
