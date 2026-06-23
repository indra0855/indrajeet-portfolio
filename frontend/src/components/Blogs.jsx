import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, X } from 'lucide-react';

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Understanding OCR from Scratch",
      summary: "Dive deep into computer vision pre-processing, layout analysis, bounding box extraction, and characters recognition modeling.",
      date: "May 14, 2026",
      readTime: "8 min read",
      tags: ["Computer Vision", "OCR", "OpenCV"],
      content: `
        Optical Character Recognition (OCR) is more than just passing an image to a library. To build robust OCR, one must master:
        
        1. Pre-processing: Deskewing, binarization, noise cancellation, and thresholding with OpenCV.
        2. Layout Analysis: Segmenting text lines, detecting paragraph columns, and table structures.
        3. Character Recognition: Traditional template matching vs. modern deep learning sequence-to-sequence models (CRNN + CTC Loss).
        
        By designing custom binarization kernels, we can improve extraction accuracy on noisy invoices by over 15%.
      `
    },
    {
      id: 2,
      title: "How RAG Improves AI Systems",
      summary: "Explore Retrieval-Augmented Generation: text splitting, vector search indices, similarity metrics, and grounded context feeding.",
      date: "April 28, 2026",
      readTime: "6 min read",
      tags: ["RAG", "LLM", "Vector DB"],
      content: `
        Retrieval-Augmented Generation (RAG) resolves LLM hallucinations by injecting verified, grounded documents directly into the prompt context.
        
        Key pipeline elements include:
        - Chunking: Using recursive character text splitters to preserve semantics.
        - Embedding: Computing semantic representation vectors.
        - Indexing: Structuring FAISS/Chroma search grids.
        - Retrieval: Pulling top-K chunks using cosine similarity.
        - Synthesis: Packaging retrieved chunks with the user prompt for LLM consumption.
        
        A modular RAG structure lets us customize search criteria, improving retrieval recall significantly.
      `
    },
    {
      id: 3,
      title: "Building Multi-Agent AI with LangGraph",
      summary: "A guide to state-driven agent architectures, validation loops, and dynamic task routing using LangGraph and LangChain.",
      date: "March 18, 2026",
      readTime: "10 min read",
      tags: ["LangGraph", "AI Agents", "Python"],
      content: `
        Traditional linear LLM chains fail on complex workflows. LangGraph introduces state graphs, nodes, and edges, allowing:
        
        - Cyclic graphs for validation feedback loops.
        - Conditional routing based on node decisions.
        - Persistence of conversation history.
        - Human-in-the-loop approvals.
        
        In document processing, we structure nodes for Parsing, Classifying, and Validating, creating autonomous error-correction cycles.
      `
    },
    {
      id: 4,
      title: "FastAPI Best Practices",
      summary: "Design scalable APIs with Pydantic validations, async handlers, DB connection pooling, and lifespan startup routines.",
      date: "Feb 05, 2026",
      readTime: "5 min read",
      tags: ["FastAPI", "Python", "Web Dev"],
      content: `
        FastAPI is the go-to backend framework for AI engineering. Best practices for production-ready setups include:
        
        - Lifespan contexts for startup database seeding and cleanup.
        - Dependency Injection for database sessions.
        - Pydantic models for request and response validation schemas.
        - Async handlers to handle concurrent network requests.
        
        Using non-blocking databases and properly configured CORS keeps latency low for high-frequency model queries.
      `
    },
    {
      id: 5,
      title: "Computer Vision Fundamentals",
      summary: "Learn OpenCV transformations, edge detection algorithms, and deep convolution mappings for real-world object recognition.",
      date: "Jan 12, 2026",
      readTime: "7 min read",
      tags: ["Computer Vision", "OpenCV", "Deep Learning"],
      content: `
        Computer Vision is the gateway to spatial AI. Understanding spatial transformations involves:
        
        - Color spaces: converting RGB to HSV/Gray.
        - Filtering: Gaussian blur, Sobel edge detectors, Canny algorithms.
        - CNN Features: How convolution layers detect lines, textures, and object structures.
        
        These techniques form the foundation of our Sign Language Recognition tracking mesh and Skin Cancer classification viewport.
      `
    },
    {
      id: 6,
      title: "Enterprise AI Document Processing",
      summary: "Scale OCR, classification, validation, and analytics across thousands of files using containerized microservices.",
      date: "Dec 18, 2025",
      readTime: "9 min read",
      tags: ["Enterprise AI", "Docker", "PostgreSQL"],
      content: `
        Scaling document intelligence to enterprise volumes requires robust systems design:
        
        - Docker containerization for independent model scaling.
        - PostgreSQL indexes for structured database lookups.
        - Background tasks to prevent blocking API responses during extraction.
        
        We can run multiple extractors concurrently by isolating model workloads behind stateless message brokers.
      `
    }
  ];

  return (
    <section id="blogs" className="blogs-section section">
      <div className="container">
        <div className="section-header">
          <h2>Technical Blog Topics</h2>
          <p>Thoughts and guides on building AI agents, configuring neural networks, and optimizing backend systems.</p>
        </div>

        <div className="blogs-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card glass-panel">
              <div className="blog-header-meta">
                <span className="blog-date">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </span>
                <span className="blog-read-time">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-summary">{post.summary}</p>

              <div className="blog-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="blog-tag-badge">{tag}</span>
                ))}
              </div>

              <button onClick={() => setSelectedBlog(post)} className="blog-read-btn">
                <span>Read Article</span>
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Read Article Modal Overlay */}
        {selectedBlog && (
          <div className="blog-modal-overlay animated fadeIn">
            <div className="blog-modal glass-panel animated slideDown">
              <div className="modal-header-actions">
                <button onClick={() => setSelectedBlog(null)} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body-content">
                <div className="blog-header-meta">
                  <span className="blog-date">
                    <Calendar size={14} />
                    <span>{selectedBlog.date}</span>
                  </span>
                  <span className="blog-read-time">
                    <Clock size={14} />
                    <span>{selectedBlog.readTime}</span>
                  </span>
                </div>

                <h3 className="modal-blog-title">{selectedBlog.title}</h3>
                
                <div className="modal-tags">
                  {selectedBlog.tags.map((tag, i) => (
                    <span key={i} className="blog-tag-badge">{tag}</span>
                  ))}
                </div>

                <div className="blog-full-content">
                  {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .blogs-section {
          background-color: var(--bg-secondary);
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .blog-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .blog-header-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .blog-date, .blog-read-time {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .blog-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          flex: 1;
        }

        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .blog-tag-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-full);
          color: var(--primary);
        }

        .blog-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--secondary);
          cursor: pointer;
          align-self: flex-start;
          transition: transform var(--transition-fast);
        }

        .blog-read-btn:hover {
          transform: translateX(4px);
        }

        /* Modal styling */
        .blog-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .blog-modal {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          overflow-y: auto;
          position: relative;
          padding: 40px;
        }

        .modal-header-actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .modal-close-btn {
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--error);
        }

        .modal-blog-title {
          font-size: 2rem;
          margin: 12px 0;
          color: var(--text-primary);
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .blog-full-content {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .blog-full-content p {
          white-space: pre-line;
        }
      `}</style>
    </section>
  );
}
