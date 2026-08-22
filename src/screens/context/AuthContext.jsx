import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dev_app_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dev_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dev_app_user');
    }
  }, [user]);

  // Mock Authentication Handlers
  const login = (email, password) => {
    const mockUser = {
      id: 'usr_101',
      name: 'Alex Rivera',
      email,
      role: 'developer', // Default role
      interests: ['React', 'TypeScript', 'System Design']
    };
    setUser(mockUser);
    return mockUser;
  };

  const signup = ({ name, email, password, role = 'developer' }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      interests: []
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (role) => {
    setUser((prev) => (prev ? { ...prev, role } : null));
  };

  const updateInterests = (interests) => {
    setUser((prev) => (prev ? { ...prev, interests } : null));
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isWriter: user?.role === 'writer',
    login,
    signup,
    logout,
    setRole,
    updateInterests,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};