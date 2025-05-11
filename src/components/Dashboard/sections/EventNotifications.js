import React, { useState } from 'react';
import { FiCalendar, FiFilter, FiMapPin } from 'react-icons/fi';

const EventNotifications = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample data for demonstration
  const [events, setEvents] = useState([
    {
      id: '1',
      eventName: 'Wedding Reception',
      venue: 'Sri Krishna Thirumana Mandapam',
      date: '2023-05-25',
      estimatedWaste: '150kg',
      wasteTypes: ['Food', 'Recyclable'],
      status: 'pending',
      location: 'Anna Nagar, Chennai'
    }
  ]);

  const handleStatusUpdate = (eventId, newStatus) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  const filteredEvents = events.filter(event => 
    filterStatus === 'all' || event.status === filterStatus
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'location':
        return a.location.localeCompare(b.location);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge-warning';
      case 'scheduled':
        return 'status-badge-info';
      case 'completed':
        return 'status-badge-success';
      default:
        return '';
    }
  };

  return (
    <div className="event-notifications-container">
      <div className="section-header">
        <h1>Event Notifications</h1>
        <div className="filter-controls">
          <div className="filter-group">
            <FiFilter />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="sort-group">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Date</option>
              <option value="location">Location</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Venue</th>
              <th><FiCalendar /> Date</th>
              <th>Estimated Waste</th>
              <th>Waste Types</th>
              <th><FiMapPin /> Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map(event => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.venue}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.estimatedWaste}</td>
                <td>
                  <div className="waste-types">
                    {event.wasteTypes.map(type => (
                      <span key={type} className="waste-type-badge">
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{event.location}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td>
                  <select
                    value={event.status}
                    onChange={(e) => handleStatusUpdate(event.id, e.target.value)}
                    className="status-update-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventNotifications;