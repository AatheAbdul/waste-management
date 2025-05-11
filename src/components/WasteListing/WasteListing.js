import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme/theme';
import './WasteListing.css';

const WasteListing = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Food Waste',
      quantity: '50',
      unit: 'kg',
      type: 'Organic',
      description: 'Leftover food from weekend event',
      location: 'Downtown Function Hall',
      postedAt: new Date().toISOString(),
      status: 'active',
      bids: []
    }
  ]);

  const [newListing, setNewListing] = useState({
    title: '',
    quantity: '',
    unit: 'kg',
    type: 'Organic',
    description: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listing = {
      ...newListing,
      id: Date.now(),
      postedAt: new Date().toISOString(),
      status: 'active',
      bids: []
    };
    setListings(prev => [listing, ...prev]);
    setNewListing({
      title: '',
      quantity: '',
      unit: 'kg',
      type: 'Organic',
      description: '',
      location: ''
    });
  };

  const ListingCard = ({ listing }) => (
    <div className="listing-card" style={{ backgroundColor: theme.colors.white }}>
      <h3 style={{ color: theme.colors.primary }}>{listing.title}</h3>
      <div className="listing-details">
        <p><strong>Quantity:</strong> {listing.quantity} {listing.unit}</p>
        <p><strong>Type:</strong> {listing.type}</p>
        <p><strong>Location:</strong> {listing.location}</p>
        <p><strong>Description:</strong> {listing.description}</p>
        <p className="posted-time">
          Posted: {new Date(listing.postedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="card-actions">
        {user?.role === 'recycler' ? (
          <button 
            className="btn-primary"
            onClick={() => console.log('Place bid for', listing.id)}
          >
            Place Bid
          </button>
        ) : (
          <button 
            className="btn-secondary"
            onClick={() => console.log('Edit listing', listing.id)}
          >
            Edit Listing
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="waste-listing-container">
      {user?.role === 'function_hall' && (
        <div className="create-listing-section">
          <h2>Create New Waste Listing</h2>
          <form onSubmit={handleSubmit} className="listing-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newListing.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newListing.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select
                  id="unit"
                  name="unit"
                  value={newListing.unit}
                  onChange={handleInputChange}
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="tons">Tons</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="type">Waste Type</label>
              <select
                id="type"
                name="type"
                value={newListing.type}
                onChange={handleInputChange}
              >
                <option value="Organic">Organic</option>
                <option value="Recyclable">Recyclable</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newListing.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newListing.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Create Listing
            </button>
          </form>
        </div>
      )}

      <div className="listings-section">
        <h2>{user?.role === 'recycler' ? 'Available Listings' : 'Your Listings'}</h2>
        <div className="listings-grid">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteListing;