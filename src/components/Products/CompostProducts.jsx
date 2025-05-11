import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const CompostProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    price: 'all',
    size: 'all',
    application: 'all',
    sort: 'bestselling'
  });

  const compostProducts = [
    {
      id: 1,
      name: 'Premium Garden Compost',
      description: 'Nutrient-rich organic compost perfect for gardens and plants. OMRI certified.',
      price: 29.99,
      salePrice: null,
      type: 'compost',
      image: '🌱',
      sizes: ['5L', '10L', '20L'],
      applications: ['Garden', 'Indoor Plants'],
      benefits: ['Improves soil structure', 'Enhances nutrient content', 'Promotes healthy growth'],
      rating: 4.8,
      reviewCount: 156,
      stock: 50,
      deliveryEstimate: '2-3 business days',
      certifications: ['OMRI Listed', 'Organic Certified']
    },
    {
      id: 2,
      name: 'Organic Plant Booster',
      description: 'Specialized flowering plant compost blend with added nutrients and minerals.',
      price: 34.99,
      salePrice: 29.99,
      type: 'compost',
      image: '🌺',
      sizes: ['5L', '10L'],
      applications: ['Flowers', 'Vegetables'],
      benefits: ['Increases bloom production', 'Balanced pH levels', 'Natural pest resistance'],
      rating: 4.9,
      reviewCount: 89,
      stock: 35,
      deliveryEstimate: '2-3 business days',
      certifications: ['Organic Certified']
    },
    {
      id: 3,
      name: 'Farm-Grade Compost',
      description: 'Bulk organic compost ideal for large-scale agricultural applications.',
      price: 199.99,
      salePrice: null,
      type: 'compost',
      image: '🚜',
      sizes: ['100L', '500L', '1000L'],
      applications: ['Farm', 'Agriculture'],
      benefits: ['High nutrient density', 'Improved soil fertility', 'Long-lasting effects'],
      rating: 4.7,
      reviewCount: 42,
      stock: 15,
      deliveryEstimate: '3-5 business days',
      certifications: ['OMRI Listed', 'Organic Certified']
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      price: 'all',
      size: 'all',
      application: 'all',
      sort: 'bestselling'
    });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <div className="product-detail-page">
        <button onClick={handleBackToProducts} className="back-btn">
          ← Back to Products
        </button>

        <div className="product-detail">
          <div className="product-detail-header">
            <span className="product-icon">{selectedProduct.image}</span>
            <h1>{selectedProduct.name}</h1>
            <div className="product-meta">
              <div className="product-rating">
                {'★'.repeat(Math.floor(selectedProduct.rating))}
                {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                <span className="review-count">({selectedProduct.reviewCount} reviews)</span>
              </div>
              <div className="product-certifications">
                {selectedProduct.certifications.join(' • ')}
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="product-pricing">
              {selectedProduct.salePrice ? (
                <>
                  <span className="original-price">${selectedProduct.price}</span>
                  <span className="sale-price">${selectedProduct.salePrice}</span>
                </>
              ) : (
                <span className="regular-price">${selectedProduct.price}</span>
              )}
            </div>

            <p className="product-description">{selectedProduct.description}</p>

            <div className="product-sizes">
              <h3>Available Sizes</h3>
              <div className="size-options">
                {selectedProduct.sizes.map((size) => (
                  <button key={size} className="size-btn">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-applications">
              <h3>Recommended Applications</h3>
              <div className="application-tags">
                {selectedProduct.applications.map((app) => (
                  <span key={app} className="application-tag">{app}</span>
                ))}
              </div>
            </div>

            <div className="product-benefits">
              <h3>Benefits</h3>
              <ul>
                {selectedProduct.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="product-purchase">
              <div className="stock-info">
                <span className={`stock-status ${selectedProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="delivery-estimate">Delivery: {selectedProduct.deliveryEstimate}</span>
              </div>
              <button className="buy-now-btn" disabled={selectedProduct.stock <= 0}>
                {selectedProduct.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; <span>Compost</span>
      </nav>

      <section className="products-hero">
        <div className="products-hero-content">
          <h1>🌱 Organic Compost Products</h1>
          <p>Premium, certified organic compost for your garden, farm, or indoor plants. Our products are carefully crafted to enhance soil health and promote sustainable growing practices.</p>
        </div>
      </section>

      <div className="products-container">
        <aside className="product-filters">
          <div className="filter-group">
            <label>Size/Volume</label>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
            >
              <option value="all">All Sizes</option>
              <option value="small">Small (5L)</option>
              <option value="medium">Medium (10L-20L)</option>
              <option value="large">Large (100L+)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Application Type</label>
            <select
              value={filters.application}
              onChange={(e) => handleFilterChange('application', e.target.value)}
            >
              <option value="all">All Applications</option>
              <option value="garden">Garden</option>
              <option value="farm">Farm/Agriculture</option>
              <option value="indoor">Indoor Plants</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under30">Under $30</option>
              <option value="30to50">$30 - $50</option>
              <option value="over50">Over $50</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="bestselling">Bestselling</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>

          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>

          <div className="educational-sidebar">
            <h3>Why Choose Our Compost?</h3>
            <ul className="benefits-list">
              <li>🌿 100% Organic Certified</li>
              <li>🌱 Rich in Essential Nutrients</li>
              <li>🌍 Environmentally Sustainable</li>
              <li>🏆 OMRI Listed Products</li>
            </ul>

            <div className="seasonal-tips">
              <h4>Seasonal Recommendations</h4>
              <p>Spring is the perfect time to enrich your soil with our Premium Garden Compost!</p>
            </div>
          </div>
        </aside>

        <div className={`products-grid ${viewMode}`}>
          {compostProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductSelect(product)}
              role="button"
              tabIndex={0}
              aria-label={`View details of ${product.name}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProductSelect(product);
                }
              }}
            >
              <div className="product-image">
                <span className="product-icon" aria-hidden="true">{product.image}</span>
              </div>
              <div className="product-info">
                <span className="product-type">{product.certifications.join(' • ')}</span>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating" aria-label={`Product rated ${product.rating} out of 5 stars with ${product.reviewCount} reviews`}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  <span className="review-count">({product.reviewCount})</span>
                </div>

                <div className="product-options">
                  <div className="size-selector">
                    <label htmlFor={`size-${product.id}`}>Size</label>
                    <select 
                      id={`size-${product.id}`}
                      defaultValue={product.sizes[0]}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="quantity-selector">
                    <label htmlFor={`qty-${product.id}`}>Qty</label>
                    <select
                      id={`qty-${product.id}`}
                      defaultValue="1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="product-price" aria-label={product.salePrice ? `On sale for $${product.salePrice}, originally $${product.price}` : `Price $${product.price}`}>
                  {product.salePrice ? (
                    <>
                      <span className="original-price">${product.price}</span>
                      <span className="sale-price">${product.salePrice}</span>
                    </>
                  ) : (
                    <span className="price">${product.price}</span>
                  )}
                </div>

                <div className="product-availability">
                  <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <span className="delivery-estimate">{product.deliveryEstimate}</span>
                </div>

                <div className="product-actions">
                  <button 
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductSelect(product);
                    }}
                    aria-label={`View details of ${product.name}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="related-products">
        <h2>Related Products</h2>
        {/* Related products carousel will go here */}
      </section>

      <section className="recently-viewed">
        <h2>Recently Viewed</h2>
        {/* Recently viewed products carousel will go here */}
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I apply compost to my garden?</h3>
            <p>Apply a 2-3 inch layer of compost to your soil and mix it into the top 6-8 inches for best results.</p>
          </div>
          <div className="faq-item">
            <h3>How long does compost last?</h3>
            <p>When stored properly in a cool, dry place, our compost products maintain their quality for up to 12 months.</p>
          </div>
          {/* More FAQ items */}
        </div>
      </section>
    </div>
  );
};

export default CompostProducts;