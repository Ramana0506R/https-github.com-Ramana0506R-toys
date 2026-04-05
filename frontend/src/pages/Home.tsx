import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ToyBrick } from "lucide-react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

// Fallback for local development if backend is not running
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  isNewArrival: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge hero-badge">
              <Sparkles size={16} /> Welcome to TOYS STORE
            </div>
            <h1 className="hero-title">
              Let's Make <span className="text-secondary">Playtime</span> Magical!
            </h1>
            <p className="hero-text">
              Discover a world of colorful, creative, and fun toys for children of all ages. From imagination to reality, we have it all.
            </p>
            <div className="hero-actions">
              <Link to="/gallery" className="btn btn-secondary">
                Explore Toys <ToyBrick size={20} />
              </Link>
              <Link to="/contact" className="btn btn-primary">
                Our Shop <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="blob-container animate-float">
              <img 
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop" 
                alt="Colorful Toys" 
                className="hero-img" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="section new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">✨ New Arrivals</h2>
              <p>Check out our latest toys fresh in store!</p>
            </div>
            <div className="product-grid">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Collections Placeholder */}
      <section className="section collections">
        <div className="container">
          <div className="collection-banner card">
            <div className="banner-content">
              <h2>Visit Us in Peramballur!</h2>
              <p>A1/5, Peramballur New Bus Stand - The largest toy collection in town.</p>
              <Link to="/contact" className="btn btn-accent">Find Store <ArrowRight size={18} /></Link>
            </div>
            <div className="banner-image">
               <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop" alt="Toy Store Interior" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero { background: var(--background); padding: 100px 0; overflow: hidden; }
        .hero-container { display: grid; align-items: center; gap: 60px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--primary); padding: 8px 16px; border-radius: 100px; font-weight: 700; margin-bottom: 24px; color: #444; }
        .hero-title { font-size: clamp(40px, 8vw, 72px); line-height: 1.1; margin-bottom: 24px; }
        .text-secondary { color: var(--secondary); }
        .hero-text { font-size: 18px; color: #666; margin-bottom: 40px; max-width: 500px; line-height: 1.6; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 16px; }
        
        .blob-container { 
          position: relative; 
          background: var(--primary); 
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
          padding: 20px; 
          box-shadow: 0 30px 60px rgba(255, 217, 61, 0.4); 
        }
        .hero-img { width: 100%; border-radius: 20px; object-fit: cover; }
        
        .section-header { margin-bottom: 48px; text-align: center; }
        .section-title { font-size: 40px; margin-bottom: 12px; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; }
        
        .collection-banner { display: grid; background: var(--secondary); color: white; margin-top: 40px; position: relative; }
        .banner-content { padding: 60px; display: flex; flex-direction: column; gap: 20px; justify-content: center; }
        .banner-content h2 { font-size: 40px; }
        .banner-image img { width: 100%; height: 100%; object-fit: cover; min-height: 300px; }

        @media (min-width: 992px) {
          .hero-container { grid-template-columns: 1fr 1fr; }
          .collection-banner { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
