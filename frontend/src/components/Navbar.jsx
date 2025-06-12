import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isActivated } = useSelector((state) => state.auth);
  

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Verification Banner */}
      {isAuthenticated && !isActivated && (
        <div style={styles.verificationBanner}>
          <span style={styles.verificationText}>
            ⚠️ Please verify your account. Check your email for activation link.
          </span>
        </div>
      )}
      
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo/Brand */}
          <div style={styles.brand}>
            <h2 style={styles.brandText}>auth_system</h2>
          </div>

          {/* Navigation Links */}
          <div style={styles.navLinks}>
            <a href="/" style={styles.link}>Home</a>
          </div>

          {/* Auth Section */}
          <div style={styles.authSection}>
            {isAuthenticated && isActivated ? (
              <div style={styles.userSection}>
                <span style={styles.welcomeText}>
                  Welcome, {user?.name || 'User'}!
                </span>
                <button 
                  onClick={handleLogout}
                  style={styles.logoutButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
                >
                  Logout
                </button>
              </div>
            ) : !isAuthenticated ? (
              <div style={styles.authButtons}>
                <a href="/login" style={styles.loginButton}>Login</a>
                <a href="/signup" style={styles.signupButton}>Sign Up</a>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  verificationBanner: {
    backgroundColor: '#f39c12',
    color: '#2c3e50',
    padding: '0.75rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  verificationText: {
    margin: 0,
  },
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    flex: '0 0 auto',
  },
  brandText: {
    color: '#ecf0f1',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    flex: '1',
    justifyContent: 'center',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  authSection: {
    flex: '0 0 auto',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  welcomeText: {
    color: '#ecf0f1',
    fontSize: '0.9rem',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#c0392b',
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
  },
  loginButton: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    border: '1px solid #ecf0f1',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  signupButton: {
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
};

export default Navbar;