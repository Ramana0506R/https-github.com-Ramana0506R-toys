import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ToyBrick } from "lucide-react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  isNewArrival: boolean;
}

export default function Gallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for search parameter in the URL
    const queryParams = new URLSearchParams(window.location.search);
    const searchParam = queryParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }

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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="title"
          >
            Toy Gallery
          </motion.h1>
          <p className="subtitle">Discover joy and wonder in every corner of our collection.</p>
          
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for toys..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="status-message">Wonderful toys are loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="status-message no-results">
              <ToyBrick size={48} className="icon animate-float" />
              <p>No toys found matching your search.</p>
              <button onClick={() => setSearchTerm("")} className="btn btn-primary">Clear Search</button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .gallery-page { padding-top: 80px; }
        .gallery-header { background: linear-gradient(135deg, var(--secondary) 0%, #6BA6FF 100%); color: #fff; padding: 120px 0 100px; text-align: center; border-radius: 0 0 60px 60px; margin-top: -80px; }
        .title { font-size: clamp(36px, 6vw, 72px); margin-bottom: 24px; color: #fff; font-weight: 800; letter-spacing: -1px; }
        .subtitle { font-size: 20px; opacity: 0.9; margin-bottom: 48px; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        .search-bar { 
          max-width: 650px; 
          margin: 0 auto; 
          background: #fff; 
          padding: 12px 30px; 
          border-radius: 100px; 
          display: flex; 
          align-items: center; 
          gap: 20px; 
          box-shadow: 0 20px 50px rgba(0,0,0,0.15); 
          border: 4px solid rgba(255, 255, 255, 0.3);
        }
        .search-icon { color: var(--secondary); }
        .search-bar input { border: none; outline: none; padding: 12px 0; font-size: 18px; width: 100%; color: var(--foreground); font-weight: 600; }
        
        .status-message { text-align: center; padding: 120px 0; font-size: 22px; color: #777; display: flex; flex-direction: column; align-items: center; gap: 32px; }
        .no-results .icon { color: var(--primary); }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 40px; margin-top: 40px; }
      `}</style>
    </div>
  );
}
