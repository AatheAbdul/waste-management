import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { requestPasswordReset } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await requestPasswordReset(data.email);
      
      if (result.success) {
        setEmailSent(true);
      } else {
        setError('root', {
          type: 'manual',
          message: result.error || 'Failed to send reset email. Please try again.',
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

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Check Your Email</h2>
            <p>
              We've sent password reset instructions to your email address.
              Please check your inbox.
            </p>
          </div>
          <div className="auth-footer">
            <p>
              Didn't receive the email?{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="auth-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Try again
              </button>
            </p>
            <p>
              <Link to="/login" className="auth-link">
                Return to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Enter your email address to reset your password</p>
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

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;