import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ToyBrick, Rocket, Heart, Star } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredProduct = products[0]; // Just picking the first one as featured

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
        
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge hero-badge animate-pulse-soft">
              <Sparkles size={16} /> Best Toy Shop in Peramballur
            </div>
            <h1 className="hero-title">
              Bring <span className="text-accent">Magic</span> & <span className="text-secondary">Joy</span> to Your Home!
            </h1>
            <p className="hero-text">
              Welcome to <strong>TOYS STORE</strong>. Explore our collection of premium, fun, and educational toys. We make kids happy and parents proud!
            </p>
            <div className="hero-actions">
              <Link to="/gallery" className="btn btn-secondary">
                View Gallery <Rocket size={20} />
              </Link>
              <Link to="/contact" className="btn btn-primary">
                Visit Shop <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <Heart className="icon text-accent" />
                <span>1000+ Happy Kids</span>
              </div>
              <div className="stat">
                <Star className="icon text-primary" />
                <span>5 Star Quality</span>
              </div>
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
              <div className="floating-badge badge-1 glass">
                <div className="icon-box primary"><Rocket size={20} /></div>
                <span>Fast Delivery</span>
              </div>
              <div className="floating-badge badge-2 glass">
                <div className="icon-box secondary"><Heart size={20} /></div>
                <span>Made with Love</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredProduct && (
        <section className="section featured-highlight">
          <div className="container">
             <div className="featured-card glass">
                <div className="featured-info">
                   <div className="badge btn-accent">Product Spotlight</div>
                   <h2>{featuredProduct.name}</h2>
                   <p>{featuredProduct.description || "Our most loved toy of the month! Grab yours now from the shop or order via WhatsApp."}</p>
                   <Link to="/gallery" className="btn btn-secondary">See More Toys</Link>
                </div>
                <div className="featured-img-box">
                   <img src={featuredProduct.imageUrl} alt={featuredProduct.name} />
                </div>
             </div>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      <section className="section new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">✨ New <span className="text-secondary">Arrivals</span></h2>
            <p>Check out our latest toys fresh in store! Click to inquire on WhatsApp.</p>
          </div>
          
          {loading ? (
             <div className="loading-spinner">Picking up toys...</div>
          ) : (
            <div className="product-grid">
              {newArrivals.length > 0 ? (
                newArrivals.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              )}
            </div>
          )}
          
          <div className="section-footer">
             <Link to="/gallery" className="btn btn-primary">See All Products <ToyBrick size={20} /></Link>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="section collections">
        <div className="container">
          <div className="collection-banner card">
            <div className="banner-content">
              <h2>Visit Our Store!</h2>
              <p>Located at A1/5, Peramballur New Bus Stand. We are open every day with thousands of toys waiting for you!</p>
              <div className="banner-actions">
                <Link to="/contact" className="btn btn-accent">Store Location <ArrowRight size={18} /></Link>
                <a href="tel:+919342318163" className="btn btn-secondary glass">Call Us</a>
              </div>
            </div>
            <div className="banner-image">
               <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop" alt="Toy Store Interior" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero { 
          position: relative;
          padding: 180px 0 100px; 
          overflow: hidden; 
          background: linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%);
        }
        .hero-circles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
        .circle { position: absolute; border-radius: 50%; opacity: 0.4; filter: blur(60px); }
        .circle-1 { top: -100px; right: -100px; width: 400px; height: 400px; background: var(--primary); }
        .circle-2 { bottom: -50px; left: -150px; width: 500px; height: 500px; background: var(--secondary); }
        .circle-3 { top: 20%; left: 10%; width: 200px; height: 200px; background: var(--accent); }

        .hero-container { display: grid; align-items: center; gap: 80px; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #FFF4CC; padding: 10px 20px; border-radius: 100px; font-weight: 800; margin-bottom: 32px; color: #B28B00; border: 2px solid var(--primary); }
        .hero-title { font-size: clamp(40px, 8vw, 75px); line-height: 1.1; margin-bottom: 32px; font-weight: 800; }
        .text-accent { color: var(--accent); }
        .text-secondary { color: var(--secondary); }
        .hero-text { font-size: 20px; color: #555; margin-bottom: 48px; max-width: 550px; line-height: 1.6; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 48px; }
        
        .hero-stats { display: flex; gap: 32px; }
        .stat { display: flex; align-items: center; gap: 12px; font-weight: 700; color: var(--foreground); }
        .stat .icon { width: 40px; height: 40px; background: #fff; display: flex; align-items: center; justify-content: center; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .blob-container { 
          position: relative; 
          background: var(--primary); 
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; 
          padding: 15px; 
          box-shadow: 0 40px 80px rgba(255, 217, 61, 0.35); 
          max-width: 500px;
          margin: 0 auto;
        }
        .hero-img { width: 100%; border-radius: 40% 60% 70% 30% / 45% 45% 55% 55%; object-fit: cover; aspect-ratio: 1; }
        
        .floating-badge {
          position: absolute;
          padding: 12px 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .badge-1 { top: 10%; right: -20px; }
        .badge-2 { bottom: 10%; left: -20px; }
        .icon-box { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; }
        .icon-box.primary { background: var(--primary); color: #000; }
        .icon-box.secondary { background: var(--secondary); }

        .featured-card {
           display: grid;
           gap: 40px;
           padding: 60px;
           border-radius: 40px;
           align-items: center;
           background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
           border: 2px solid #fff;
        }
        .featured-info h2 { font-size: 48px; margin: 20px 0; color: var(--foreground); }
        .featured-info p { font-size: 18px; color: #666; margin-bottom: 32px; }
        .featured-img-box img { width: 100%; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

        .section-header { margin-bottom: 60px; text-align: center; }
        .section-title { font-size: 48px; margin-bottom: 16px; font-weight: 800; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; }
        .section-footer { margin-top: 60px; text-align: center; }
        
        .collection-banner { display: grid; background: var(--secondary); color: white; margin-top: 40px; position: relative; border: none; }
        .banner-content { padding: 80px; display: flex; flex-direction: column; gap: 24px; justify-content: center; }
        .banner-content h2 { font-size: 48px; }
        .banner-content p { font-size: 18px; opacity: 0.9; }
        .banner-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .banner-image img { width: 100%; height: 100%; object-fit: cover; min-height: 400px; }

        @media (min-width: 992px) {
          .hero-container { grid-template-columns: 1.2fr 0.8fr; }
          .collection-banner { grid-template-columns: 1fr 1fr; }
          .featured-card { grid-template-columns: 1fr 1fr; }
        }
        
        @media (max-width: 768px) {
           .hero { padding: 140px 0 60px; }
           .featured-card { padding: 40px 20px; }
           .banner-content { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}
