import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  description?: string;
  imageUrl: string;
  isNewArrival?: boolean;
}

export default function ProductCard({ name, description, imageUrl, isNewArrival }: ProductCardProps) {
  return (
    <motion.div 
      className="card product-card"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
        {isNewArrival && (
          <div className="badge new-badge">New Arrival</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-desc">{description}</p>}
      </div>

      <style>{`
        .product-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .product-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%; /* Square aspect ratio */
          background-color: #f5f5f5;
          overflow: hidden;
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .new-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--accent);
          color: #fff;
          padding: 6px 16px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
        }
        .product-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .product-name {
          font-size: 22px;
          color: var(--secondary);
          margin: 0;
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
      `}</style>
    </motion.div>
  );
}
