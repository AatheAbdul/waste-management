import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (consent && email) {
      // TODO: Implement newsletter subscription
      console.log('Subscribe:', email);
      setEmail('');
      setConsent(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <div className="contact-details">
            <a href="mailto:info@ecocrush.com" className="contact-item">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              info@ecocrush.com
            </a>
            <a href="tel:+1234567890" className="contact-item">
              <i className="fas fa-phone" aria-hidden="true"></i>
              9344384240
            </a>
            <address className="contact-item">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              Vandalur, Chennai, Tamil Nadu
            </address>
            <Link to="/contact" className="contact-button">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/partners">Partners</Link></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com/ecocrush" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/eco_crush_/profilecard/?igsh=azdlMmdidGlxZHl3" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://twitter.com/ecocrush" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="https://linkedin.com/company/ecocrush" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest updates on sustainable waste management.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              required
            />
            <div className="consent-checkbox">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <label htmlFor="consent">
                I agree to receive newsletters and accept the privacy policy
              </label>
            </div>
            <button type="submit" className="subscribe-button" disabled={!consent}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="company-info">
          <p className="mission-statement">
            Revolutionizing waste management through sustainable solutions and partnerships.
          </p>
          <p className="copyright">
            © {currentYear} EcoCrush. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;