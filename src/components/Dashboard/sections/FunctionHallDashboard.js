import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FiTruck, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import EventForm from './EventForm';
import EventTracker from './EventTracker';

const FunctionHallDashboard = () => {
  const { user } = useAuth();

  // Sample metrics data
  const metrics = [
    {
      label: 'Total Waste Diverted',
      value: '50 kg',
      color: '#16a34a'
    },
    {
      label: 'Upcoming Events',
      value: '2',
      color: '#3b82f6'
    },
    {
      label: 'Completed Collections',
      value: '1',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="function-hall-dashboard">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-header">
          <h1>Welcome,</h1>
          <p>Manage your events and waste collection schedule</p>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card" style={{ borderColor: metric.color }}>
              <div className="metric-info">
                <h3>{metric.label}</h3>
                <p>{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Form Section */}
      <section className="dashboard-section">
        <EventForm />
      </section>

      {/* Event Tracker Section */}
      <section className="dashboard-section">
        <EventTracker />
      </section>

      {/* Profile Management Section */}
      <section className="dashboard-section profile-section">
        <h2>Profile Settings</h2>
        <div className="profile-form">
          <div className="form-group">
            <label>Contact Information</label>
            <input type="text" placeholder="Phone Number" defaultValue={user?.phone} />
            <input type="email" placeholder="Email Address" defaultValue={user?.email} />
          </div>
          <div className="form-group">
            <label>Password Management</label>
            <button className="change-password-btn">Change Password</button>
          </div>
          <div className="form-group">
            <label>Notification Preferences</label>
            <div className="notification-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Email Notifications
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                SMS Notifications
              </label>
            </div>
          </div>
          <button className="save-profile-btn">Save Changes</button>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="dashboard-section feedback-section">
        <h2>Rate Our Service</h2>
        <div className="feedback-form">
          <div className="rating-group">
            <label>Service Quality</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="star">★</span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Your Feedback</label>
            <textarea placeholder="Share your experience with our collection service" />
          </div>
          <button className="submit-feedback-btn">Submit Feedback</button>
        </div>
      </section>
    </div>
  );
};

export default FunctionHallDashboard;