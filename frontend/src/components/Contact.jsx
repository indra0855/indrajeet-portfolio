import React, { useState } from 'react';
import { submitContact } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic verification
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMsg('Please fill in all the fields.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      await submitContact(formData);
      setStatus('success');
      
      // Clear form inputs
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Canvas confetti celebration explosion
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#00e1d9', '#d946ef']
      });

    } catch (error) {
      console.error('Contact submission failed:', error);
      setStatus('error');
      setErrorMsg(error.message || 'Failed to submit message. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-header">
          <h2>Let's Connect</h2>
          <p>Actively open to opportunities and ready to build intelligent products that make a real business impact.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Information Details */}
          <div className="contact-info-panel glass-panel">
            <h3>Contact Information</h3>
            <p className="info-intro">Feel free to reach out directly through the form or using the details below.</p>

            <div className="info-details-list">
              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Mail size={18} />
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:indrajeetkumbhar23121@gmail.com" className="hover-link">indrajeetkumbhar23121@gmail.com</a>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Phone size={18} />
                </div>
                <div>
                  <strong>Phone</strong>
                  <span>+91 8329458281</span>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong>Location</strong>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>

            <div className="socials-container">
              <h4>Social Profiles</h4>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/indrajeet-kumbhar-a0b888266/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/indra0855" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form Panel */}
          <div className="contact-form-panel glass-panel">
            <h3>Send a Message</h3>
            
            {status === 'success' ? (
              <div className="form-success-box animated fadeIn">
                <CheckCircle2 size={48} className="success-icon-large" />
                <h4>Thank You!</h4>
                <p>Your message has been submitted successfully. I will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-secondary btn-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {status === 'error' && (
                  <div className="form-error-box animated fadeIn">
                    <AlertCircle size={20} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Indrajeet Kumbhar"
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your-email@gmail.com"
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Project Collaboration / Job Opening"
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Describe your project, timeline, or job opportunities..."
                    required
                    disabled={status === 'submitting'}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn" 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: start;
        }

        .contact-info-panel, .contact-form-panel {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-info-panel h3, .contact-form-panel h3 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }

        .info-intro {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
        }

        .info-details-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin: 16px 0;
        }

        .info-detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .info-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
        }

        .info-detail-item strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .info-detail-item span, .info-detail-item a {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .hover-link:hover {
          color: var(--primary);
        }

        .socials-container {
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .socials-container h4 {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-normal);
        }

        .social-icon-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          transform: translateY(-2px);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
        }

        .form-error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255, 71, 71, 0.05);
          border: 1px solid var(--error);
          border-radius: var(--radius-md);
          color: var(--error);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .form-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 16px;
          padding: 40px 0;
        }

        .success-icon-large {
          color: var(--success);
        }

        .form-success-box h4 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .form-success-box p {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 320px;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </section>
  );
}
