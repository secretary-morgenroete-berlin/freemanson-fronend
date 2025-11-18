import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/public/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/portal");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setForgotLoading(true);

    try {
      const response = await fetch(`${API_URL}/public/api/admin/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotMessage("Password reset link has been sent to your email.");
      } else {
        setForgotMessage(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotMessage("Server error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="footer">
        <p>
          Forgot password?{" "}
          <a
            href="#"
            className="reset-link"
            onClick={(e) => {
              e.preventDefault();
              setShowForgot(true);
            }}
          >
            Reset here
          </a>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Forgot Password</h4>
            <form onSubmit={handleForgotPassword}>
              <label>Enter your email</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Your email address"
                required
              />
              <div className="modal-buttons">
                <button type="submit" disabled={forgotLoading}>
                  {forgotLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotEmail("");
                    setForgotMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
            {forgotMessage && <p className="info-message">{forgotMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
