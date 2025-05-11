import React, { useState } from 'react';
import { FiFilter, FiCalendar, FiList } from 'react-icons/fi';

const EventTracker = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sample data for demonstration
  const events = [
    {
      id: 1,
      date: '2024-02-15',
      time: '18:00',
      eventType: 'Wedding',
      expectedWaste: '150',
      status: 'Pending'
    },
    {
      id: 2,
      date: '2024-02-16',
      time: '09:00',
      eventType: 'Conference',
      expectedWaste: '100',
      status: 'Scheduled'
    },
    {
      id: 3,
      date: '2024-02-14',
      time: '14:00',
      eventType: 'Corporate Event',
      expectedWaste: '80',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Scheduled': '#3b82f6',
      'In Progress': '#10b981',
      'Completed': '#16a34a',
      'Cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const filteredEvents = events
    .filter(event => filterStatus === 'all' ? true : event.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="event-tracker-container">
      <div className="tracker-header">
        <h2>Event Status Tracker</h2>
        <div className="view-controls">
          <button
            className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <FiList /> Table View
          </button>
          <button
            className={`view-button ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            <FiCalendar /> Calendar View
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <FiFilter />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <FiCalendar />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="events-table-container">
          <table className="events-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Event Type</th>
                <th>Expected Waste (kg)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.id}>
                  <td>{new Date(`${event.date} ${event.time}`).toLocaleString()}</td>
                  <td>{event.eventType}</td>
                  <td>{event.expectedWaste}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(event.status) }}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="calendar-view">
          {/* TODO: Implement calendar view using a calendar library */}
          <p className="placeholder-text">Calendar view coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default EventTracker;