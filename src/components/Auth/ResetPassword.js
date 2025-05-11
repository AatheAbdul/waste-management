import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();

  // Get token from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    if (!token) {
      setError('root', {
        type: 'manual',
        message: 'Invalid or expired reset link. Please request a new one.',
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await resetPassword(token, data.password);

      if (result.success) {
        navigate('/login', {
          state: { message: 'Password reset successful. Please login with your new password.' }
        });
      } else {
        setError('root', {
          type: 'manual',
          message: result.error || 'Failed to reset password. Please try again.',
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Invalid Reset Link</h2>
            <p>
              This password reset link is invalid or has expired.
              Please request a new password reset link.
            </p>
          </div>
          <button
            onClick={() => navigate('/forgot-password')}
            className="auth-button"
          >
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Your Password</h2>
          <p>Please enter your new password</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {errors.root && (
            <div className="error-message">{errors.root.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="password">New Password</label>
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain uppercase, lowercase, and numbers',
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
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match',
                })}
                className={errors.confirmPassword ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;