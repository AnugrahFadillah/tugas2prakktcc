import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  
  authCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  
  field: {
    marginBottom: '25px',
  },
  
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.95rem',
  },
  
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fff',
    boxSizing: 'border-box',
  },
  
  inputFocus: {
    borderColor: '#667eea',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },
  
  button: {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
  },
  
  notification: {
    padding: '15px 20px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontSize: '0.95rem',
    fontWeight: '500',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    color: 'white',
  },
  
  linkText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b7280',
  },
  
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
};

const StyledInput = ({ type = 'text', value, onChange, placeholder, required = false }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...styles.input,
        ...(focused ? styles.inputFocus : {}),
      }}
    />
  );
};

const StyledButton = ({ onClick, children, disabled = false, loading = false }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.button,
        ...(hovered && !disabled ? styles.buttonHover : {}),
        opacity: loading || disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      alert("Login berhasil!");
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal! Username atau password salah.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2 style={styles.title}>Welcome Back</h2>
        
        {error && (
          <div style={styles.notification}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <StyledInput
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <StyledInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <StyledButton loading={loading} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </StyledButton>
        </form>
        
        <p style={styles.linkText}>
          Belum punya akun? <Link to="/register" style={styles.link}>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;