import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="services-container">
      {/* Primary Service Section */}
      <section className="service-section">
        <h1>Our Services</h1>
        <div className="service-card">
          <div className="service-image function-hall-image" />
          <h2>Function Hall Waste Management</h2>
          <p>EcoCrush specializes in collecting waste from function halls and events, then connecting this waste with our network of processing partners. We handle the logistics, scheduling, and transportation to ensure proper waste management without facility owners needing to worry about disposal.</p>
          <div className="button-group">
            <button onClick={() => scrollToSection('function-hall-details')} className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Secondary Services Section */}
      <section className="service-section">
        <div className="service-card">
          <div className="service-image composting-image" />
          <h2>Composting Partnerships</h2>
          <p>Through our established partnerships with professional composting facilities, we ensure all collected organic waste is properly processed into high-quality compost. We don't operate our own composting facilities - instead, we've built reliable relationships with specialized partners to handle this step in the waste transformation journey.</p>
          <div className="button-group">
            <button onClick={() => scrollToSection('composting-details')} className="learn-more-btn">Learn More</button>
          </div>
        </div>

        <div className="service-card">
          <div className="service-image bioenzyme-image" />
          <h2>Bioenzyme Production and Sales</h2>
          <p>EcoCrush partners with specialized bioenzyme producers who transform appropriate waste streams into effective cleaning and waste treatment solutions. Our role is connecting waste generators with production experts, then distributing the resulting bioenzyme products through our sales channels.</p>
          <div className="button-group">
            <button onClick={() => scrollToSection('bioenzyme-details')} className="learn-more-btn">Learn More</button>
            <Link to="/products.html?category=bioenzymes" className="shop-btn">Shop Bioenzymes</Link>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="process-flow-section">
        <h2>How Our Services Connect</h2>
        <div className="process-flow-diagram">
          <div className="process-step">
            <div className="step-icon">1</div>
            <h3>Waste Collection</h3>
            <p>We collect waste from function halls and events</p>
          </div>
          <div className="process-step">
            <div className="step-icon">2</div>
            <h3>Processing</h3>
            <p>Partner facilities process waste into valuable resources</p>
          </div>
          <div className="process-step">
            <div className="step-icon">3</div>
            <h3>Distribution</h3>
            <p>Products are distributed through our sales channels</p>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section id="function-hall-details" className="details-section">
        <div className="details-content">
          <h2>Function Hall Waste Management Details</h2>
          <p>Our comprehensive waste management service for function halls and events ensures smooth operations while maximizing environmental benefits. We coordinate pickup schedules, provide proper waste segregation guidance, and maintain detailed tracking of all waste streams.</p>
          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Hassle-free waste management</li>
            <li>Reduced environmental impact</li>
            <li>Professional handling and documentation</li>
            <li>Flexible scheduling options</li>
          </ul>
          <div className="testimonial-card">
            <p>"EcoCrush has transformed how we handle event waste. Their service is reliable and professional, making waste management one less thing to worry about."</p>
            <cite>- Sarah Chen, Event Center Manager</cite>
          </div>
        </div>
      </section>

      <section id="composting-details" className="details-section">
        <div className="details-content">
          <h2>Composting Partnerships Details</h2>
          <p>Our partnership model connects waste generators with expert composting facilities, ensuring optimal processing of organic waste. We manage the entire process from collection to delivery, while our partners focus on creating high-quality compost.</p>
          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Expert handling of organic waste</li>
            <li>Quality-controlled composting process</li>
            <li>Regular progress updates</li>
            <li>Reduced landfill impact</li>
          </ul>
          <div className="testimonial-card">
            <p>"Working with EcoCrush has streamlined our composting operations. Their logistics management is exceptional."</p>
            <cite>- Michael Wong, Composting Facility Director</cite>
          </div>
        </div>
      </section>

      <section id="bioenzyme-details" className="details-section">
        <div className="details-content">
          <h2>Bioenzyme Production and Sales Details</h2>
          <p>Through our partnership with specialized producers, we facilitate the transformation of suitable waste into effective bioenzyme products. Our role focuses on connecting waste sources with production expertise and managing product distribution.</p>
          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>High-quality bioenzyme products</li>
            <li>Sustainable waste transformation</li>
            <li>Expert production partners</li>
            <li>Reliable distribution network</li>
          </ul>
          <div className="testimonial-card">
            <p>"The bioenzyme products distributed by EcoCrush are consistently high-quality. Their partnership approach ensures excellent results."</p>
            <cite>- Dr. Lisa Tan, Biotechnology Specialist</cite>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-stats">
        <h2>Our Environmental Impact</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Tons of Waste Diverted</p>
          </div>
          <div className="stat-card">
            <h3>300+</h3>
            <p>Partner Facilities</p>
          </div>
          <div className="stat-card">
            <h3>2000+</h3>
            <p>Events Serviced</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Partner with EcoCrush?</h2>
        <div className="cta-buttons">
          <Link to="/contact.html?service=partnership" className="cta-button">Partner With Us</Link>
          <Link to="/contact.html" className="cta-button">Contact Our Team</Link>
          <Link to="/products.html" className="cta-button">View Our Products</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;