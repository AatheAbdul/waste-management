import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      // TODO: Implement actual authentication logic
      const mockUser = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : email.includes('recycler') ? 'recycler' : 'function_hall',
        name: email.split('@')[0]
      };
      setUser(mockUser);
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, role) => {
    try {
      setLoading(true);
      setError('');
      // TODO: Implement actual registration logic
      const mockUser = {
        id: Date.now().toString(),
        email,
        role,
        name: email.split('@')[0]
      };
      setUser(mockUser);
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
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