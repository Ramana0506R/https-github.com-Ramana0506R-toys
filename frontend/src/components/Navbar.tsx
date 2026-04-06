import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rocket, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "glass scrolled" : ""}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <div className="logo-icon-wrapper animate-float">
            <Rocket className="logo-icon" size={28} />
          </div>
          <span>TOYS STORE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/admin/login" className="btn btn-secondary btn-sm pulse-hover">Admin</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} /> }
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <Link to="/admin/login" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Admin Panel</Link>
      </div>

      <style>{`
        .navbar {
          background: transparent;
          padding: 24px 0;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          padding: 16px 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.05);
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
          font-size: 26px;
          font-weight: 800;
          color: var(--secondary);
          letter-spacing: -0.5px;
        }
        .logo-icon-wrapper {
          background: var(--primary);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          transform: rotate(-10deg);
        }
        .logo-icon {
          color: #000;
        }
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 40px;
        }
        .nav-link {
          font-weight: 700;
          font-size: 16px;
          color: var(--foreground);
          transition: 0.3s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--primary);
          border-radius: 10px;
          transition: 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: var(--secondary);
        }
        .btn-sm { padding: 10px 24px; font-size: 14px; }
        .mobile-toggle { display: block; color: var(--foreground); background: transparent; }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          max-width: 300px;
          height: 100vh;
          background: #fff;
          padding: 100px 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          transition: 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
          z-index: 999;
        }
        .mobile-menu.open {
          right: 0;
        }
        .mobile-menu a { font-weight: 800; font-size: 24px; color: var(--foreground); font-family: var(--font-heading); }
        .mobile-menu .btn { margin-top: 20px; }

        @media (min-width: 768px) {
          .desktop-menu { display: flex; }
          .mobile-toggle { display: none; }
          .mobile-menu { display: none; }
        }
      `}</style>
    </nav>
  );
}
