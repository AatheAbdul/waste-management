import React, { useState } from 'react';
import { FiSave, FiLock, FiHome, FiChevronRight, FiShield, FiSmartphone, FiLogOut } from 'react-icons/fi';
import adminAuthService from '../../../services/adminAuthService';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Admin User',
    email: 'admin@ecocrush.com',
    phone: '',
    avatar: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: {
      newEvents: true,
      statusUpdates: true,
      reports: false,
      systemAlerts: true
    },
    push: {
      newEvents: true,
      statusUpdates: false,
      reports: true
    },
    frequency: 'immediate'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [activeSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Chennai, India',
      lastActive: '2024-02-15 14:30'
    },
    {
      id: 2,
      device: 'Mobile App on iPhone',
      location: 'Chennai, India',
      lastActive: '2024-02-15 12:15'
    }
  ]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (type, category, checked) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [category]: checked
      }
    }));
  };

  const handleFrequencyChange = (value) => {
    setNotifications(prev => ({ ...prev, frequency: value }));
  };

  const handleEndSession = (sessionId) => {
    // Implement session termination logic here
    console.log('Ending session:', sessionId);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    setIsLoading(true);
    try {
      await adminAuthService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setMessage({ type: 'success', text: 'Password updated successfully' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-settings">
      <div className="breadcrumb">
        <FiHome />
        <FiChevronRight />
        <span>Admin Dashboard</span>
        <FiChevronRight />
        <span>Profile Settings</span>
      </div>

      <h1>Profile Settings</h1>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-grid">
        <section className="settings-section personal-info">
          <h2>Personal Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="avatar-upload">
              <img
                src={personalInfo.avatar || '/avatar-placeholder.png'}
                alt="Profile"
                className="avatar-preview"
              />
              <div className="avatar-edit">
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatarUpload">Change Photo</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>

            <button type="submit" className="save-button" disabled={isLoading}>
              <FiSave />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </section>

        <section className="settings-section security">
          <h2><FiShield /> Security</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="change-password-button" disabled={isLoading}>
              <FiLock />
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>

          <div className="two-factor-auth">
            <h3><FiSmartphone /> Two-Factor Authentication</h3>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span>Enable 2FA for enhanced security</span>
            </div>
          </div>

          <div className="active-sessions">
            <h3><FiLogOut /> Active Sessions</h3>
            <div className="sessions-list">
              {activeSessions.map(session => (
                <div key={session.id} className="session-item">
                  <div className="session-info">
                    <strong>{session.device}</strong>
                    <p>{session.location} • Last active: {session.lastActive}</p>
                  </div>
                  <button
                    className="end-session-button"
                    onClick={() => handleEndSession(session.id)}
                  >
                    End Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="settings-section notifications">
          <h2>Notification Preferences</h2>
          
          <div className="notification-category">
            <h3>Email Notifications</h3>
            <div className="notification-options">
              {Object.entries(notifications.email).map(([key, value]) => (
                <label key={key} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                  />
                  <span className="checkbox-label">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="notification-category">
            <h3>Push Notifications</h3>
            <div className="notification-options">
              {Object.entries(notifications.push).map(([key, value]) => (
                <label key={key} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange('push', key, e.target.checked)}
                  />
                  <span className="checkbox-label">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="notification-frequency">
            <h3>Notification Frequency</h3>
            <select
              value={notifications.frequency}
              onChange={(e) => handleFrequencyChange(e.target.value)}
              className="frequency-select"
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly Digest</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileSettings;