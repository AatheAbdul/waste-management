import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import CompostProducts from './CompostProducts';
import './Products.css';
import '../../styles/animations.css';

const Products = () => {
  const navigate = useNavigate();

  const productCategories = [
    {
      id: 1,
      name: 'Compost',
      description: 'Premium organic compost for gardens and farms',
      image: '🌱',
      benefits: [
        'Nutrient-rich organic matter',
        'Improves soil structure',
        'Promotes plant growth'
      ]
    },
    {
      id: 2,
      name: 'Bioenzymes',
      description: 'Natural cleaning and agricultural solutions',
      image: '🧪',
      benefits: [
        'Eco-friendly cleaning',
        'Natural pest control',
        'Soil enrichment'
      ]
    }
  ];

  const handleCategorySelect = (categoryName) => {
    navigate(`/products/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="products-page">
      <Routes>
        <Route
          path="/"
          element={
            <div className="products-container">
              <section className="products-hero stagger-fade-in">
                <h1>Our Products</h1>
                <p className="products-subtitle">
                  Sustainable solutions for waste management and organic farming
                </p>
              </section>

              <section className="product-categories stagger-fade-in">
                {productCategories.map((category) => (
                  <div
                    key={category.id}
                    className="category-card"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    <div className="category-icon">{category.image}</div>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <ul className="benefits-list">
                      {category.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <button className="view-products-btn">
                      View Products
                    </button>
                  </div>
                ))}
              </section>

              <section className="products-cta stagger-fade-in">
                <h2>Ready to Make a Sustainable Choice?</h2>
                <p>
                  Browse our selection of eco-friendly products and start your
                  journey towards sustainable living.
                </p>
                <div className="cta-buttons">
                  <Link to="/contact" className="contact-btn">
                    Contact Sales
                  </Link>
                  <Link to="/about" className="learn-more-btn">
                    Learn More
                  </Link>
                </div>
              </section>
            </div>
          }
        />
        <Route path="/compost" element={<CompostProducts />} />
        <Route
          path="/bioenzymes"
          element={
            <div className="coming-soon">
              <h2>Bioenzymes Products Coming Soon!</h2>
              <p>We're working on bringing you our innovative bioenzyme solutions.</p>
              <button onClick={() => navigate('/products')} className="back-btn">
                Back to Products
              </button>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Products;