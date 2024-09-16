import { createContext, useState, useContext } from 'react';

// Create a context for user authentication
const AuthContext = createContext(null);

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false); // Replace with actual logic

  const login = () => {
    setCurrentUser(true); // Replace with actual login logic
  };
  // const login = () => {
  //   setCurrentUser(true); // Replace with actual login logic
  // };

  const logout = () => {
    setCurrentUser(false); // Replace with actual logout logic
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
