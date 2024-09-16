// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.auth.user);
//   const token = localStorage.getItem('token'); // Get token from local storage

//   // If no user and no token, redirect to login page
//   if (!user && !token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token'); // Get token from local storage
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Make API call to verify the token or fetch user data
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.data) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (err) {
          setError(err.message);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [token, API_URL]);

  if (loading) {
     return <div style={{position:"absolute", top:"30%", left:"30%"}}>

<CircularProgress color="secondary" />
    </div>;
  }

  if (!isAuthenticated && !user) {
     return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

