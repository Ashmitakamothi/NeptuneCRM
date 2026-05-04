import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('neptune_user');
    const savedUserId = localStorage.getItem('neptune_user_id');
    try {
      let parsed = savedUser ? JSON.parse(savedUser) : null;
      // If we have a user but no image, check the persistent cache
      if (parsed && !parsed.profileImage && savedUserId) {
        const cachedPhoto = localStorage.getItem(`neptune_profile_photo_${savedUserId}`);
        if (cachedPhoto) parsed.profileImage = cachedPhoto;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse saved user:', e);
      return null;
    }
  });
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

    if (user) {
      localStorage.setItem('neptune_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('neptune_user');
    }
  }, [token, userId, user]);

  const login = (newToken, userData, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    
    // Check for a cached photo that survives logout/session clear
    const cachedPhoto = localStorage.getItem(`neptune_profile_photo_${newUserId}`);
    
    setUser(prev => {
      const merged = { ...userData };
      // Prioritize local cached photo if server doesn't provide one
      if (!merged.profileImage && cachedPhoto) {
        merged.profileImage = cachedPhoto;
      }
      return merged;
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
  };

  const updateUser = (userData) => {
    // If updating profile image, save to a persistent key tied to userId
    if (userData.profileImage && userId) {
      localStorage.setItem(`neptune_profile_photo_${userId}`, userData.profileImage);
    }
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, isAuthenticated, login, logout, updateUser }}>
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
