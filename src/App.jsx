
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

import Topbar from './components/topbar/Topbar';
 import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import AddBlog from './pages/write/AddBlog';
import ProtectedRoute from './ProtectedRoute'; 
import { loadUserFromToken } from './redux/features/authSlice';
import EditPost from './pages/edit/Edit';
import Homepage from './components/homepage/HomePage';
 
function App() {
  const currentUser = useSelector((state) => state.auth.user);

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken()); 
  }, [dispatch]);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <Single />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addblog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
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
    </Router>
  );
}

export default App;
