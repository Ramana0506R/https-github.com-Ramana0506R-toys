import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, User, Rocket, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === "localhost" ? "http://localhost:8000" : "/api");

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      
      if (res.data.success) {
        localStorage.setItem("admin-token", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      const status = err.response?.status;
      const detail = err.response?.data?.detail;
      setError(`${detail || "Network error or service down"} (Code: ${status || "Unknown"})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <motion.div 
          className="login-card card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header">
            <Rocket className="logo-icon animate-float" size={48} />
            <h1>Admin Login</h1>
            <p>Welcome back! Please login to manage your store.</p>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label><User size={16} /> Username</label>
              <input 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label><Lock size={16} /> Password</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Access Dashboard"}
              {!loading && <LogIn size={20} />}
            </button>
          </form>

          <div className="login-footer">
             <p>Secured Access Only</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .login-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #fffbeb 0%, #fff 100%); padding: 40px 0; }
        .login-card { max-width: 450px; margin: 0 auto; padding: 48px; border-radius: 40px; }
        .login-header { text-align: center; margin-bottom: 40px; }
        .logo-icon { color: var(--secondary); margin-bottom: 16px; }
        .login-header h1 { font-size: 32px; margin-bottom: 8px; }
        .login-header p { color: #666; font-size: 16px; }
        
        .error-alert { background: #fee2e2; color: #b91c1c; padding: 14px 20px; border-radius: 16px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; font-size: 14px; font-weight: 600; border: 1px solid #fecaca; }
        .login-form { display: flex; flex-direction: column; gap: 24px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; color: #444; }
        .form-group input { padding: 14px 20px; border: 2px solid #eee; border-radius: 16px; font-size: 16px; outline: none; transition: 0.3s; }
        .form-group input:focus { border-color: var(--secondary); background: #fff; }
        
        .login-btn { width: 100%; justify-content: center; padding: 18px; font-size: 18px; }
        .login-btn:disabled { opacity: 0.7; }
        .login-footer { margin-top: 32px; text-align: center; color: #999; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
      `}</style>
    </div>
  );
}
