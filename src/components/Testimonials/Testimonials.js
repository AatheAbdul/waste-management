import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sri Krishna Thirumana Mahal',
    role: 'Function Hall',
    text: 'EcoCrush has revolutionized how we handle our event waste. Their efficient collection system and professional service have made waste management hassle-free.'
  },
  {
    id: 2,
    name: 'Valam Meetpu Poonga',
    role: 'Composting Partner',
    text: 'The quality of organic waste we receive through EcoCrush is consistently high. It has helped us scale our composting operations significantly.'
  },
  {
    id: 3,
    name: 'Namma Ooru Foundation',
    role: 'Waste Managing Partner',
    text: 'The consistent supply of organic waste through EcoCrush has enabled us to produce high-quality bioenzymes. Great platform for sustainable partnerships!'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>What Our Partners Say</h2>
        <div className="testimonial-carousel">
          <button className="carousel-button prev" onClick={prevTestimonial}>
            ‹
          </button>
          <div className="testimonial-card">
            {testimonials.length > 0 && (
              <>
                <p className="testimonial-text">{testimonials[currentIndex].text}</p>
                <div className="testimonial-author">
                  <strong>{testimonials[currentIndex].name}</strong>
                  <span>{testimonials[currentIndex].role}</span>
                </div>
              </>
            )}
          </div>
          <button className="carousel-button next" onClick={nextTestimonial}>
            ›
          </button>
        </div>
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;