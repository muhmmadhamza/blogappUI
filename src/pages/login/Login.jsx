import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { setUser, setLoading, setError } from "../../redux/features/authSlice";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./login.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        const response = await axios.post(`${API_URL}/auth/login`, values);
 
     
        
        if (response.status === 200) { // Only show toast if status is 201
          toast.success("Login successful!");
          localStorage.setItem("token", response.data.token);
          dispatch(setUser(response?.data));
          navigate("/");  // Redirect on successful login
        } else {
          toast.error("Login failed! Please try again."); // Fallback for other statuses
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        dispatch(setError(errorMessage));
        toast.error(`Login failed: ${errorMessage}`);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <div className="main-clas">
        <form className="loginForm" onSubmit={formik.handleSubmit}>
          <label>Email</label>
          <input
            className="loginInput"
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
              className="loginInput"
              type={showPassword ? "text" : "password"}
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

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      {/* {error && <div className="error">{error}</div>} */}
      <ToastContainer 
        position="top-right" // Optional: you can change the position
        autoClose={5000} // Optional: time before auto-close
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <button className="loginRegisterButton" onClick={handleNavigate}>
        Register
      </button> */}
    </div>
  );
}
