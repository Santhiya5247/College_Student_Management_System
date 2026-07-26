import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        setError("");
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid Username or Password");
    }
  };

  return (
     <div className="login-container">
      <div
        className="card shadow-lg p-4 login-card"
        style={{ width: "400px" }}
      >
        <div className="text-center mb-4">
          <h2 className="login-title">
            College Student Management System
          </h2>

          <p className="text-muted">Admin Login</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mb-3">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
