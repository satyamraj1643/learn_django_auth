import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const {access} = useSelector((state)=>state.auth)
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log(access)

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
            password: password, 
            new_password: new_password, 
          }),
        }
      );

      if (res.ok) {
        navigate("/login", {
          state: { message: "Password reset successful. Please log in." },
        });
      } else {
        const data = await res.json();
        setError(data?.new_password?.[0] || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Reset Your Password</h1>
      <p style={paragraphStyle}>
        Set a new password below to get back into your account.
      </p>
      {error && <div style={errorStyle}>{error}</div>}
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          style={inputStyle}
          required
        />
        <input
          type="password"
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Re-enter New Password"
          style={inputStyle}
          required
        />
        <button onClick={onSubmit} style={buttonStyle}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
