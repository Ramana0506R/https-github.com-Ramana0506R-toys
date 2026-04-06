import { Rocket, MapPin, Phone, Mail, Share2, MessageCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

export default function Footer() {
  const [copiedStore, setCopiedStore] = useState(false);
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <div className="logo-icon-wrapper">
              <Rocket className="logo-icon" size={24} />
            </div>
            <span>TOYS STORE</span>
          </div>
          <p className="footer-desc">
            Bringing joy and imagination to every child in Peramballur. Discover our amazing collection of toys today!
          </p>
          <div className="social-links">
                <a href="tel:+919342318163" className="btn btn-secondary glass">Call Us</a>
                <button 
                  className={`social-icon share-btn ${copiedStore ? "active" : ""}`} 
                  onClick={async () => {
                    const success = await copyToClipboard(window.location.origin);
                    if (success) {
                        setCopiedStore(true);
                        setTimeout(() => setCopiedStore(false), 2000);
                    }
                  }}
                  title="Copy Store Link"
                >
                  {copiedStore ? <Check size={18} /> : <Share2 size={18} />}
                </button>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/admin/login">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Find Us</h4>
          <div className="contact-item">
            <div className="icon-circle"><MapPin size={18} /></div>
            <span>A1/5, Peramballur New Bus Stand</span>
          </div>
          <div className="contact-item">
             <div className="icon-circle"><Phone size={18} /></div>
            <span>+91 93423 18163</span>
          </div>
          <div className="contact-item">
             <div className="icon-circle"><Mail size={18} /></div>
            <span>hello@toysstore.com</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TOYS STORE. Designed with <span className="text-accent">❤</span> for Kids.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #fff;
          padding: 100px 0 0;
          border-top: 1px solid #eee;
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          gap: 60px;
          margin-bottom: 80px;
        }
        .footer-brand { max-width: 400px; }
        .footer-logo { margin-bottom: 24px; font-size: 28px; color: var(--secondary); display: flex; align-items: center; gap: 12px; font-family: var(--font-heading); font-weight: 800; }
        .logo-icon-wrapper { background: var(--primary); padding: 10px; border-radius: 12px; display: flex; color: #000; }
        .footer-desc { color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 24px; }
        
        .social-links { display: flex; gap: 12px; }
        .social-icon { width: 44px; height: 44px; border-radius: 50%; background: #f5f5f5; display: flex; align-items: center; justify-content: center; color: #444; transition: 0.3s; }
        .social-icon:hover { background: var(--secondary); color: #fff; transform: translateY(-5px); }

        .footer-links h4, .footer-contact h4 { margin-bottom: 32px; font-size: 20px; font-weight: 800; }
        .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .footer-links a { color: #555; transition: 0.3s; font-weight: 600; }
        .footer-links a:hover { color: var(--secondary); padding-left: 8px; }
        
        .footer-contact { display: flex; flex-direction: column; gap: 20px; }
        .contact-item { display: flex; align-items: center; gap: 16px; color: #555; font-weight: 600; }
        .icon-circle { width: 36px; height: 36px; border-radius: 50%; background: #f0f7ff; display: flex; align-items: center; justify-content: center; color: var(--secondary); }
        
        .footer-bottom { 
          text-align: center; 
          padding: 40px 0; 
          border-top: 1px solid #eee; 
          background: #fafafa;
          color: #888; 
          font-size: 14px; 
          font-weight: 600;
        }
        .text-accent { color: var(--accent); }

        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.5fr 0.8fr 1.2fr; }
        }
      `}</style>
    </footer>
  );
}
