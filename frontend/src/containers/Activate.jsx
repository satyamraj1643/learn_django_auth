import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../redux/auth/authSlice';
import { useEffect } from 'react';

const Activate = () => {
  const { uid, token } = useParams();
  console.log(uid, "----", token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isActivated, error } = useSelector((state) => state.auth);

  const handleActivate = () => {
    if (uid && token) {
      console.log("in dispatch")
      console.log(uid, "------", token)
      dispatch(authenticateUser({ uid, token }));
    }
  };

  useEffect(() => {
    if (isActivated) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isActivated, navigate]);

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h1>Account Activation</h1>
      {loading && <p>Activating your account...</p>}
      {isActivated && <p>Activated! Redirecting to login...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isActivated && !loading && (
        <button
          onClick={handleActivate}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Activate Now
        </button>
      )}
    </div>
  );
};

export default Activate;
