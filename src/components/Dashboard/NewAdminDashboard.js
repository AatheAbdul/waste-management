import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiBell, FiPieChart, FiHome, FiCalendar, FiRecycle, FiLogOut } from 'react-icons/fi';
import adminAuthService from '../../services/adminAuthService';
import './Dashboard.css';

// Import dashboard sections
import Overview from './sections/Overview';
import FunctionHalls from './sections/FunctionHalls';
import EventManagement from './sections/EventManagement';
import CompostersManagement from './sections/CompostersManagement';
import ProfileSettings from './sections/ProfileSettings';
import Notifications from './sections/Notifications';

const NewAdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navItems = [
    { path: 'dashboard', icon: <FiPieChart />, label: '📊 Dashboard' }
  ];

  useEffect(() => {
    // Session validation
    const validateSession = () => {
      const sessionToken = localStorage.getItem('adminSessionToken') || 
                          sessionStorage.getItem('adminSessionToken');

      if (!sessionToken || !adminAuthService.validateSession(sessionToken)) {
        handleLogout();
      }
    };

    validateSession();
    const interval = setInterval(validateSession, 60000); // Check every minute

    // Auto-logout on inactivity
    const activityTimeout = setTimeout(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000) { // 30 minutes
        handleLogout();
      }
    }, 30 * 60 * 1000);

    // Activity listeners
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);

    return () => {
      clearInterval(interval);
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [lastActivity, navigate]);

  const handleLogout = () => {
    const sessionToken = localStorage.getItem('adminSessionToken') || 
                        sessionStorage.getItem('adminSessionToken');
    if (sessionToken) {
      adminAuthService.logout(sessionToken);
    }
    localStorage.removeItem('adminSessionToken');
    sessionStorage.removeItem('adminSessionToken');
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-container">
      <button 
        className="mobile-nav-toggle"
        onClick={() => setShowMobileNav(!showMobileNav)}
        aria-expanded={showMobileNav}
      >
        <span className="sr-only">Toggle navigation</span>
        <div className="hamburger"></div>
      </button>

      <aside className={`dashboard-sidebar ${showMobileNav ? 'show' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.svg" alt="EcoCrush Logo" className="dashboard-logo" />
          <h2>Admin Dashboard</h2>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/admin/dashboard/${item.path}`}
              className={`nav-item ${location.pathname === `/admin/dashboard/${item.path}` ? 'active' : ''}`}
              onClick={() => setShowMobileNav(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button onClick={handleLogout} className="nav-item logout-btn">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <input type="search" placeholder="Search..." />
          </div>
          <div className="header-actions">
          </div>
        </header>

        <div className="dashboard-content">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="dashboard" element={<Overview />} />
            <Route path="halls" element={<FunctionHalls />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="composters" element={<CompostersManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default NewAdminDashboard;