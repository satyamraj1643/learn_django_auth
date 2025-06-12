import React from 'react';

const CheckEmail = () => {
    
  const containerStyle = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '15px',
    fontSize: '24px',
  };

  const paragraphStyle = {
    color: '#555',
    fontSize: '16px',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Verify Your Email</h1>
      <p style={paragraphStyle}>We've sent a confirmation link to your email.</p>
      <p style={paragraphStyle}>Please check your inbox and click the link to activate your account.</p>
      <p style={{ ...paragraphStyle, fontStyle: 'italic', color: '#777' }}>
        Didn’t get the email? Check your spam folder or try signing up again.
      </p>
    </div>
  );
};

export default CheckEmail;
