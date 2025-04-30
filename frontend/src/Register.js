// src/Register.js (or Signup.js)

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Reuse your CSS

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://job-hunt-nw7o.onrender.com/api/accounts/signup",
        {
          email,
          password,
        }
      );
      alert("Registration successful!");
      console.log("Token:", response.data.token);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        "Registration failed: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="auth-form">
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
