import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/auth/users/reset_password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px'
  };

  const paragraphStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Forgot Password?</h1>
      <p style={paragraphStyle}>We'll send you a link to reset your password.</p>
      <div>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Your email address" 
          style={inputStyle}
          required
        />
        <button onClick={onSubmit} style={buttonStyle}>Send Reset Link</button>
      </div>
    </div>
  );
};

export default ResetPassword;