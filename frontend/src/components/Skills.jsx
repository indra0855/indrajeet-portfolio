import React, { useState } from 'react';
import { Code, Brain, Cpu, Database, Server, BarChart3, Settings } from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('genai');

  const skillCategories = [
    {
      id: 'genai',
      label: 'Generative AI',
      icon: <Cpu size={18} />,
      skills: [
        { name: 'LangGraph (Multi-Agent)', level: 95 },
        { name: 'LangChain', level: 90 },
        { name: 'RAG Architectures', level: 90 },
        { name: 'Ollama (Local LLMs)', level: 85 },
        { name: 'Prompt Engineering', level: 92 },
        { name: 'Vector Databases (Chroma/FAISS)', level: 85 }
      ]
    },
    {
      id: 'aiml',
      label: 'AI & Machine Learning',
      icon: <Brain size={18} />,
      skills: [
        { name: 'Machine Learning', level: 90 },
        { name: 'Deep Learning (TensorFlow)', level: 85 },
        { name: 'Computer Vision (OpenCV)', level: 88 },
        { name: 'OCR Document Extraction', level: 92 },
        { name: 'Natural Language Processing', level: 80 },
        { name: 'LLM Fine-tuning/Applications', level: 85 }
      ]
    },
    {
      id: 'programming',
      label: 'Programming',
      icon: <Code size={18} />,
      skills: [
        { name: 'Python', level: 95 },
        { name: 'SQL (PostgreSQL/MySQL)', level: 88 },
        { name: 'JavaScript (ES6+ / React)', level: 80 }
      ]
    },
    {
      id: 'backend',
      label: 'Backend Dev',
      icon: <Server size={18} />,
      skills: [
        { name: 'FastAPI', level: 92 },
        { name: 'Flask', level: 85 },
        { name: 'REST API Design', level: 95 },
        { name: 'SQLAlchemy (ORM)', level: 90 }
      ]
    },
    {
      id: 'datascience',
      label: 'Data Science & BI',
      icon: <BarChart3 size={18} />,
      skills: [
        { name: 'Pandas & NumPy', level: 90 },
        { name: 'Scikit-learn', level: 88 },
        { name: 'Power BI', level: 85 },
        { name: 'Plotly & Matplotlib', level: 85 },
        { name: 'Feature Engineering', level: 88 }
      ]
    },
    {
      id: 'tools',
      label: 'Tools & DevOps',
      icon: <Settings size={18} />,
      skills: [
        { name: 'Docker', level: 82 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 95 }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <div className="section-header">
          <h2>Technical Skills</h2>
          <p>Proficiencies mapped across advanced artificial intelligence, generative architectures, and full-stack software development.</p>
        </div>

        <div className="skills-layout">
          {/* Sidebar tabs */}
          <div className="skills-tabs">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`skill-tab-btn glass-panel ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-label">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Skill meters display */}
          <div className="skills-display glass-panel">
            <h3 className="category-title">
              {currentCategory.icon}
              <span>{currentCategory.label} Expertise</span>
            </h3>

            <div className="skills-grid">
              {currentCategory.skills.map((skill, index) => (
                <div key={index} className="skill-meter-card">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="meter-track">
                    <div 
                      className="meter-fill" 
                      style={{ 
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, var(--primary), var(--secondary))`
                      }}
                    >
                      <div className="meter-glow"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
        }

        .skills-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        .skills-tabs {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skill-tab-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 600;
          text-align: left;
          color: var(--text-secondary);
          transition: all var(--transition-normal);
        }

        .skill-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary-glow);
          background: rgba(99, 102, 241, 0.03);
          transform: translateX(4px);
        }

        .skill-tab-btn.active {
          color: #fff;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
          border-color: var(--primary);
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-tab-btn.active .tab-icon {
          color: #fff;
        }

        .skills-display {
          padding: 40px;
          min-height: 420px;
        }

        .category-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          margin-bottom: 32px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .category-title span {
          background: linear-gradient(135deg, var(--text-primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .skill-meter-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
          font-weight: 500;
        }

        .skill-name {
          color: var(--text-primary);
        }

        .skill-percentage {
          color: var(--secondary);
          font-weight: 600;
        }

        .meter-track {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
          position: relative;
        }

        .meter-fill {
          height: 100%;
          border-radius: var(--radius-full);
          position: relative;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .meter-glow {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 8px;
          background: #fff;
          opacity: 0.5;
          filter: blur(2px);
        }

        @media (max-width: 768px) {
          .skills-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .skills-tabs {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .skill-tab-btn {
            flex: 1;
            min-width: 140px;
            padding: 12px 16px;
            justify-content: center;
          }
          
          .tab-label {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
