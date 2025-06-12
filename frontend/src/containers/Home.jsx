import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const {isAuthenticated} = useSelector((state) => state.auth);
  const navigate = useNavigate()


  useEffect(() => {

    if(!isAuthenticated){
      navigate("/login")
    }
  }, [isAuthenticated])
  
  const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '20px',
    fontSize: '2.5rem'
  };

  const paragraphStyle = {
    color: '#666',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '30px'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome Home!</h1>
      <p style={paragraphStyle}>
        You've successfully logged in to your dashboard. Explore the features and manage your account from here.
      </p>
     
    </div>
  )
}

export default Home