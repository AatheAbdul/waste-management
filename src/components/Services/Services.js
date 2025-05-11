import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import '../../styles/animations.css';

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      learnMoreButtons.forEach(button => {
        button.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="services-container">
      {/* Primary Service Section */}
      <section className="service-section primary-service">
        <h1>Our Services</h1>
        <div className="service-card main-service">
          <div className="service-image function-hall-image"></div>
          <h2>Function Hall Waste Management</h2>
          <p>EcoCrush specializes in collecting waste from function halls and events, then connecting this waste with our network of processing partners. We handle the logistics, scheduling, and transportation to ensure proper waste management without facility owners needing to worry about disposal.</p>
          <a href="#function-hall-details" className="learn-more-btn">Learn More</a>
        </div>
      </section>

      {/* Secondary Services Section */}
      <section className="service-section secondary-services">
        <div className="service-card">
          <div className="service-image composting-image"></div>
          <h2>Composting Partnerships</h2>
          <p>Through our established partnerships with professional composting facilities, we ensure all collected organic waste is properly processed into high-quality compost. We don't operate our own composting facilities - instead, we've built reliable relationships with specialized partners to handle this step in the waste transformation journey.</p>
          <a href="#composting-details" className="learn-more-btn">Learn More</a>
        </div>

        <div className="service-card">
          <div className="service-image bioenzyme-image"></div>
          <h2>Bioenzyme Production and Sales</h2>
          <p>EcoCrush partners with specialized bioenzyme producers who transform appropriate waste streams into effective cleaning and waste treatment solutions. Our role is connecting waste generators with production experts, then distributing the resulting bioenzyme products through our sales channels.</p>
          <div className="button-group">
            <a href="#bioenzyme-details" className="learn-more-btn">Learn More</a>
            <button onClick={() => navigate('/products?category=bioenzymes')} className="shop-btn">Shop Bioenzymes</button>
          </div>
        </div>
      </section>

      {/* Process Flow Diagram */}
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
        <h2>Function Hall Waste Management Details</h2>
        <div className="details-content">
          <p>Our comprehensive function hall waste management service streamlines the entire process of waste collection and disposal for event venues. We understand that event spaces need reliable, efficient waste management that doesn't interfere with their operations.</p>
          <p>Through our coordinated approach, we ensure timely collection, proper sorting, and sustainable disposal of all waste types generated during events. Our team works closely with venue staff to establish optimal collection schedules and procedures.</p>
          <p>By partnering with EcoCrush, function halls can focus on their core business while we handle all aspects of waste management, from initial collection to final processing.</p>
          
          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Hassle-free waste management</li>
            <li>Scheduled collections that work around your events</li>
            <li>Professional waste sorting and handling</li>
            <li>Reduced environmental impact</li>
          </ul>

          <div className="testimonial-card">
            <p>"EcoCrush has transformed how we handle waste at our venue. Their service is reliable, professional, and has helped us become more environmentally responsible."</p>
            <cite>- Krishna, Sri Krishna Thirumana Mahal</cite>
          </div>
        </div>
      </section>

      <section id="composting-details" className="details-section">
        <h2>Composting Partnerships Details</h2>
        <div className="details-content">
          <p>Our composting partnership program connects waste generators with professional composting facilities, creating a seamless flow of organic waste to valuable compost products. We've carefully selected partners who maintain the highest standards in composting operations.</p>
          <p>Through these partnerships, we ensure that organic waste is properly processed and transformed into high-quality compost that can be used in agriculture and landscaping. Our role focuses on coordinating the logistics and ensuring quality control throughout the process.</p>
          <p>We maintain strong relationships with multiple composting facilities to ensure reliable processing capacity and consistent quality standards.</p>

          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Access to professional composting facilities</li>
            <li>Quality-controlled processing</li>
            <li>Regular reporting on waste processing</li>
            <li>Reduced landfill impact</li>
          </ul>

          <div className="testimonial-card">
            <p>"Working with EcoCrush has helped us scale our composting operations while maintaining consistent quality. Their logistics support is invaluable."</p>
            <cite>- Michael, Valam Meetpu Poonga</cite>
          </div>
        </div>
      </section>

      <section id="bioenzyme-details" className="details-section">
        <h2>Bioenzyme Production and Sales Details</h2>
        <div className="details-content">
          <p>Our bioenzyme program represents a perfect example of our partnership-based approach to waste transformation. We work with specialized producers who convert suitable waste materials into effective bioenzyme products for cleaning and waste treatment.</p>
          <p>These bioenzymes are natural, eco-friendly solutions that can be used in various applications, from drain cleaning to waste treatment. Our role involves ensuring quality control and managing the distribution of these products to end users.</p>
          <p>Through our sales channels, we make these sustainable products available to businesses and consumers who are looking for environmentally responsible cleaning solutions.</p>

          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Access to eco-friendly cleaning products</li>
            <li>Professional grade solutions</li>
            <li>Sustainable waste transformation</li>
            <li>Expert product support</li>
          </ul>

          <div className="testimonial-card">
            <p>"The bioenzyme products we source through EcoCrush are effective and truly eco-friendly. Their knowledge and support make them an invaluable partner."</p>
            <cite>- Kavitha, Namma Ooru Foundation</cite>
          </div>
        </div>
      </section>

      {/* Environmental Impact Stats */}
      <section className="impact-stats">
        <h2>Our Environmental Impact</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>50+</h3>
            <p>kgs of Waste Diverted</p>
          </div>
          <div className="stat-card">
            <h3>20+</h3>
            <p>kgs of Compost Created</p>
          </div>
          <div className="stat-card">
            <h3>10+</h3>
            <p>Liters of Bioenzymes Produced</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <div className="cta-buttons">
          <button onClick={() => navigate('/contact?service=partnership')} className="cta-button">Partner With Us</button>
          <button onClick={() => navigate('/contact')} className="cta-button">Contact Our Team</button>
          <button onClick={() => navigate('/products')} className="cta-button">View Our Products</button>
        </div>
      </section>
    </div>
  );
};

export default Services;