import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="title has-text-centered has-text-info">Login</h2>
      <form onSubmit={onSubmit} className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button type="submit" className="button is-info is-fullwidth">Login</button>
      </form>
      <p className="has-text-centered">
        Belum punya akun? <Link to="/register">Register di sini</Link>
      </p>
    </div>
  );
};

export default LoginForm;
