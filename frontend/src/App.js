import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import NoteList from "./components/NoteList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const BASE_URL = "http://localhost:5001";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      window.location.href = "/login";
    } catch (error) {
      console.error("Register gagal:", error.response?.data || error.message);
      alert("Gagal Register. Pastikan semua data benar.");
    }
  };

  // Fungsi login (contoh)
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login gagal, email atau password salah.");
    }
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<RegisterForm handleRegister={handleRegister} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;