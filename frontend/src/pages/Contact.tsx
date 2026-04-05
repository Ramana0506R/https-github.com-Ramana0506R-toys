import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export default function Contact() {
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
            <div className="card info-card">
              <div className="icon-wrapper secondary">
                <MapPin size={24} />
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>A1/5, Peramballur New Bus Stand</p>
                <p>Peramballur, Tamil Nadu</p>
              </div>
            </div>

            <div className="card info-card">
              <div className="icon-wrapper accent">
                <Phone size={24} />
              </div>
              <div className="info-content">
                <h3>Contact Us</h3>
                <p>+91 98765 43210</p>
                <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="card info-card">
              <div className="icon-wrapper success">
                <Clock size={24} />
              </div>
              <div className="info-content">
                <h3>Store Hours</h3>
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
        .contact-header { background-color: var(--primary); padding: 100px 0; text-align: center; border-radius: 0 0 40px 40px; }
        .title { font-size: clamp(32px, 5vw, 64px); margin-bottom: 20px; color: var(--foreground); }
        .subtitle { font-size: 18px; color: #555; max-width: 600px; margin: 0 auto; }
        .contact-grid { display: grid; gap: 40px; }
        .contact-info-cards { display: flex; flex-direction: column; gap: 24px; }
        .info-card { padding: 32px; display: flex; align-items: center; gap: 24px; }
        .icon-wrapper { width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
        .icon-wrapper.secondary { background-color: var(--secondary); }
        .icon-wrapper.accent { background-color: var(--accent); }
        .icon-wrapper.success { background-color: var(--success); }
        .info-content h3 { margin-bottom: 8px; font-size: 20px; }
        .info-content p { color: #666; font-size: 16px; }
        
        .contact-form-card { padding: 48px; }
        .contact-form-card h2 { margin-bottom: 8px; font-size: 32px; }
        .contact-form-card p { color: #666; margin-bottom: 32px; }
        .contact-form { display: flex; flex-direction: column; gap: 24px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-weight: 700; font-size: 14px; }
        .form-group input, .form-group textarea { padding: 14px 20px; border: 2px solid #eee; border-radius: 16px; font-family: inherit; font-size: 16px; transition: 0.3s; }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--secondary); outline: none; }
        .w-full { width: 100%; justify-content: center; }

        @media (min-width: 992px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr; }
        }
      `}</style>
    </div>
  );
}
