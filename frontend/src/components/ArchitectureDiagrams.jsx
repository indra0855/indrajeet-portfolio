import React, { useState } from 'react';
import { Network, Database, ChevronRight, Layers, FileCode } from 'lucide-react';

export default function ArchitectureDiagrams() {
  const [activeDiag, setActiveDiag] = useState('rag'); // Default to RAG

  const diagrams = [
    {
      id: 'system',
      label: 'System Architecture',
      title: 'Full-Stack System Architecture',
      description: 'The global layout of the application showing how the React/Vite client interacts with the FastAPI backend, PostgreSQL, and SMTP email services.',
      steps: [
        'Vite Client handles routing, client-side rendering, and API states.',
        'FastAPI Router exposes REST API endpoints behind CORS Middleware.',
        'SQLAlchemy ORM bridges Python models and the relational database.',
        'PostgreSQL persists data (projects, submissions).',
        'FastAPI BackgroundTasks dispatch SMTP notification emails asynchronously.'
      ]
    },
    {
      id: 'api',
      label: 'API Flow',
      title: 'API Request & Response Pipeline',
      description: 'Step-by-step lifecycle of a POST submission from client input validation to data persistence and background services.',
      steps: [
        'Client sends POST payload containing name, email, subject, message.',
        'FastAPI validates payload structure using Pydantic (ContactCreate model).',
        'Database session is injected using dependency injection (get_db generator).',
        'Database commit records submission and returns database-assigned ID.',
        'SMTP email dispatcher is appended to FastAPI BackgroundTasks.',
        'API returns immediate 200 OK JSON status confirmation.'
      ]
    },
    {
      id: 'ocr',
      label: 'OCR Pipeline',
      title: 'OCR Ingestion & Parse Pipeline',
      description: 'Computer vision pipeline for image processing, layout detection, and structural coordinate text extraction.',
      steps: [
        'Ingest raw unstructured documents (PDF, Image).',
        'Pre-process with OpenCV: greyscale, deskewing, noise reduction.',
        'Layout Analysis: identify paragraphs, bounding boxes, tables.',
        'Text Extraction: translate bounding boxes into raw text streams.',
        'Structural Tagging: compile coordinates and raw text into parser logs.'
      ]
    },
    {
      id: 'workflow',
      label: 'Multi-Agent Workflow',
      title: 'LangGraph Multi-Agent Architecture',
      description: 'State graph routing document tasks across specialized LLM agents with automated validation loopbacks.',
      steps: [
        'State Graph router triggers on document arrival.',
        'OCR Parsing Agent parses layout data.',
        'Information Extraction Agent extracts fields (e.g. total, dates).',
        'Validation Agent reviews extractions against rules (e.g. total matches items).',
        'Loopback: If validation fails, agent re-queries extraction with instructions.',
        'Succeeds: Report Synthesis Agent generates JSON report.'
      ]
    },
    {
      id: 'rag',
      label: 'RAG Architecture',
      title: 'Retrieval-Augmented Generation Architecture',
      description: 'Ingestion and query pipelines mapping text chunks to vector databases and augmenting LLM contexts.',
      steps: [
        'Ingest documents and apply recursive text character splitting.',
        'Transform text chunks into vector embeddings via local models.',
        'Load vector embeddings into FAISS/Chroma Vector Database.',
        'User queries are vectorized and search indices are checked for similarity.',
        'Retrieve top-K matching document chunks as relevant context.',
        'Feed query + chunks to LLM to formulate grounded, accurate response.'
      ]
    },
    {
      id: 'schema',
      label: 'Database Schema',
      title: 'PostgreSQL Relational Schema',
      description: 'Layout of tables and attributes storing project details and contact queries.',
      steps: [
        'projects table: stores title, description, image path, urls, and tech stack.',
        'contacts table: stores name, email, subject, and messages from visitors.',
        'Auto-migrations: managed seamlessly on app startup using SQLAlchemy Metadata.'
      ]
    }
  ];

  const currentDiag = diagrams.find(d => d.id === activeDiag);

  return (
    <section id="architecture" className="arch-section section">
      <div className="container">
        <div className="section-header">
          <h2>Architecture Diagrams</h2>
          <p>Explore interactive technical flows mapping the engineering structures implemented across the portfolio.</p>
        </div>

        <div className="arch-layout">
          {/* Diagrams Tabs Menu */}
          <div className="arch-tabs glass-panel">
            {diagrams.map((diag) => (
              <button
                key={diag.id}
                className={`arch-tab-btn ${activeDiag === diag.id ? 'active' : ''}`}
                onClick={() => setActiveDiag(diag.id)}
              >
                {diag.id === 'rag' && <Network size={16} />}
                {diag.id === 'schema' && <Database size={16} />}
                {diag.id === 'system' && <Layers size={16} />}
                {diag.id === 'api' && <Layers size={16} />}
                {diag.id === 'ocr' && <Layers size={16} />}
                {diag.id === 'workflow' && <Layers size={16} />}
                <span>{diag.label}</span>
              </button>
            ))}
          </div>

          {/* Diagram Workspace Visual & Details */}
          <div className="arch-viewer glass-panel">
            <div className="arch-details">
              <h3>{currentDiag.title}</h3>
              <p className="arch-desc">{currentDiag.description}</p>
              
              <ul className="arch-steps-list">
                {currentDiag.steps.map((step, idx) => (
                  <li key={idx} className="arch-step-item">
                    <span className="step-num">{idx + 1}</span>
                    <span className="step-text">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual SVG Flow Renderer */}
            <div className="arch-visual">
              <div className="visual-viewport">
                {activeDiag === 'system' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    <rect x="20" y="110" width="100" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="70" y="140" fill="var(--text-primary)" fontSize="11" textAnchor="middle">React (Vite)</text>
                    
                    <line x1="120" y1="135" x2="180" y2="135" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="4" />
                    <polygon points="180,135 174,130 174,140" fill="var(--secondary)" />
                    
                    <rect x="180" y="110" width="100" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="230" y="140" fill="var(--text-primary)" fontSize="11" textAnchor="middle">FastAPI API</text>

                    <line x1="280" y1="135" x2="330" y2="90" stroke="var(--border-color)" strokeWidth="1.5" />
                    <rect x="300" y="50" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="340" y="75" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">PostgreSQL</text>

                    <line x1="280" y1="135" x2="330" y2="180" stroke="var(--border-color)" strokeWidth="1.5" />
                    <rect x="300" y="180" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="340" y="205" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">SMTP Email</text>
                  </svg>
                )}

                {activeDiag === 'api' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    <circle cx="50" cy="150" r="30" fill="var(--bg-tertiary)" stroke="var(--secondary)" strokeWidth="2" />
                    <text x="50" y="154" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Client</text>

                    <line x1="80" y1="150" x2="140" y2="150" stroke="var(--primary)" strokeWidth="2" />
                    
                    <rect x="140" y="115" width="110" height="70" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="195" y="145" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">FastAPI</text>
                    <text x="195" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Pydantic Check</text>

                    <line x1="250" y1="150" x2="310" y2="150" stroke="var(--secondary)" strokeWidth="2" />

                    <circle cx="340" cy="150" r="30" fill="var(--bg-tertiary)" stroke="var(--secondary)" strokeWidth="2" />
                    <text x="340" y="154" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Database</text>
                  </svg>
                )}

                {activeDiag === 'ocr' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    <rect x="20" y="125" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="60" y="148" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Raw Doc</text>

                    <path d="M 100 145 L 140 145" stroke="var(--secondary)" strokeWidth="2" />

                    <rect x="140" y="115" width="110" height="60" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="195" y="145" fill="var(--text-primary)" fontSize="10" textAnchor="middle">OpenCV Layout</text>
                    
                    <path d="M 250 145 L 290 145" stroke="var(--secondary)" strokeWidth="2" />

                    <rect x="290" y="125" width="90" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="335" y="148" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Text Out</text>
                  </svg>
                )}

                {activeDiag === 'workflow' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    <rect x="145" y="40" width="110" height="40" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="200" y="65" fill="var(--text-primary)" fontSize="10" textAnchor="middle">State Graph Router</text>

                    <line x1="200" y1="80" x2="200" y2="120" stroke="var(--secondary)" strokeWidth="2" />

                    <rect x="145" y="120" width="110" height="40" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="200" y="145" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Extract Agent</text>

                    <line x1="200" y1="160" x2="200" y2="200" stroke="var(--secondary)" strokeWidth="2" />

                    <rect x="145" y="200" width="110" height="40" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="200" y="225" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Validation Agent</text>

                    {/* Loopback Arrow */}
                    <path d="M 145 220 L 90 220 L 90 140 L 145 140" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3" />
                    <polygon points="145,140 139,136 139,144" fill="var(--accent)" />
                  </svg>
                )}

                {activeDiag === 'rag' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    {/* Documents Ingestion */}
                    <rect x="30" y="40" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="70" y="65" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Documents</text>

                    <line x1="110" y1="60" x2="160" y2="60" stroke="var(--secondary)" strokeWidth="1.5" />
                    
                    {/* Embedding */}
                    <rect x="160" y="40" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                    <text x="200" y="65" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Embedding</text>

                    <line x1="240" y1="60" x2="290" y2="60" stroke="var(--secondary)" strokeWidth="1.5" />

                    {/* Vector DB */}
                    <rect x="290" y="40" width="80" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="330" y="65" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Vector DB</text>

                    {/* User Query Flow */}
                    <circle cx="70" cy="200" r="24" fill="var(--bg-tertiary)" stroke="var(--secondary)" strokeWidth="2" />
                    <text x="70" y="204" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Query</text>

                    <line x1="94" y1="200" x2="160" y2="200" stroke="var(--secondary)" strokeWidth="1.5" />

                    {/* Retrieval/LLM Node */}
                    <rect x="160" y="170" width="100" height="60" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="210" y="200" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">LLM Engine</text>
                    <text x="210" y="215" fill="var(--text-muted)" fontSize="8" textAnchor="middle">Grounded Context</text>

                    {/* DB retrieval to LLM */}
                    <path d="M 330 80 L 330 200 L 260 200" fill="none" stroke="var(--secondary)" strokeWidth="1.5" />
                  </svg>
                )}

                {activeDiag === 'schema' && (
                  <svg className="svg-flow" viewBox="0 0 400 300">
                    {/* Projects Table */}
                    <rect x="30" y="70" width="130" height="130" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="95" y="90" fill="var(--text-primary)" fontSize="11" fontWeight="bold" textAnchor="middle">projects</text>
                    <line x1="30" y1="98" x2="160" y2="98" stroke="var(--border-color)" />
                    <text x="40" y="115" fill="var(--secondary)" fontSize="9">PK id (Int)</text>
                    <text x="40" y="130" fill="var(--text-secondary)" fontSize="9">title (Varchar)</text>
                    <text x="40" y="145" fill="var(--text-secondary)" fontSize="9">description (Text)</text>
                    <text x="40" y="160" fill="var(--text-secondary)" fontSize="9">tech_stack (Text)</text>
                    <text x="40" y="175" fill="var(--text-secondary)" fontSize="9">live_url (Varchar)</text>

                    {/* Contacts Table */}
                    <rect x="240" y="70" width="130" height="130" rx="6" fill="var(--bg-tertiary)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="305" y="90" fill="var(--text-primary)" fontSize="11" fontWeight="bold" textAnchor="middle">contacts</text>
                    <line x1="240" y1="98" x2="370" y2="98" stroke="var(--border-color)" />
                    <text x="250" y="115" fill="var(--secondary)" fontSize="9">PK id (Int)</text>
                    <text x="250" y="130" fill="var(--text-secondary)" fontSize="9">name (Varchar)</text>
                    <text x="250" y="145" fill="var(--text-secondary)" fontSize="9">email (Varchar)</text>
                    <text x="250" y="160" fill="var(--text-secondary)" fontSize="9">subject (Varchar)</text>
                    <text x="250" y="175" fill="var(--text-secondary)" fontSize="9">message (Text)</text>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .arch-section {
          background-color: var(--bg-primary);
        }

        .arch-layout {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 40px;
          align-items: start;
        }

        .arch-tabs {
          display: flex;
          flex-direction: column;
          padding: 12px;
          gap: 6px;
        }

        .arch-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: all var(--transition-normal);
          cursor: pointer;
          text-align: left;
        }

        .arch-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .arch-tab-btn.active {
          color: var(--secondary);
          background: rgba(0, 225, 217, 0.05);
          border: 1px solid rgba(0, 225, 217, 0.2);
        }

        .arch-viewer {
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          min-height: 400px;
        }

        .arch-details h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--text-primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .arch-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .arch-steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .arch-step-item {
          display: flex;
          gap: 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .step-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-text {
          line-height: 1.4;
        }

        .arch-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060913;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          height: 100%;
          min-height: 280px;
        }

        .visual-viewport {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svg-flow {
          width: 100%;
          max-width: 320px;
          height: auto;
        }

        @media (max-width: 992px) {
          .arch-layout {
            grid-template-columns: 1fr;
          }

          .arch-tabs {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .arch-tab-btn {
            flex: 1;
            min-width: 140px;
            justify-content: center;
          }

          .arch-viewer {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
