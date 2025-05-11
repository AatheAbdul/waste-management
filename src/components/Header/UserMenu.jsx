import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : user?.email?.[0]?.toUpperCase() || '?';
  };

  const getMenuItems = () => {
    const items = [
      { label: 'Profile Settings', path: '/profile', icon: '👤' },
      { label: 'Notifications', path: '/notifications', icon: '🔔' },
    ];

    if (user?.role === 'admin') {
      items.push(
        { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { label: 'Manage Halls', path: '/admin/halls', icon: '🏢' },
        { label: 'Manage Events', path: '/admin/events', icon: '📅' },
        { label: 'Manage Composters', path: '/admin/composters', icon: '♻️' }
      );
    } else if (user?.role === 'hall_manager') {
      items.push(
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'New Event', path: '/events/new', icon: '📅' },
        { label: 'Status', path: '/status', icon: '📈' }
      );
    }

    return items;
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        className="notification-bell"
        onClick={() => setIsOpen(false)}
        aria-label="Notifications"
      >
        🔔
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount}</span>
        )}
      </button>

      <button
        className="user-avatar"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <span className="avatar-initials">{getInitials(user?.name)}</span>
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <span className="user-name">{user?.name || user?.email}</span>
            <span className="user-role">{user?.role?.replace('_', ' ')}</span>
          </div>
          
          <nav className="dropdown-menu">
            {getMenuItems().map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="menu-item"
                onClick={() => setIsOpen(false)}
              >
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <button className="logout-button" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;