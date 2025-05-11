import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Stats from '../Stats/Stats';
import Testimonials from '../Testimonials/Testimonials';
import './Hero.css';
import '../../styles/animations.css';

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Waste into Value</h1>
          <p className="hero-subtitle">
            Join the revolution in sustainable waste management. Connect with recyclers and composters, reduce environmental impact, and create value from waste.
          </p>
          <div className="hero-cta">
            <button onClick={handleGetStarted} className="cta-button primary">
              {user ? 'Go to Dashboard' : 'Get Started Now'}
            </button>
          </div>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">♻️</span>
              <h3>Smart Matching</h3>
              <p>AI-powered matching with verified waste managers in your area</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🌱</span>
              <h3>Sustainable Solutions</h3>
              <p>Convert waste into valuable resources</p>
            </div>
            <div className="feature">
              <span className="feature-icon">💬</span>
              <h3>Easy Communication</h3>
              <p>Seamless coordination with waste managing partners</p>
            </div>
          </div>
        </div>
      </section>
      <Stats />
      <Testimonials />
    </div>
  );
};

export default Hero;