import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('neptune_token'));
  const [userId, setUserId] = useState(localStorage.getItem('neptune_user_id'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('neptune_token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('neptune_token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('neptune_token');
      setIsAuthenticated(false);
    }
    
    if (userId) {
      localStorage.setItem('neptune_user_id', userId);
    } else {
      localStorage.removeItem('neptune_user_id');
    }
  }, [token, userId]);

  const login = (newToken, userData, newUserId) => {
    setToken(newToken);
    setUser(userData);
    setUserId(newUserId);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
