import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/authSlice"; // Make sure clearError exists

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isActivated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

;

  useEffect(() => {
    if (isAuthenticated && isActivated) {
      navigate("/");
    }
  }, [isAuthenticated, isActivated, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleSignupClick = () => navigate("/signup");
  const handleForgetPassword = () => navigate("/reset-password");

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "10px",
    },
    paragraph: {
      textAlign: "center",
      color: "#666",
      marginBottom: "30px",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      color: "#666",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginTop: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sign In</h1>
      <p style={styles.paragraph}>Enter your credentials to access your account.</p>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>

      <div style={styles.footer}>
        Don't have an account?{" "}
        <span style={styles.link} onClick={handleSignupClick}>
          Sign up here
        </span>
        <br />
        <span style={styles.link} onClick={handleForgetPassword}>
          Forgot Password?
        </span>
      </div>
    </div>
  );
};

export default Login;
