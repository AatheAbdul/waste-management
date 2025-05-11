import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login logic here
      console.log('Login data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/manager/dashboard');
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Invalid credentials. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to EcoCrush</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {errors.root && (
            <div className="error-message">{errors.root.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              {...register('role', { required: 'Please select a role' })}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="manager">Function Hall Manager</option>
            </select>
            {errors.role && (
              <span className="error-message">{errors.role.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                {...register('rememberMe')}
              />
              <span className="checkbox-label">Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;