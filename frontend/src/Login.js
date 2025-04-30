import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./App.css"; // Reuse your CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/accounts/login", {
        email,
        password,
      });
      alert("Login successful!");
      console.log("Token:", res.data.token);
      localStorage.setItem("token", res.data.token); // Store the token in localStorage

      // Redirect to JobList page after successful login
      navigate("/job-list"); // Make sure you have the route for JobList set up
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
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
    </div>
  );
};

export default Login;
