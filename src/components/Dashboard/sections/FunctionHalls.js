import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';

const FunctionHalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMap, setShowMap] = useState(false);

  // Sample data for demonstration
  const functionHalls = [
    {
      id: '1',
      name: 'Sri Krishna Thirumana Mandapam',
      location: 'chengalpattu, Chennai',
      capacity: '500-1000',
      wasteTypes: ['Food', 'Recyclable'],
      status: 'active',
      lastEvent: '2025-05-09'
    }
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredHalls = functionHalls.filter(hall => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hall.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || hall.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit hall:', id);
  };

  const handleDeactivate = (id) => {
    // Implement deactivate functionality
    console.log('Deactivate hall:', id);
  };

  return (
    <div className="function-halls-container">
      <div className="section-header">
        <h1>Function Halls Management</h1>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${!showMap ? 'active' : ''}`}
            onClick={() => setShowMap(false)}
          >
            List View
          </button>
          <button
            className={`toggle-btn ${showMap ? 'active' : ''}`}
            onClick={() => setShowMap(true)}
          >
            <FiMapPin /> Map View
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {!showMap ? (
        <div className="halls-table-container">
          <table className="halls-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Waste Types</th>
                <th>Status</th>
                <th>Last Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHalls.map(hall => (
                <tr key={hall.id}>
                  <td>{hall.name}</td>
                  <td>{hall.location}</td>
                  <td>{hall.capacity}</td>
                  <td>
                    <div className="waste-types">
                      {hall.wasteTypes.map(type => (
                        <span key={type} className="waste-type-badge">
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${hall.status}`}>
                      {hall.status.charAt(0).toUpperCase() + hall.status.slice(1)}
                    </span>
                  </td>
                  <td>{hall.lastEvent}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(hall.id)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="action-btn deactivate"
                        onClick={() => handleDeactivate(hall.id)}
                        title={hall.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="map-view">
          {/* Implement map view with markers for function halls */}
          <p className="placeholder-text">Map view will be implemented with Google Maps integration</p>
        </div>
      )}
    </div>
  );
};

export default FunctionHalls;