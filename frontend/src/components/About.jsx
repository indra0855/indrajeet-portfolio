import React, { useState } from 'react';
import { Calendar, Briefcase, GraduationCap, MapPin, ChevronRight, FileText, Globe } from 'lucide-react';

export default function About() {
  const [selectedTimelineId, setSelectedTimelineId] = useState(5); // Default to Present (internship/recent achievements)

  const timelineData = [
    {
      id: 1,
      year: "2024",
      title: "Foundation Era",
      subtitle: "Started Advanced Python & Data Science Learning",
      description: "Dived deep into algorithms, Python OOP, data structures, and statistical foundations. Learned Pandas, NumPy, Scikit-learn, and built basic analytics workflows.",
      type: "learning",
      details: ["Python Programming Certifications", "Data analysis algorithms", "Data cleaning & feature engineering"]
    },
    {
      id: 2,
      year: "2025",
      title: "ML & Analytics Developer",
      subtitle: "Built Machine Learning & Power BI Projects",
      description: "Designed predictive models and structured data pipelines. Integrated business intelligence dashboard capabilities for multi-dimensional data visibility.",
      type: "project",
      details: ["Global Food Production Dashboard (Power BI)", "Crop yield prediction model", "Supervised classification systems"]
    },
    {
      id: 3,
      year: "2025",
      title: "Computer Vision Specialization",
      subtitle: "Developed Skin Cancer Detection System",
      description: "Researched deep learning convolutional networks. Built image classification models utilizing Transfer Learning techniques to diagnose diseases.",
      type: "project",
      details: ["MobileNetV2 architecture training", "OpenCV image pre-processing", "Sign Language facial mesh tracking experiments"]
    },
    {
      id: 4,
      year: "2026",
      title: "Document Intelligence Architect",
      subtitle: "Built Enterprise Document Intelligence Platform",
      description: "Engineered high-throughput document extraction processing. Designed OCR algorithms and automated validations matching layouts.",
      type: "project",
      details: ["OCR invoice text extraction pipelines", "AI document classification agents", "Multi-Agent AI design drafts"]
    },
    {
      id: 5,
      year: "2026 - Present",
      title: "AI/ML Intern",
      subtitle: "11-Month Industrial Internship",
      description: "Developing production-grade document intelligence pipelines and AI architectures under enterprise conditions. Building high-performance microservices, multi-agent orchestrations, and data stores.",
      type: "work",
      details: [
        "Built FastAPI REST APIs with DB connections",
        "Designed Multi-Agent workflows using LangGraph",
        "Implemented OCR pipelines and RAG-based QA systems",
        "Used Python, FastAPI, LangGraph, LangChain, PostgreSQL, OpenCV, OCR, Ollama, Git, Docker"
      ]
    }
  ];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header">
          <h2>About Me & Timeline</h2>
          <p>The journey of transforming raw data and models into production-ready intelligent architectures.</p>
        </div>

        <div className="about-grid">
          <div className="about-bio glass-panel">
            <h3>Who I Am</h3>
            <p className="bio-text">
              I am an AI/ML Engineer with practical experience in Machine Learning, Deep Learning, Computer Vision, NLP, OCR, and Generative AI applications. My primary focus is designing intelligent systems using FastAPI, LangGraph, LangChain, PostgreSQL, and LLMs.
            </p>
            <p className="bio-text">
              I enjoy building production-ready applications that automate document processing, extract structured information from unstructured data, generate AI-powered insights, and solve business problems using modern AI technologies.
            </p>

            <div className="personal-details">
              <div className="detail-item">
                <MapPin size={18} className="detail-icon" />
                <div>
                  <strong>Location</strong>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
              <div className="detail-item">
                <Briefcase size={18} className="detail-icon" />
                <div>
                  <strong>Open to Roles</strong>
                  <span>AI/ML Engineer | Python Developer | Data Scientist | Generative AI Engineer</span>
                </div>
              </div>
            </div>

            <div className="resume-section" id="resume">
              <h4>Resume Actions</h4>
              <div className="resume-buttons">
                <a 
                  href="https://drive.google.com/file/d/1oRqEi98lsgBoozZc7IG0dlGUIRz50L0Z/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FileText size={18} />
                  <span>Download Resume</span>
                </a>
                <a 
                  href="https://drive.google.com/file/d/1oRqEi98lsgBoozZc7IG0dlGUIRz50L0Z/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Globe size={18} />
                  <span>View Online CV</span>
                </a>
              </div>
            </div>
          </div>

          <div className="about-timeline">
            <h3>Career Timeline</h3>
            <div className="timeline-container">
              {timelineData.map((item) => (
                <div 
                  key={item.id} 
                  className={`timeline-item ${selectedTimelineId === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedTimelineId(item.id)}
                >
                  <div className="timeline-marker">
                    {item.type === 'work' ? (
                      <Briefcase size={14} className="marker-icon" />
                    ) : item.type === 'learning' ? (
                      <GraduationCap size={14} className="marker-icon" />
                    ) : (
                      <Calendar size={14} className="marker-icon" />
                    )}
                  </div>
                  
                  <div className="timeline-summary">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-title-text">{item.title}</h4>
                    <p className="timeline-subtitle-text">{item.subtitle}</p>
                  </div>

                  {selectedTimelineId === item.id && (
                    <div className="timeline-details glass-panel animated fadeIn">
                      <p className="timeline-description">{item.description}</p>
                      <ul className="timeline-list">
                        {item.details.map((detail, index) => (
                          <li key={index}>
                            <ChevronRight size={14} className="bullet-icon" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: start;
        }

        .about-bio {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .about-bio h3 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }

        .bio-text {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        .personal-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .detail-icon {
          color: var(--secondary);
          margin-top: 2px;
        }

        .detail-item strong {
          display: block;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .detail-item span {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .resume-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resume-section h4 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .resume-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .about-timeline {
          padding-left: 20px;
        }

        .about-timeline h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
        }

        .timeline-container {
          position: relative;
          border-left: 2px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-left: 24px;
        }

        .timeline-item {
          position: relative;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .timeline-marker {
          position: absolute;
          left: -33px;
          top: 4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all var(--transition-normal);
        }

        .timeline-item:hover .timeline-marker,
        .timeline-item.active .timeline-marker {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .timeline-summary {
          margin-bottom: 8px;
        }

        .timeline-year {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--secondary);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .timeline-title-text {
          font-size: 1.2rem;
          font-weight: 700;
          margin-top: 2px;
          color: var(--text-primary);
        }

        .timeline-subtitle-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .timeline-details {
          padding: 20px;
          margin-top: 12px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border-left: 3px solid var(--primary);
        }

        .timeline-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .timeline-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .timeline-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .bullet-icon {
          color: var(--secondary);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .animated {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fadeIn {
          animation-name: fadeIn;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .about-timeline {
            padding-left: 10px;
          }
        }
      `}</style>
    </section>
  );
}
