import React, { useState } from 'react';
import { FiMapPin, FiFilter, FiPhone, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme/theme';
import './Partners.css';
import compostImage from '../../assets/images/compostMaking.jpg';

const Partners = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    wasteType: 'all',
    location: '',
    capacity: 'all'
  });

  const partners = [
    {
      id: 1,
      name: 'Valam Meetpu Poonga',
      location: 'Thirukazhukundram, Chengalpattu',
      serviceArea: ['Chennai', 'Chengalpattu'],
      wasteTypes: ['Food Waste', 'Garden Waste'],
      capacity: '500 tons/month',
      description: 'Composting facility specializing in converting food and garden waste into premium organic compost.',
      contact: {
        phone: '+91-9080201209'
      }
    }
  ];

  const successStories = [
    {
      id: 1,
      title: 'From Waste to Wonder',
      partner: 'Valam Meetpu Poonga',
      description: 'Transformed 100 kgs of food waste into premium compost.',
      impact: '60% reduction in landfill waste',
      image: compostImage
    }
  ];

  const statistics = {
    totalWasteProcessed: '50 kgs',
    partnersCount: 5,
    citiesServed: 1,
    carbonOffset: '2500 tons'
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const PartnerCard = ({ partner }) => (
    <div className="partner-card" style={{ backgroundColor: theme.colors.white }}>
      <div className="partner-header">
        <h3>{partner.name}</h3>
      </div>
      <div className="partner-info">
        <p className="location">
          <FiMapPin /> {partner.location}
        </p>
        <p className="service-area">
          <strong>Service Areas:</strong> {partner.serviceArea.join(', ')}
        </p>
        <div className="waste-types">
          <strong>Accepts:</strong>
          {partner.wasteTypes.map(type => (
            <span key={type} className="waste-type-tag">{type}</span>
          ))}
        </div>
        <p className="capacity">
          <strong>Processing Capacity:</strong> {partner.capacity}
        </p>
        <p className="description">{partner.description}</p>
        <div className="contact-info">
          <a href={`tel:${partner.contact.phone}`} className="contact-link">
            <FiPhone /> {partner.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );

  const SuccessStoryCard = ({ story }) => (
    <div className="success-story-card">
      <img src={story.image} alt={story.title} className="story-image" />
      <div className="story-content">
        <h3>{story.title}</h3>
        <p className="partner-name">{story.partner}</p>
        <p className="description">{story.description}</p>
        <p className="impact">{story.impact}</p>
      </div>
    </div>
  );

  return (
    <div className="partners-container">
      <section className="intro-section">
        <h1>Our Partner Network</h1>
        <p className="intro-text">
          EcoCrush partners with leading composters and recyclers to ensure sustainable
          waste management. Our partners transform waste into valuable resources,
          contributing to a circular economy.
        </p>
      </section>

      <section className="filters-section">
        <div className="filter-group">
          <label>
            Waste Type
            <select name="wasteType" value={filters.wasteType} onChange={handleFilterChange}>
              <option value="all">All Types</option>
              <option value="food">Food Waste</option>
              <option value="garden">Garden Waste</option>
              <option value="plastic">Plastics</option>
              <option value="paper">Paper</option>
            </select>
          </label>
          <label>
            Location
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter city or area"
            />
          </label>
          <label>
            Capacity
            <select name="capacity" value={filters.capacity} onChange={handleFilterChange}>
              <option value="all">All Capacities</option>
              <option value="small">&lt; 100 tons/month</option>
              <option value="medium">100-500 tons/month</option>
              <option value="large">&gt; 500 tons/month</option>
            </select>
          </label>
        </div>
      </section>

      <section className="partners-grid">
        {partners.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </section>

      <section className="statistics-section">
        <div className="stat-card">
          <h3>{statistics.totalWasteProcessed}</h3>
          <p>Total Waste Processed</p>
        </div>
        <div className="stat-card">
          <h3>{statistics.partnersCount}</h3>
          <p>Active Partners</p>
        </div>
        <div className="stat-card">
          <h3>{statistics.citiesServed}</h3>
          <p>Cities Served</p>
        </div>
        <div className="stat-card">
          <h3>{statistics.carbonOffset}</h3>
          <p>Carbon Offset</p>
        </div>
      </section>

      <section className="success-stories-section">
        <h2>Success Stories</h2>
        <div className="stories-grid">
          {successStories.map(story => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="become-partner-section">
        <h2>Become a Partner</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>Expanded Network</h4>
            <p>Connect with a network of waste generators</p>
          </div>
          <div className="benefit-card">
            <h4>Digital Platform</h4>
            <p>Streamlined operations through our digital platform</p>
          </div>
          <div className="benefit-card">
            <h4>Growth Opportunity</h4>
            <p>Scale your business with consistent waste supply</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Partner Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Working with EcoCrush has streamlined our waste collection process and helped us expand our capacity."</p>
            <div className="testimonial-author">
              <strong>Rajesh Kumar</strong>
              <span>Valam Meetpu Poonga</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;