import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="title"
          >
            Find Our Shop
          </motion.h1>
          <p className="subtitle">Visit us at Peramballur! We'd love to help you find the perfect toy.</p>
        </div>
      </header>

      <section className="section contact-section">
        <div className="container contact-grid">
          <motion.div 
            className="contact-info-cards"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card info-card" onClick={() => handleCopy("A1/5, Peramballur New Bus Stand", "loc")}>
              <div className="icon-box-large secondary">
                <MapPin size={24} />
              </div>
              <div className="info-content">
                <div className="info-header">
                   <h3>Our Location</h3>
                   <span className={`copy-badge ${copiedType === "loc" ? "active" : ""}`}>
                      {copiedType === "loc" ? <Check size={14} /> : <Copy size={14} />}
                   </span>
                </div>
                <p>A1/5, Peramballur New Bus Stand</p>
                <p>Peramballur, Tamil Nadu</p>
              </div>
            </div>

            <div className="card info-card" onClick={() => handleCopy("+91 98765 43210", "phone")}>
              <div className="icon-box-large accent">
                <Phone size={24} />
              </div>
              <div className="info-content">
                <div className="info-header">
                   <h3>Contact Us</h3>
                   <span className={`copy-badge ${copiedType === "phone" ? "active" : ""}`}>
                      {copiedType === "phone" ? <Check size={14} /> : <Copy size={14} />}
                   </span>
                </div>
                <p>+91 98765 43210</p>
                <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="card info-card" onClick={() => handleCopy("Mon - Sat: 9:00 AM - 9:30 PM", "hours")}>
              <div className="icon-box-large success">
                <Clock size={24} />
              </div>
              <div className="info-content">
                <div className="info-header">
                   <h3>Store Hours</h3>
                   <span className={`copy-badge ${copiedType === "hours" ? "active" : ""}`}>
                      {copiedType === "hours" ? <Check size={14} /> : <Copy size={14} />}
                   </span>
                </div>
                <p>Mon - Sat: 9:00 AM - 9:30 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Say Hello!</h2>
            <p>Have a question or looking for a specific toy? Let us know!</p>
            
            <form className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your number" />
              </div>
              <div className="form-group">
                <label>What are you looking for?</label>
                <textarea rows={4} placeholder="Describe the toy or your question..."></textarea>
              </div>
              <button type="button" className="btn btn-secondary w-full">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <style>{`
        .contact-page { padding-top: 80px; }
        .contact-header { background: linear-gradient(135deg, var(--primary) 0%, #FFEA9F 100%); padding: 120px 0 100px; text-align: center; border-radius: 0 0 60px 60px; margin-top: -80px; position: relative; overflow: hidden; }
        .title { font-size: clamp(36px, 6vw, 72px); margin-bottom: 24px; color: var(--foreground); font-weight: 800; letter-spacing: -1px; }
        .subtitle { font-size: 20px; color: #555; max-width: 600px; margin: 0 auto; font-weight: 600; }
        
        .contact-grid { display: grid; gap: 48px; margin-top: 48px; }
        .contact-info-cards { display: flex; flex-direction: column; gap: 32px; }
        .info-card { padding: 40px; display: flex; align-items: center; gap: 32px; border: 2px solid #fff; }
        .icon-box-large { width: 72px; height: 72px; border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .icon-box-large.secondary { background-color: var(--secondary); }
        .icon-box-large.accent { background-color: var(--accent); }
        .icon-box-large.success { background-color: var(--success); }
        
        .info-content h3 { margin-bottom: 12px; font-size: 24px; font-weight: 800; color: var(--foreground); }
        .info-content p { color: #555; font-size: 18px; font-weight: 500; line-height: 1.4; }
        
        .contact-form-card { padding: 60px; border: 2px solid #fff; position: relative; overflow: hidden; }
        .contact-form-card h2 { margin-bottom: 12px; font-size: 40px; font-weight: 800; color: var(--foreground); }
        .contact-form-card p { color: #666; margin-bottom: 40px; font-size: 18px; font-weight: 500; }
        
        .contact-form { display: flex; flex-direction: column; gap: 28px; }
        .form-group { display: flex; flex-direction: column; gap: 12px; }
        .form-group label { font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; color: #444; }
        .form-group input, .form-group textarea { padding: 18px 24px; border: 3px solid #f0f0f0; border-radius: 20px; font-family: inherit; font-size: 16px; transition: var(--transition); background: #fafafa; }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--secondary); outline: none; background: #fff; transform: scale(1.02); }
        .w-full { width: 100%; justify-content: center; padding: 18px !important; }

        @media (min-width: 992px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr; }
        }
      `}</style>
    </div>
  );
}
