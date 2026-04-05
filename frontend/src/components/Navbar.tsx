import { Link } from "react-router-dom";
import { useState } from "react";
import { Rocket, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Rocket className="logo-icon animate-float" size={32} />
          <span>TOYS STORE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/admin/login" className="btn btn-secondary btn-sm">Admin</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} /> }
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/admin/login" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}

      <style>{`
        .navbar {
          background: #fff;
          padding: 20px 0;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 800;
          color: var(--secondary);
          letter-spacing: -0.5px;
        }
        .logo-icon {
          color: var(--accent);
        }
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-weight: 700;
          font-size: 16px;
          color: #444;
          transition: 0.3s;
        }
        .nav-link:hover {
          color: var(--secondary);
        }
        .btn-sm { padding: 8px 18px; font-size: 14px; }
        .mobile-toggle { display: block; color: var(--foreground); }
        
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #fff;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          border-top: 1px solid #eee;
        }
        .mobile-menu a { font-weight: 700; font-size: 18px; }

        @media (min-width: 768px) {
          .desktop-menu { display: flex; }
          .mobile-toggle { display: none; }
          .mobile-menu { display: none; }
        }
      `}</style>
    </nav>
  );
}
