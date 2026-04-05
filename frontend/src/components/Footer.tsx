import { Rocket, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <Rocket className="logo-icon animate-float" size={28} />
            <span>TOYS STORE</span>
          </div>
          <p className="footer-desc">Bringing joy and imagination to every child. Discover our amazing collection!</p>
        </div>

        <div className="footer-links">
          <h4>Menu</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin/login">Admin Admin</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Address</h4>
          <div className="contact-item">
            <MapPin size={20} className="icon" />
            <span>A1/5, Peramballur New Bus Stand</span>
          </div>
          <div className="contact-item">
            <Phone size={20} className="icon" />
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <Mail size={20} className="icon" />
            <span>hello@toysstore.com</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TOYS STORE. Made with Joy.</p>
      </div>

      <style>{`
        .footer {
          background: #fff;
          padding: 80px 0 40px;
          border-top: 1px solid #eee;
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          gap: 60px;
          margin-bottom: 60px;
        }
        .footer-brand { max-width: 400px; }
        .footer-logo { margin-bottom: 24px; font-size: 28px; color: var(--secondary); display: flex; align-items: center; gap: 12px; font-family: var(--font-heading); font-weight: 800; }
        .logo-icon { color: var(--accent); }
        .footer-desc { color: #666; line-height: 1.6; }
        
        .footer-links h4, .footer-contact h4 { margin-bottom: 24px; font-size: 20px; }
        .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { color: #666; transition: 0.3s; }
        .footer-links a:hover { color: var(--secondary); padding-left: 8px; }
        
        .footer-contact { display: flex; flex-direction: column; gap: 16px; }
        .contact-item { display: flex; align-items: center; gap: 12px; color: #666; }
        .contact-item .icon { color: var(--secondary); }
        
        .footer-bottom { 
          text-align: center; 
          padding-top: 40px; 
          border-top: 1px solid #eee; 
          color: #999; 
          font-size: 14px; 
        }

        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}
