import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://job-hunt-nw7o.onrender.com/api/accounts/login", {
        email,
        password,
      });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      navigate("/job-list");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  const goToSignup = () => {
    navigate("/signup"); // Ensure the /register route exists
  };

  return (
    <div className="auth-container">
      <h1>JOB HUNT</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      <div className="signup-section">
        <p>Don't have an account?</p>
        <button className="auth-button secondary" onClick={goToSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
