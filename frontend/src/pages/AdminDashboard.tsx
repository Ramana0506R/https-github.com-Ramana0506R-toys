import { useState, useEffect, useCallback } from "react";
import { LogOut, Plus, Trash2, Edit2, Rocket, LayoutDashboard, Image as ImageIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  isNewArrival: boolean;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    isNewArrival: false,
  });
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchProducts();
    }
  }, [navigate, fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewProduct((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please check your Supabase credentials.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.imageUrl) {
        alert("Please upload or provide an image URL.");
        return;
    }

    try {
      await axios.post(`${API_URL}/products`, newProduct);
      setNewProduct({ name: "", description: "", imageUrl: "", isNewArrival: false });
      setShowAddModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this toy?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <div className="header-left">
            <LayoutDashboard className="icon" size={32} />
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage your store products and latest arrivals.</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setShowAddModal(true)}>
              <Plus size={20} /> Add New Toy
            </button>
            <button className="btn btn-accent btn-outline" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </header>

        <section className="stats-section">
          <div className="card stat-card">
            <div className="stat-icon primary"><Rocket size={24} /></div>
            <div className="stat-info">
              <h3>{products.length}</h3>
              <p>Total Toys</p>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon accent"><ImageIcon size={24} /></div>
            <div className="stat-info">
              <h3>{products.filter(p => p.isNewArrival).length}</h3>
              <p>New Arrivals</p>
            </div>
          </div>
        </section>

        <div className="card table-card">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Toy Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">No toys found. Click 'Add New Toy' to start!</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                       <img src={product.imageUrl} alt={product.name} className="table-thumb" />
                    </td>
                    <td><span className="toy-name">{product.name}</span></td>
                    <td><p className="toy-desc">{product.description || "-"}</p></td>
                    <td>
                      {product.isNewArrival && <span className="status-badge">New Arrival</span>}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn edit"><Edit2 size={18} /></button>
                        <button className="icon-btn delete" onClick={() => handleDeleteProduct(product.id)}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal card">
            <h2>✨ Add New Toy</h2>
            <form onSubmit={handleAddProduct} className="modal-form">
              <div className="form-group">
                <label>Toy Name</label>
                <input 
                  type="text" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Image (File Upload)</label>
                <div className="file-upload-wrapper">
                   <input type="file" id="file-upload" onChange={handleFileUpload} accept="image/*" />
                   <label htmlFor="file-upload" className="file-upload-btn">
                      {uploading ? "Uploading..." : "Select Image"} <Upload size={18} />
                   </label>
                   {newProduct.imageUrl && <p className="upload-success">✅ Image Linked!</p>}
                </div>
              </div>

              <div className="form-group">
                <label>Or Image URL</label>
                <input 
                  type="text" 
                  value={newProduct.imageUrl} 
                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                  placeholder="Paste high-quality image URL"
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea 
                  value={newProduct.description} 
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="new-arrival" 
                  checked={newProduct.isNewArrival} 
                  onChange={(e) => setNewProduct({...newProduct, isNewArrival: e.target.checked})}
                />
                <label htmlFor="new-arrival">Highlight as New Arrival</label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-secondary" disabled={uploading}>Add Toy <Plus size={18} /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-dashboard { padding: 80px 0; background: #fafafa; min-height: 100vh; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 24px; }
        .header-left { display: flex; align-items: center; gap: 20px; }
        .header-left .icon { color: var(--secondary); }
        .header-left h1 { font-size: 32px; font-family: var(--font-heading); margin-bottom: 4px; }
        .header-left p { color: #666; font-size: 16px; }
        .header-actions { display: flex; gap: 16px; }
        
        .btn-outline { background: transparent; color: #444; border: 2px solid #eee; }
        .btn-outline:hover { background: #fff; border-color: var(--secondary); }

        .stats-section { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .stat-card { padding: 32px; display: flex; align-items: center; gap: 20px; }
        .stat-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.primary { background: #fff4cc; color: var(--primary-hover); }
        .stat-icon.accent { background: #fee2e2; color: var(--accent); }
        .stat-info h3 { font-size: 32px; font-weight: 800; font-family: var(--font-heading); }
        .stat-info p { color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }

        .table-card { overflow-x: auto; border-radius: 32px; }
        .products-table { width: 100%; border-collapse: collapse; background: #fff; }
        .products-table th { text-align: left; padding: 24px; background: #fcfcfc; border-bottom: 2px solid #f5f5f5; font-weight: 800; font-size: 14px; text-transform: uppercase; color: #999; }
        .products-table td { padding: 20px 24px; border-bottom: 1px solid #f5f5f5; vertical-align: middle; }
        .table-thumb { width: 70px; height: 70px; border-radius: 16px; object-fit: cover; }
        .toy-name { font-weight: 800; font-size: 18px; color: var(--secondary); display: block; }
        .toy-desc { font-size: 14px; color: #666; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
        .status-badge { background: #e0f2fe; color: #0369a1; padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; text-transform: uppercase; }
        
        .action-btns { display: flex; gap: 12px; }
        .icon-btn { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .icon-btn.edit { background: #f3f4f6; color: #4b5563; }
        .icon-btn.delete { background: #fee2e2; color: #ef4444; }
        .icon-btn:hover { transform: scale(1.1); filter: brightness(0.95); }
        .empty-state { text-align: center; padding: 80px; color: #999; font-size: 18px; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .modal { width: 100%; max-width: 600px; padding: 48px; border-radius: 40px; position: relative; }
        .modal h2 { margin-bottom: 32px; font-size: 32px; }
        .modal-form { display: flex; flex-direction: column; gap: 24px; }
        .checkbox-group { flex-direction: row; align-items: center; font-weight: 700; color: #444; }
        .checkbox-group input { width: 24px; height: 24px; cursor: pointer; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px; }

        .file-upload-wrapper { display: flex; flex-direction: column; gap: 12px; }
        #file-upload { display: none; }
        .file-upload-btn { background: #f5f5f5; border: 2px dashed #ddd; padding: 16px; border-radius: 16px; text-align: center; color: #666; font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .file-upload-btn:hover { background: #fff; border-color: var(--secondary); color: var(--secondary); }
        .upload-success { color: var(--success); font-weight: 700; font-size: 14px; margin: 0; }
      `}</style>
    </div>
  );
}
