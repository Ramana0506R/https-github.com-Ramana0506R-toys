import { motion } from "framer-motion";
import { MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

interface ProductCardProps {
  name: string;
  description?: string;
  imageUrl: string;
  isNewArrival?: boolean;
}

export default function ProductCard({ name, description, imageUrl, isNewArrival }: ProductCardProps) {
  const [copied, setCopied] = useState(false);
  const WHATSAPP_NUMBER = "919342318163"; // Corrected shop owner number
  const message = `Hi! I'm interested in buying "${name}". Is it still available?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const productLink = `${window.location.origin}/gallery?search=${encodeURIComponent(name)}`;
    const success = await copyToClipboard(productLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      className="card product-card"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => window.open(whatsappUrl, "_blank")}
    >
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
        {isNewArrival && (
          <div className="badge new-badge animate-pulse-soft">New</div>
        )}
        <div className="whatsapp-overlay">
           <div className="overlay-actions">
              <button 
                className="action-btn wa-btn" 
                onClick={handleWhatsAppClick}
                title="Message on WhatsApp"
              >
                <MessageCircle size={24} />
              </button>
              <button 
                className={`action-btn copy-btn ${copied ? "copied" : ""}`} 
                onClick={handleCopyLink}
                title="Copy product link"
              >
                {copied ? <Check size={24} /> : <Copy size={24} />}
              </button>
           </div>
           <span className="overlay-text">{copied ? "Copied!" : "Ask on WhatsApp"}</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-desc">{description}</p>}
        <div className="card-footer">
          <div className="footer-left">
             <span className="shop-now">Message Now</span>
             <MessageCircle size={18} className="icon" />
          </div>
          <button 
            className={`copy-icon-btn ${copied ? "active" : ""}`} 
            onClick={handleCopyLink}
            title="Copy Link"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }
        .product-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%; /* Square aspect ratio */
          background-color: #f9f9f9;
          overflow: hidden;
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        .whatsapp-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(77, 150, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          color: white;
          opacity: 0;
          transition: 0.3s;
          backdrop-filter: blur(6px);
        }
        .product-card:hover .whatsapp-overlay {
          opacity: 1;
        }
        .overlay-actions {
          display: flex;
          gap: 12px;
        }
        .action-btn {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: var(--secondary);
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .action-btn:hover {
          transform: translateY(-5px);
          background: var(--primary);
          color: #000;
        }
        .action-btn.copied {
          background: var(--success);
          color: #fff;
        }
        .overlay-text {
          font-weight: 800;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .new-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--accent);
          color: #fff;
          z-index: 10;
        }
        .product-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .product-name {
          font-size: 20px;
          color: var(--foreground);
          margin: 0;
          font-weight: 800;
        }
        .product-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed #eee;
        }
        .footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--secondary);
          font-weight: 700;
          font-size: 14px;
        }
        .footer-left .icon {
          transition: 0.3s;
        }
        .product-card:hover .footer-left .icon {
          transform: scale(1.2) rotate(15deg);
        }
        .copy-icon-btn {
          background: #f5f5f5;
          color: #777;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .copy-icon-btn:hover {
          background: var(--secondary);
          color: #fff;
        }
        .copy-icon-btn.active {
          background: var(--success);
          color: #fff;
        }
      `}</style>
    </motion.div>
  );
}
