import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FunctionHallDashboard from './sections/FunctionHallDashboard';
import AdminDashboard from './AdminDashboard';
import './Dashboard.css';
import './sections/FunctionHallDashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const RecyclerDashboard = () => (
    <div className="dashboard-section">
      <h2>Recycler Dashboard</h2>
      <div className="dashboard-actions">
        <button className="action-button">Browse Listings</button>
        <button className="action-button">Active Bids</button>
      </div>
      <div className="available-waste">
        <h3>Available Waste Listings</h3>
        <div className="listing-grid">
          {/* Placeholder for available waste */}
          <div className="listing-card">
            <h4>Mixed Recyclables</h4>
            <p>Quantity: 100kg</p>
            <p>Type: Mixed</p>
            <p>Distance: 5km away</p>
            <div className="card-actions">
              <button className="card-button">Place Bid</button>
              <button className="card-button secondary">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {user?.role === 'admin' ? (
        <AdminDashboard />
      ) : user?.role === 'function_hall' ? (
        <FunctionHallDashboard />
      ) : (
        <RecyclerDashboard />
      )}
    </div>
  );
};

export default Dashboard;