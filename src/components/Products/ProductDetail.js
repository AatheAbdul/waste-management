import React from 'react';
import './Products.css';

const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="product-detail-content">
          <div className="product-detail-header">
            <div className="product-detail-image">
              <span className="product-emoji-large">{product.image}</span>
            </div>
            <div className="product-detail-info">
              <h2>{product.name}</h2>
              <span className="product-type-badge">{product.type}</span>
              <p className="product-detail-description">{product.description}</p>
              <div className="product-price-large">₹{product.price}</div>
            </div>
          </div>

          <div className="product-specifications">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key.replace('_', ' ')}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-usage">
            <h3>Usage Instructions</h3>
            <p>{product.usage}</p>
          </div>

          <div className="product-benefits">
            <h3>Benefits</h3>
            <ul>
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="product-reviews">
            <h3>Customer Reviews</h3>
            <div className="reviews-container">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user}</span>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;