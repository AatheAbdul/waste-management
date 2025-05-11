import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual registration logic here
      console.log('Registration data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login after successful registration
      navigate('/login');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join EcoCrush and start managing waste efficiently</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {errors.root && (
            <div className="error-message">{errors.root.message}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

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

          {selectedRole === 'manager' && (
            <>
              <div className="form-group">
                <label htmlFor="hallName">Function Hall Name</label>
                <input
                  type="text"
                  id="hallName"
                  {...register('hallName', {
                    required: 'Hall name is required',
                  })}
                  className={errors.hallName ? 'error' : ''}
                />
                {errors.hallName && (
                  <span className="error-message">{errors.hallName.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Hall Address</label>
                <input
                  type="text"
                  id="address"
                  {...register('address', {
                    required: 'Address is required',
                  })}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && (
                  <span className="error-message">{errors.address.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Contact number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
              </div>
            </>
          )}

          {selectedRole === 'admin' && (
            <div className="form-group">
              <label htmlFor="registrationCode">Registration Code</label>
              <input
                type="text"
                id="registrationCode"
                {...register('registrationCode', {
                  required: 'Registration code is required',
                })}
                className={errors.registrationCode ? 'error' : ''}
              />
              {errors.registrationCode && (
                <span className="error-message">
                  {errors.registrationCode.message}
                </span>
              )}
            </div>
          )}

          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                {...register('terms', {
                  required: 'You must accept the terms and conditions',
                })}
              />
              <span className="checkbox-label">
                I agree to the{' '}
                <Link to="/terms" className="auth-link">
                  Terms and Conditions
                </Link>
              </span>
            </label>
            {errors.terms && (
              <span className="error-message">{errors.terms.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                {...register('privacy', {
                  required: 'You must accept the privacy policy',
                })}
              />
              <span className="checkbox-label">
                I agree to the{' '}
                <Link to="/privacy" className="auth-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.privacy && (
              <span className="error-message">{errors.privacy.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
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

export default Register;