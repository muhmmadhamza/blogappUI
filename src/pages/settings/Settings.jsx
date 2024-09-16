import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './settings.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Validation schema with Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Initialize the navigate function

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Make a PUT request to the /profile endpoint
        const response = await axios.put(`${API_URL}/auth/updateprofile`, values, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
          },
        });
        toast.success("Profile Updated Successfully!");
        console.log('Profile updated successfully:', response.data);
        navigate('/'); // Navigate to home page on success
      } catch (error) {
        console.error('Error updating profile:', error.response.data);
        toast.error('Error updating profile');
      }
    },
  });



  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={formik.handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <label>Password</label>
          <div className="passwordContainer">

            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className='loginInputs'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

