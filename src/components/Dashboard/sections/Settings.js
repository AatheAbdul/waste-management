import React, { useState } from 'react';
import { FiSave, FiBell, FiMail, FiGlobe } from 'react-icons/fi';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      newEvents: true,
      orderUpdates: true,
      systemAlerts: false,
      emailNotifications: true
    },
    site: {
      companyName: 'EcoCrush',
      contactEmail: 'admin@ecocrush.com',
      contactPhone: '+91 9876543210',
      address: 'Chennai, Tamil Nadu, India'
    },
    preferences: {
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR'
    }
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleNotificationChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting]
      }
    }));
  };

  const handleSiteInfoChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      site: {
        ...prev.site,
        [name]: value
      }
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the settings to your backend
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className="settings-container">
      <h1>Admin Settings</h1>

      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h2><FiBell /> Notification Preferences</h2>
          <div className="notification-settings">
            <label className="toggle-setting">
              <input
                type="checkbox"
                checked={settings.notifications.newEvents}
                onChange={() => handleNotificationChange('newEvents')}
              />
              <span>New Event Notifications</span>
            </label>

            <label className="toggle-setting">
              <input
                type="checkbox"
                checked={settings.notifications.orderUpdates}
                onChange={() => handleNotificationChange('orderUpdates')}
              />
              <span>Order Status Updates</span>
            </label>

            <label className="toggle-setting">
              <input
                type="checkbox"
                checked={settings.notifications.systemAlerts}
                onChange={() => handleNotificationChange('systemAlerts')}
              />
              <span>System Alerts</span>
            </label>

            <label className="toggle-setting">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
              <span>Email Notifications</span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2><FiGlobe /> Site Information</h2>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={settings.site.companyName}
              onChange={handleSiteInfoChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.site.contactEmail}
              onChange={handleSiteInfoChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={settings.site.contactPhone}
              onChange={handleSiteInfoChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={settings.site.address}
              onChange={handleSiteInfoChange}
              rows="3"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2><FiMail /> System Preferences</h2>
          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={settings.preferences.language}
              onChange={handlePreferenceChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          <div className="form-group">
            <label>Timezone</label>
            <select
              name="timezone"
              value={settings.preferences.timezone}
              onChange={handlePreferenceChange}
            >
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="GMT">GMT</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Format</label>
            <select
              name="dateFormat"
              value={settings.preferences.dateFormat}
              onChange={handlePreferenceChange}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="form-group">
            <label>Currency</label>
            <select
              name="currency"
              value={settings.preferences.currency}
              onChange={handlePreferenceChange}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn">
            <FiSave /> Save Settings
          </button>
        </div>

        {showSaveSuccess && (
          <div className="save-success-message">
            Settings saved successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default Settings;