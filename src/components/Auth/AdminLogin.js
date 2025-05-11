import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import adminAuthService from '../../services/adminAuthService';
import './Auth.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    // Check for existing session
    const sessionToken = localStorage.getItem('adminSessionToken');
    if (sessionToken && adminAuthService.validateSession(sessionToken)) {
      navigate('/admin/dashboard');
    }

    // Get last login time if available
    const lastLoginTime = localStorage.getItem('lastAdminLogin');
    if (lastLoginTime) {
      setLastLogin(new Date(lastLoginTime));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { sessionToken, expiresIn } = await adminAuthService.login(
        formData.username,
        formData.password
      );

      // Store session token
      if (formData.rememberMe) {
        localStorage.setItem('adminSessionToken', sessionToken);
      } else {
        sessionStorage.setItem('adminSessionToken', sessionToken);
      }

      // Store last login time
      const loginTime = new Date();
      localStorage.setItem('lastAdminLogin', loginTime.toISOString());

      // Set session timeout
      setTimeout(() => {
        adminAuthService.logout(sessionToken);
        localStorage.removeItem('adminSessionToken');
        sessionStorage.removeItem('adminSessionToken');
        navigate('/admin/login');
      }, expiresIn);

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card admin-auth">
        <div className="auth-header">
          <h2>Admin Login</h2>
          <p>Sign in to access admin dashboard</p>
        </div>

        {lastLogin && (
          <div className="last-login-info">
            Last login: {lastLogin.toLocaleString()}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              autoComplete="username"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
                aria-invalid={error ? 'true' : 'false'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="checkbox-label">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;