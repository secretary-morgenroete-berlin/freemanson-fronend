import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";  // ✅ Import navigation hook
import { loginSuccess } from "../../redux/authSlice";  // adjust path
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ initialize navigation
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/public/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login successful!");
        console.log("Token:", data);

        // Save to Redux
        dispatch(loginSuccess({ user: data.user, token: data.token }));

        // Optional: persist in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Redirect to Portal page
        navigate("/portal");
      } else {
        alert("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      alert("⚠️ Error: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="footer">
        <p>
          Forgot password?{" "}
          <a href="#" className="reset-link">Reset here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
