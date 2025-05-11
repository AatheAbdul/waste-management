import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const CompostersManagement = () => {
  const [composters, setComposters] = useState([
    {
      id: '1',
      name: 'Green Earth Composters',
      location: 'Anna Nagar, Chennai',
      wasteTypes: ['Food', 'Organic'],
      capacity: '500kg/day',
      contact: {
        name: 'Rajesh Kumar',
        phone: '+91 9876543210',
        email: 'rajesh@greenearth.com'
      },
      isActive: true
    },
    {
      id: '2',
      name: 'Bio Solutions',
      location: 'Guindy, Chennai',
      wasteTypes: ['Mixed', 'Recyclable'],
      capacity: '1000kg/day',
      contact: {
        name: 'Priya Sharma',
        phone: '+91 9876543211',
        email: 'priya@biosolutions.com'
      },
      isActive: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    wasteTypes: [],
    capacity: '',
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleWasteTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(type)
        ? prev.wasteTypes.filter(t => t !== type)
        : [...prev.wasteTypes, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setComposters(composters.map(composter =>
        composter.id === editingId ? { ...formData, id: editingId } : composter
      ));
    } else {
      setComposters([...composters, { ...formData, id: Date.now().toString() }]);
    }
    handleFormClose();
  };

  const handleEdit = (composter) => {
    setFormData(composter);
    setEditingId(composter.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setComposters(composters.filter(composter => composter.id !== id));
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      location: '',
      wasteTypes: [],
      capacity: '',
      contact: {
        name: '',
        phone: '',
        email: ''
      },
      isActive: true
    });
  };

  const toggleStatus = (id) => {
    setComposters(composters.map(composter =>
      composter.id === id
        ? { ...composter, isActive: !composter.isActive }
        : composter
    ));
  };

  return (
    <div className="composters-management-container">
      <div className="section-header">
        <h1>Composters & Recyclers Management</h1>
        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          <FiPlus /> Add New
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingId ? 'Edit Composter' : 'Add New Composter'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Waste Types</label>
                <div className="waste-types-checkboxes">
                  {['Food', 'Organic', 'Mixed', 'Recyclable'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.wasteTypes.includes(type)}
                        onChange={() => handleWasteTypeChange(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contact.name"
                  value={formData.contact.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingId ? 'Update' : 'Add'} Composter
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleFormClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="composters-table-container">
        <table className="composters-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Waste Types</th>
              <th>Capacity</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {composters.map(composter => (
              <tr key={composter.id}>
                <td>{composter.name}</td>
                <td>{composter.location}</td>
                <td>
                  <div className="waste-types">
                    {composter.wasteTypes.map(type => (
                      <span key={type} className="waste-type-badge">
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{composter.capacity}</td>
                <td>
                  <div className="contact-info">
                    <p>{composter.contact.name}</p>
                    <p>{composter.contact.phone}</p>
                    <p>{composter.contact.email}</p>
                  </div>
                </td>
                <td>
                  <button
                    className={`status-toggle ${composter.isActive ? 'active' : 'inactive'}`}
                    onClick={() => toggleStatus(composter.id)}
                  >
                    {composter.isActive ? (
                      <><FiCheck /> Active</>
                    ) : (
                      <><FiX /> Inactive</>
                    )}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(composter)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(composter.id)}
                      title="Delete"
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
    </div>
  );
};

export default CompostersManagement;