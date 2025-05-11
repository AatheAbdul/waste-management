import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Dashboard.css';

// Import dashboard sections (to be created)
import Overview from './sections/Overview';
import FunctionHalls from './sections/FunctionHalls';
import EventNotifications from './sections/EventNotifications';
import CompostersManagement from './sections/CompostersManagement';
import OrdersManagement from './sections/OrdersManagement';
import Settings from './sections/Settings';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-content">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="function-halls" element={<FunctionHalls />} />
            <Route path="events" element={<EventNotifications />} />
            <Route path="composters" element={<CompostersManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;