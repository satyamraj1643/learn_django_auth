import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    re_password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupSuccess, error, loading } = useSelector((state) => state.auth);




  const { email, name, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    
    e.preventDefault();
    console.log(e)
    dispatch(signupUser({ email, name, password, re_password }));
  };

  useEffect(() => {
    if (loading) {
      console.log("Signing up...");
    }
    if (error) {
      window.alert("Error in signing up the user.");
    }

    if (signupSuccess) {
      navigate("/check-email");
    }
  }, [signupSuccess, error, loading, navigate]);



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

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Signup Page</h1>
      <p style={paragraphStyle}>Create an account to access your dashboard.</p>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Full Name"
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="re_password"
          value={re_password}
          onChange={onChange}
          placeholder="Confirm Password"
          style={inputStyle}
          required
        />
        <button onClick={onSubmit} style={buttonStyle}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Signup;
