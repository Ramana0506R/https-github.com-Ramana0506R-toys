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
        .gallery-header { background-color: var(--secondary); color: #fff; padding: 100px 0; text-align: center; border-radius: 0 0 40px 40px; }
        .title { font-size: clamp(32px, 5vw, 64px); margin-bottom: 20px; color: #fff; }
        .subtitle { font-size: 18px; opacity: 0.9; margin-bottom: 40px; }
        
        .search-bar { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #fff; 
          padding: 10px 24px; 
          border-radius: 100px; 
          display: flex; 
          align-items: center; 
          gap: 16px; 
          box-shadow: 0 15px 40px rgba(0,0,0,0.1); 
        }
        .search-icon { color: #999; }
        .search-bar input { border: none; outline: none; padding: 12px 0; font-size: 18px; width: 100%; color: #333; }
        
        .status-message { text-align: center; padding: 100px 0; font-size: 20px; color: #666; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .no-results .icon { color: var(--primary); }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; }
      `}</style>
    </div>
  );
}
