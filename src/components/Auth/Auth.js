import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('function_hall');
  
  const { login, register, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password, role);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>I am a:</label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-button ${role === 'function_hall' ? 'active' : ''}`}
                  onClick={() => setRole('function_hall')}
                >
                  Function Hall
                </button>
                <button
                  type="button"
                  className={`role-button ${role === 'recycler' ? 'active' : ''}`}
                  onClick={() => setRole('recycler')}
                >
                  Recycler
                </button>
              </div>
            </div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;