import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { 
  Github, ExternalLink, Play, CheckCircle2, AlertTriangle, 
  Terminal, FileSearch, ShieldCheck, Eye, RefreshCw, BarChart2, Trash2 
} from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeDemo, setActiveDemo] = useState(null); // 'doc', 'cancer', 'sign', 'food'
  const [loading, setLoading] = useState(true);

  // Demo 1 State (Doc Intelligence)
  const [docFile, setDocFile] = useState('invoice');
  const [docStep, setDocStep] = useState(0);
  const [docLog, setDocLog] = useState([]);
  const [docResult, setDocResult] = useState(null);

  // Demo 2 State (Skin Cancer)
  const [cancerImg, setCancerImg] = useState('lesion1');
  const [cancerAnalyzing, setCancerAnalyzing] = useState(false);
  const [cancerResult, setCancerResult] = useState(null);

  // Demo 3 State (Sign Language)
  const [signGesture, setSignGesture] = useState('hello');
  const [signTracking, setSignTracking] = useState(false);
  const [signResult, setSignResult] = useState('');

  // Demo 4 State (Food Analytics)
  const [analyticsRegion, setAnalyticsRegion] = useState('global');

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  // Filter projects mapping
  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'genai') return p.tech_stack.toLowerCase().includes('langgraph') || p.tech_stack.toLowerCase().includes('rag');
    if (filter === 'aiml') return p.tech_stack.toLowerCase().includes('tensorflow') || p.tech_stack.toLowerCase().includes('opencv') || p.tech_stack.toLowerCase().includes('mediapipe');
    if (filter === 'data') return p.tech_stack.toLowerCase().includes('power bi') || p.tech_stack.toLowerCase().includes('sql') || p.tech_stack.toLowerCase().includes('plotly');
    return true;
  });

  // Run Document Intelligence Pipeline simulation
  const runDocPipeline = () => {
    setDocStep(1);
    setDocResult(null);
    setDocLog(["[Pipeline] Initializing pipeline...", "[Agent] Ingesting file input stream..."]);

    const steps = [
      { log: "[OCR] Extracting layout grid and raw text nodes...", step: 2 },
      { log: "[Classifier] Classifying document. Result: " + (docFile === 'invoice' ? 'INVOICE_TYPE' : docFile === 'resume' ? 'RESUME_TYPE' : 'CONTRACT_TYPE'), step: 3 },
      { log: "[Extraction Agent] Running entity extraction protocols...", step: 4 },
      { log: "[Validation Agent] Testing extraction schema parameters...", step: 5 },
      { log: "[Pipeline] Summarizing & compiling JSON payload...", step: 6 }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setDocStep(s.step);
        setDocLog(prev => [...prev, s.log]);
        
        if (s.step === 6) {
          if (docFile === 'invoice') {
            setDocResult({
              document_type: "Invoice",
              invoice_number: "INV-2026-8809",
              vendor: "Apex AI Solutions",
              total_amount: "$12,450.00",
              extracted_items: ["LangGraph consulting", "RAG vector indexing server setup"],
              validation_status: "PASSED"
            });
          } else if (docFile === 'resume') {
            setDocResult({
              document_type: "Resume",
              candidate_name: "Indrajeet Kumbhar",
              profile: "AI/ML Engineer",
              primary_skills: ["Python", "FastAPI", "LangGraph", "Deep Learning"],
              validation_status: "PASSED"
            });
          } else {
            setDocResult({
              document_type: "Contract",
              parties: ["Indrajeet Kumbhar", "Enterprise Client Inc."],
              duration: "11 Months",
              clauses_found: ["IP Assignment", "Non-Disclosure"],
              validation_status: "PASSED"
            });
          }
        }
      }, (idx + 1) * 800);
    });
  };

  // Run Skin Cancer Detection Simulation
  const runCancerAnalysis = () => {
    setCancerAnalyzing(true);
    setCancerResult(null);

    setTimeout(() => {
      setCancerAnalyzing(false);
      if (cancerImg === 'lesion1') {
        setCancerResult({
          classification: "Melanoma (Malignant)",
          confidence: "94.6%",
          severity: "HIGH",
          recommendations: "Priority dermatologist consultation recommended. Avoid sun exposure and track lesion border deviations."
        });
      } else {
        setCancerResult({
          classification: "Melanocytic Nevus (Benign)",
          confidence: "98.2%",
          severity: "LOW",
          recommendations: "Standard benign classification. Maintain standard skin monitoring routines."
        });
      }
    }, 1800);
  };

  // Run Sign Language Recognition Simulation
  const runSignTracking = () => {
    setSignTracking(true);
    setSignResult('');

    setTimeout(() => {
      setSignTracking(false);
      if (signGesture === 'hello') {
        setSignResult('Translation: "Hello / Namaste"');
      } else if (signGesture === 'thanks') {
        setSignResult('Translation: "Thank you"');
      } else if (signGesture === 'help') {
        setSignResult('Translation: "I need help"');
      } else {
        setSignResult('Translation: "Welcome"');
      }
    }, 1500);
  };

  const handleOpenDemo = (projectTitle) => {
    if (projectTitle.includes("Document")) setActiveDemo('doc');
    else if (projectTitle.includes("Cancer")) setActiveDemo('cancer');
    else if (projectTitle.includes("Sign")) setActiveDemo('sign');
    else if (projectTitle.includes("Food")) setActiveDemo('food');
    
    // Scroll to demo panel
    setTimeout(() => {
      const demoElement = document.getElementById('demo-lab-panel');
      if (demoElement) {
        window.scrollTo({
          top: demoElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          
        </div>

        {/* Filter Tabs */}
        <div className="projects-filters">
          {['all', 'genai', 'aiml', 'data'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn badge ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' && 'All Projects'}
              {cat === 'genai' && 'Generative AI & Agents'}
              {cat === 'aiml' && 'Computer Vision & ML'}
              {cat === 'data' && 'Analytics & BI'}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {loading ? (
            <div className="loading-spinner">
              <RefreshCw className="spinner-icon" />
              <span>Loading projects...</span>
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div key={p.id} className="project-card glass-panel">
                <div className="project-image-placeholder">
                  {p.title.includes("Document") && <FileSearch className="proj-placeholder-icon" />}
                  {p.title.includes("Cancer") && <ShieldCheck className="proj-placeholder-icon" />}
                  {p.title.includes("Sign") && <Eye className="proj-placeholder-icon" />}
                  {p.title.includes("Food") && <BarChart2 className="proj-placeholder-icon" />}
                  {p.title.includes("Garbage") && <Trash2 className="proj-placeholder-icon" />}
                  <span className="project-image-text">{p.title}</span>
                </div>

                <div className="project-info">
                  <div className="tech-tags">
                    {p.tech_stack.split(',').map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="project-card-title">{p.title}</h3>

                  <div className="project-actions">
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Dynamic Demo Lab Panel */}
        {activeDemo && (
          <div id="demo-lab-panel" className="demo-lab-panel glass-panel animated fadeIn">
            <div className="demo-lab-header">
              <div className="demo-badge badge badge-primary">Interactive Simulation Lab</div>
              <button onClick={() => setActiveDemo(null)} className="demo-close-btn">&times;</button>
            </div>

            {/* DEMO 1: Document Intelligence System */}
            {activeDemo === 'doc' && (
              <div className="demo-workspace">
                <div className="demo-controls">
                  <h4>Document Extraction Pipeline</h4>
                  <p className="demo-instruct">Select a document type to feed into the multi-agent OCR extraction system:</p>
                  
                  <div className="file-selector">
                    <button className={`file-option ${docFile === 'invoice' ? 'selected' : ''}`} onClick={() => setDocFile('invoice')}>
                      📄 Apex_Invoice.pdf
                    </button>
                    <button className={`file-option ${docFile === 'resume' ? 'selected' : ''}`} onClick={() => setDocFile('resume')}>
                      📄 CV_Indrajeet.docx
                    </button>
                    <button className={`file-option ${docFile === 'contract' ? 'selected' : ''}`} onClick={() => setDocFile('contract')}>
                      📄 Service_Agreement.pdf
                    </button>
                  </div>

                  <button onClick={runDocPipeline} className="btn btn-primary btn-run">
                    <RefreshCw size={16} />
                    <span>Run AI Extraction</span>
                  </button>
                </div>

                <div className="demo-screen">
                  {docStep === 0 ? (
                    <div className="screen-idle">
                      <Terminal size={32} className="idle-icon" />
                      <span>Pipeline ready. Select a file and click run.</span>
                    </div>
                  ) : (
                    <div className="pipeline-monitor">
                      <div className="terminal-panel">
                        <h5>System Logs</h5>
                        <div className="terminal-logs">
                          {docLog.map((log, idx) => (
                            <div key={idx} className="log-line">{log}</div>
                          ))}
                          {docStep > 0 && docStep < 6 && <div className="log-line log-loading">Processing...</div>}
                        </div>
                      </div>

                      <div className="pipeline-agents">
                        <div className={`agent-node ${docStep >= 2 ? 'active' : ''} ${docStep === 2 ? 'pulse' : ''}`}>
                          <div className="agent-indicator"></div>
                          <span>OCR Node</span>
                        </div>
                        <div className={`agent-node ${docStep >= 3 ? 'active' : ''} ${docStep === 3 ? 'pulse' : ''}`}>
                          <div className="agent-indicator"></div>
                          <span>Classification</span>
                        </div>
                        <div className={`agent-node ${docStep >= 4 ? 'active' : ''} ${docStep === 4 ? 'pulse' : ''}`}>
                          <div className="agent-indicator"></div>
                          <span>Extract Agent</span>
                        </div>
                        <div className={`agent-node ${docStep >= 5 ? 'active' : ''} ${docStep === 5 ? 'pulse' : ''}`}>
                          <div className="agent-indicator"></div>
                          <span>Validation Agent</span>
                        </div>
                      </div>

                      {docResult && (
                        <div className="pipeline-result animated fadeIn">
                          <h5>JSON Output Data</h5>
                          <pre>{JSON.stringify(docResult, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DEMO 2: Skin Cancer Detection */}
            {activeDemo === 'cancer' && (
              <div className="demo-workspace">
                <div className="demo-controls">
                  <h4>MobileNetV2 Classification Lab</h4>
                  <p className="demo-instruct">Choose a lesion sample for neural network scanning:</p>

                  <div className="lesion-selector">
                    <button className={`lesion-option ${cancerImg === 'lesion1' ? 'selected' : ''}`} onClick={() => setCancerImg('lesion1')}>
                      <div className="lesion-preview lesion-preview-1"></div>
                      <span>Lesion Sample A</span>
                    </button>
                    <button className={`lesion-option ${cancerImg === 'lesion2' ? 'selected' : ''}`} onClick={() => setCancerImg('lesion2')}>
                      <div className="lesion-preview lesion-preview-2"></div>
                      <span>Lesion Sample B</span>
                    </button>
                  </div>

                  <button onClick={runCancerAnalysis} className="btn btn-primary btn-run" disabled={cancerAnalyzing}>
                    {cancerAnalyzing ? 'Scanning...' : 'Analyze Image'}
                  </button>
                </div>

                <div className="demo-screen">
                  <div className="scan-window-wrapper">
                    <div className="scan-viewport">
                      <div className={`lesion-large-view ${cancerImg}`}>
                        {cancerAnalyzing && <div className="scanner-bar"></div>}
                      </div>
                    </div>

                    <div className="scan-results-box">
                      {cancerAnalyzing && (
                        <div className="scan-loader">
                          <RefreshCw className="spinner-icon" />
                          <span>Executing MobileNetV2 convolutions...</span>
                        </div>
                      )}
                      
                      {cancerResult && (
                        <div className="scan-report animated fadeIn">
                          <div className="report-header">
                            <h5>Diagnostic Report</h5>
                            <span className={`severity-tag ${cancerResult.severity.toLowerCase()}`}>
                              {cancerResult.severity} RISK
                            </span>
                          </div>
                          
                          <div className="report-item">
                            <span className="item-label">Classification:</span>
                            <span className="item-value highlight">{cancerResult.classification}</span>
                          </div>
                          <div className="report-item">
                            <span className="item-label">Model Confidence:</span>
                            <span className="item-value">{cancerResult.confidence}</span>
                          </div>
                          <div className="report-item p-column">
                            <span className="item-label">Preventive Advice:</span>
                            <span className="item-desc">{cancerResult.recommendations}</span>
                          </div>
                        </div>
                      )}

                      {!cancerAnalyzing && !cancerResult && (
                        <div className="scan-empty-state">
                          <Eye size={28} />
                          <span>Select a sample and trigger analysis.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 3: Indian Sign Language Recognition */}
            {activeDemo === 'sign' && (
              <div className="demo-workspace">
                <div className="demo-controls">
                  <h4>MediaPipe Skeletal Hand Tracker</h4>
                  <p className="demo-instruct">Choose a gesture sign to display and translate:</p>

                  <div className="gesture-selector">
                    {['hello', 'thanks', 'help', 'welcome'].map((gesture) => (
                      <button 
                        key={gesture} 
                        className={`gesture-option-btn ${signGesture === gesture ? 'selected' : ''}`}
                        onClick={() => setSignGesture(gesture)}
                      >
                        {gesture.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button onClick={runSignTracking} className="btn btn-primary btn-run" disabled={signTracking}>
                    {signTracking ? 'Processing mesh...' : 'Translate Gesture'}
                  </button>
                </div>

                <div className="demo-screen">
                  <div className="sign-viewport-wrapper">
                    <div className="sign-viewport">
                      <div className="hand-mesh-drawing">
                        {/* Custom animated hand mesh mapping layout using CSS dot shapes */}
                        <div className={`hand-landmark wrist ${signTracking ? 'visible' : ''}`}></div>
                        <div className={`hand-landmark thumb-base ${signTracking ? 'visible' : ''}`}></div>
                        <div className={`hand-landmark thumb-tip ${signTracking ? 'visible' : ''} ${signGesture}`}></div>
                        <div className={`hand-landmark index-base ${signTracking ? 'visible' : ''}`}></div>
                        <div className={`hand-landmark index-tip ${signTracking ? 'visible' : ''} ${signGesture}`}></div>
                        <div className={`hand-landmark middle-tip ${signTracking ? 'visible' : ''} ${signGesture}`}></div>
                        <div className={`hand-landmark pinky-tip ${signTracking ? 'visible' : ''} ${signGesture}`}></div>
                        <svg className="landmark-connections">
                          {signTracking && (
                            <line x1="50%" y1="90%" x2="40%" y2="70%" stroke="var(--secondary)" strokeWidth="2" />
                          )}
                        </svg>
                        <span className="sign-label-tag">MediaPipe Tracking Layer</span>
                      </div>
                    </div>

                    <div className="sign-output-panel">
                      {signTracking ? (
                        <div className="sign-loading">
                          <RefreshCw className="spinner-icon" />
                          <span>Mapping skeletal nodes...</span>
                        </div>
                      ) : signResult ? (
                        <div className="sign-result-text animated fadeIn">
                          <CheckCircle2 className="success-icon" />
                          <span>{signResult}</span>
                        </div>
                      ) : (
                        <div className="sign-empty">
                          <span>Select gesture sign to translate.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 4: Food Production Analytics */}
            {activeDemo === 'food' && (
              <div className="demo-workspace">
                <div className="demo-controls">
                  <h4>Global Food Analytics</h4>
                  <p className="demo-instruct">Select regional dashboard filtering:</p>
                  
                  <div className="region-selector">
                    <button className={`region-btn ${analyticsRegion === 'global' ? 'selected' : ''}`} onClick={() => setAnalyticsRegion('global')}>
                      Global Yields
                    </button>
                    <button className={`region-btn ${analyticsRegion === 'asia' ? 'selected' : ''}`} onClick={() => setAnalyticsRegion('asia')}>
                      Asia-Pacific
                    </button>
                    <button className={`region-btn ${analyticsRegion === 'europe' ? 'selected' : ''}`} onClick={() => setAnalyticsRegion('europe')}>
                      Europe & Americas
                    </button>
                  </div>
                </div>

                <div className="demo-screen">
                  <div className="dashboard-mockup">
                    <div className="dash-header">
                      <h5>Global Food Production Trends ({analyticsRegion.toUpperCase()})</h5>
                    </div>
                    
                    <div className="dash-charts">
                      <div className="chart-card glass-panel">
                        <h6>Crop Yield Distribution (MT)</h6>
                        <div className="svg-chart-container">
                          {/* Beautiful SVG dynamic bar chart */}
                          <svg className="bar-chart-svg" viewBox="0 0 300 150">
                            {/* Gridlines */}
                            <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" />
                            <line x1="30" y1="70" x2="280" y2="70" stroke="rgba(255,255,255,0.05)" />
                            <line x1="30" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.05)" />
                            
                            {/* Bars depending on region */}
                            {analyticsRegion === 'global' && (
                              <>
                                <rect x="50" y="40" width="30" height="80" rx="3" fill="var(--primary)" />
                                <rect x="110" y="60" width="30" height="60" rx="3" fill="var(--secondary)" />
                                <rect x="170" y="30" width="30" height="90" rx="3" fill="var(--accent)" />
                                <rect x="230" y="80" width="30" height="40" rx="3" fill="var(--text-muted)" />
                              </>
                            )}
                            {analyticsRegion === 'asia' && (
                              <>
                                <rect x="50" y="20" width="30" height="100" rx="3" fill="var(--primary)" />
                                <rect x="110" y="70" width="30" height="50" rx="3" fill="var(--secondary)" />
                                <rect x="170" y="50" width="30" height="70" rx="3" fill="var(--accent)" />
                                <rect x="230" y="90" width="30" height="30" rx="3" fill="var(--text-muted)" />
                              </>
                            )}
                            {analyticsRegion === 'europe' && (
                              <>
                                <rect x="50" y="70" width="30" height="50" rx="3" fill="var(--primary)" />
                                <rect x="110" y="40" width="30" height="80" rx="3" fill="var(--secondary)" />
                                <rect x="170" y="40" width="30" height="80" rx="3" fill="var(--accent)" />
                                <rect x="230" y="60" width="30" height="60" rx="3" fill="var(--text-muted)" />
                              </>
                            )}

                            {/* Labels */}
                            <text x="65" y="135" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Rice</text>
                            <text x="125" y="135" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Wheat</text>
                            <text x="185" y="135" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Maize</text>
                            <text x="245" y="135" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Barley</text>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="chart-card glass-panel">
                        <h6>Comparative Regional Growth</h6>
                        <div className="dash-metrics-list">
                          <div className="dash-metric-item">
                            <span>Yield Growth Rate</span>
                            <span className="val success">+4.8%</span>
                          </div>
                          <div className="dash-metric-item">
                            <span>Water Utilization</span>
                            <span className="val">-12% (Optimized)</span>
                          </div>
                          <div className="dash-metric-item">
                            <span>Automation Coverage</span>
                            <span className="val">84%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .projects-section {
          background-color: var(--bg-secondary);
        }

        .projects-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .filter-btn {
          cursor: pointer;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: 8px 18px;
          transition: all var(--transition-normal);
          font-size: 0.9rem;
        }

        .filter-btn:hover {
          border-color: var(--primary);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
          border-color: var(--primary);
          color: #fff;
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .loading-spinner {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 60px 0;
          color: var(--text-secondary);
        }

        .spinner-icon {
          animation: spin 1.5s linear infinite;
        }

        .project-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-image-placeholder {
          height: 180px;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding: 24px;
          text-align: center;
          position: relative;
        }

        .proj-placeholder-icon {
          color: var(--secondary);
          width: 40px;
          height: 40px;
          opacity: 0.8;
        }

        .project-image-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .project-info {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 3px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }

        .project-card-title {
          font-size: 1.3rem;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .project-card-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
          flex: 1;
        }

        .project-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }

        .btn-glow:hover {
          box-shadow: 0 0 10px var(--primary-glow);
          border-color: var(--primary);
        }

        /* Demo Lab Panel Styling */
        .demo-lab-panel {
          margin-top: 60px;
          padding: 40px;
          border-radius: var(--radius-lg);
          border-color: var(--secondary);
          box-shadow: 0 10px 40px rgba(0, 225, 217, 0.08);
        }

        .demo-lab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .demo-close-btn {
          font-size: 2rem;
          line-height: 1;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .demo-close-btn:hover {
          color: var(--error);
        }

        .demo-workspace {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        .demo-controls h4 {
          font-size: 1.4rem;
          margin-bottom: 8px;
        }

        .demo-instruct {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .file-selector, .lesion-selector, .gesture-selector, .region-selector {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .file-option, .region-btn {
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          text-align: left;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .file-option:hover, .region-btn:hover {
          border-color: var(--secondary);
          background: rgba(0, 225, 217, 0.03);
        }

        .file-option.selected, .region-btn.selected {
          border-color: var(--secondary);
          background: rgba(0, 225, 217, 0.08);
          color: var(--secondary);
          font-weight: 600;
        }

        .btn-run {
          width: 100%;
          padding: 14px;
        }

        .demo-screen {
          background: #060913;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          min-height: 380px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .screen-idle {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--text-muted);
        }

        .idle-icon {
          opacity: 0.4;
        }

        .pipeline-monitor {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }

        .terminal-panel {
          background: #02040a;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: var(--radius-sm);
          padding: 12px;
        }

        .terminal-panel h5 {
          font-family: monospace;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 8px;
        }

        .terminal-logs {
          font-family: monospace;
          font-size: 0.85rem;
          color: #00ff66;
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 120px;
          overflow-y: auto;
        }

        .log-loading {
          color: var(--secondary);
          animation: pulse 1s infinite;
        }

        .pipeline-agents {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          text-align: center;
        }

        .agent-node {
          padding: 10px 4px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .agent-node.active {
          color: var(--text-primary);
          border-color: var(--secondary);
          background: rgba(0, 225, 217, 0.03);
        }

        .agent-node.pulse .agent-indicator {
          background: var(--secondary);
          box-shadow: 0 0 8px var(--secondary);
          animation: pulse 1s infinite;
        }

        .agent-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .agent-node.active .agent-indicator {
          background: var(--success);
        }

        .pipeline-result {
          background: #02040a;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: var(--radius-sm);
          padding: 16px;
          flex: 1;
        }

        .pipeline-result h5 {
          font-family: monospace;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 8px;
        }

        .pipeline-result pre {
          font-family: monospace;
          font-size: 0.8rem;
          color: #00d9ff;
          white-space: pre-wrap;
          overflow-y: auto;
          max-height: 140px;
        }

        /* Demo 2 specific lesion analysis */
        .lesion-selector {
          flex-direction: row;
        }

        .lesion-option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          gap: 8px;
          transition: all var(--transition-normal);
        }

        .lesion-option.selected {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          color: var(--primary);
        }

        .lesion-preview {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }

        .lesion-preview-1 {
          background-image: radial-gradient(circle, #a25c38 20%, #6e3a1f 70%, transparent 75%);
        }

        .lesion-preview-2 {
          background-image: radial-gradient(circle, #c4a482 10%, #aa8c68 60%, transparent 65%);
        }

        .scan-window-wrapper {
          display: grid;
          grid-template-rows: 1.2fr 0.8fr;
          height: 100%;
          flex: 1;
        }

        .scan-viewport {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #02040a;
          border-bottom: 1px solid var(--border-color);
          padding: 20px;
        }

        .lesion-large-view {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          position: relative;
          background-size: cover;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.1);
        }

        .lesion-large-view.lesion1 {
          background-image: radial-gradient(circle, #a25c38 20%, #6e3a1f 70%, #02040a 75%);
        }

        .lesion-large-view.lesion2 {
          background-image: radial-gradient(circle, #c4a482 10%, #aa8c68 60%, #02040a 65%);
        }

        .scanner-bar {
          position: absolute;
          width: 100%;
          height: 3px;
          background: #00ff66;
          box-shadow: 0 0 8px #00ff66;
          animation: scan 2s linear infinite;
        }

        .scan-results-box {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .scan-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--text-secondary);
        }

        .scan-report {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 8px;
          margin-bottom: 4px;
        }

        .severity-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        .severity-tag.high {
          background: rgba(255, 71, 71, 0.1);
          color: var(--error);
          border: 1px solid var(--error);
        }

        .severity-tag.low {
          background: rgba(0, 225, 217, 0.1);
          color: var(--secondary);
          border: 1px solid var(--secondary);
        }

        .report-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .report-item.p-column {
          flex-direction: column;
          gap: 4px;
        }

        .item-label {
          color: var(--text-muted);
        }

        .item-value.highlight {
          color: var(--secondary);
          font-weight: 700;
        }

        .item-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .scan-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-muted);
          gap: 8px;
        }

        /* Demo 3 specifics */
        .gesture-selector {
          flex-direction: row;
          flex-wrap: wrap;
        }

        .gesture-option-btn {
          flex: 1;
          min-width: 80px;
          padding: 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .gesture-option-btn.selected {
          border-color: var(--secondary);
          background: rgba(0,225,217,0.08);
          color: var(--secondary);
        }

        .sign-viewport-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .sign-viewport {
          flex: 1.2;
          background: #02040a;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hand-mesh-drawing {
          width: 200px;
          height: 200px;
          position: relative;
          border: 1px dashed rgba(255,255,255,0.05);
          border-radius: var(--radius-md);
        }

        .hand-landmark {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00ff66;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.5s ease;
        }

        .hand-landmark.visible {
          opacity: 1;
        }

        .wrist {
          left: 50%;
          bottom: 10%;
          transform: translateX(-50%);
        }

        .thumb-base {
          left: 30%;
          bottom: 30%;
        }

        .thumb-tip {
          left: 20%;
          bottom: 45%;
        }

        .thumb-tip.hello {
          left: 25%;
          bottom: 40%;
        }

        .index-base {
          left: 45%;
          bottom: 50%;
        }

        .index-tip {
          left: 45%;
          bottom: 80%;
        }

        .index-tip.thanks {
          left: 48%;
          bottom: 60%;
        }

        .middle-tip {
          left: 55%;
          bottom: 82%;
        }

        .middle-tip.thanks {
          left: 52%;
          bottom: 60%;
        }

        .pinky-tip {
          left: 75%;
          bottom: 70%;
        }

        .sign-label-tag {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .sign-output-panel {
          flex: 0.8;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sign-loading {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
        }

        .sign-result-text {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--success);
        }

        .sign-empty {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Demo 4 specifics */
        .region-selector {
          flex-direction: row;
        }

        .region-btn {
          flex: 1;
          text-align: center;
        }

        .dashboard-mockup {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
        }

        .dash-charts {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 16px;
        }

        .chart-card {
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .chart-card h6 {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .svg-chart-container {
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bar-chart-svg rect {
          transition: height 0.5s ease, y 0.5s ease;
        }

        .dash-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dash-metric-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .dash-metric-item span {
          color: var(--text-secondary);
        }

        .dash-metric-item .val {
          font-weight: 600;
          color: var(--text-primary);
        }

        .dash-metric-item .val.success {
          color: var(--success);
        }

        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        @media (max-width: 992px) {
          .demo-workspace {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .lesion-selector, .gesture-selector {
            flex-direction: row;
          }

          .dash-charts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
