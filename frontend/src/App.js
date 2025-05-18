import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import NoteList from "./components/NoteList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NotesApp from "./pages/NotesApp"; // ✅ Import NotesApp
import { BASE_URL } from "./utils";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Cek token di localStorage saat pertama kali load app
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fungsi register, menerima data dari RegisterForm
  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-users`, data);
      console.log("Register sukses:", response.data);
      alert(response.data.msg); // Tampilkan pesan berhasil
      navigate("/login"); // ✅ Navigasi ke login page setelah berhasil
    } catch (error) {
      console.error("Register gagal:", error.response?.data || error.message);
      alert("Gagal Register. Pastikan semua data benar.");
    }
  };

  // Fungsi login
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
      navigate("/notes"); // ✅ Arahkan ke /notes setelah login berhasil
    } catch (error) {
      alert("Login gagal, email atau password salah.");
    }
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // ProtectedRoute untuk halaman yang butuh autentikasi
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <NoteList handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes" // ✅ Route baru untuk halaman NotesApp
        element={
          <ProtectedRoute>
            <NotesApp handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterForm handleRegister={handleRegister} />} />
      <Route path="*" element={<h2 className="has-text-centered mt-5">404 - Page Not Found</h2>} />
    </Routes>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
