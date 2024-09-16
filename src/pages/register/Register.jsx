import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './register.css';
import axios from 'axios';
import { setUser, setLoading, setError } from '../../redux/features/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/auth/register`, values);
    
  
    toast.success(response?.data.message);
    navigate('/login');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch(setError(errorMessage));
    toast.error(`Registration failed: ${errorMessage}`);
  } finally {
    dispatch(setLoading(false));
  }
}
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlenavigate=()=>{
navigate('/login')
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <div className='main-clas'>
      <form className="registerForm" onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          name="username"
          placeholder="Enter your username..."
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}

        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label>Password</label>
        <div className="passwordContainer">
          <input
            className="registerInput"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password..."
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            className="passwordToggle"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button type="submit" className="registerButton" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      </div>
      {/* {error && <div className="error">{error}</div>} */}
      <ToastContainer /> {/* Toast container for notifications */}
      {/* <button className="registerLoginButton"
      onClick={handlenavigate}
   >Login</button> */}
    </div>
  );
}
