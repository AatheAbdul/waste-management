import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import ProductDetail from './ProductDetail';
import './Products.css';

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    size: 'all',
    application: 'all'
  });

  const products = [
    {
      id: 1,
      name: 'Premium Garden Compost',
      type: 'compost',
      image: '/assets/images/compost.jpg',
      alt: 'EcoCrush Organic Compost Product',
      description: 'Nutrient-rich compost perfect for home gardens and plants',
      price: 299,
      sizes: ['5kg', '10kg', '25kg'],
      application: 'garden',
      specifications: {
        pH: '6.5-7.5',
        organic_matter: '65%',
        moisture: '35%'
      },
      usage: 'Mix with soil before planting or use as top dressing',
      benefits: ['Improves soil structure', 'Enhances nutrient retention', 'Promotes healthy root growth'],
      reviews: [
        { user: 'GreenThumb', rating: 5, comment: 'Amazing results in my vegetable garden!' },
        { user: 'PlantLover', rating: 4, comment: 'Good quality, plants love it' }
      ]
    },
    {
      id: 2,
      name: 'Agricultural Bioenzyme',
      type: 'bioenzyme',
      image: '/assets/images/bioenzyme.jpg',
      alt: 'EcoCrush Bioenzyme Cleaning Solution',
      description: 'Concentrated bioenzyme formula for enhanced crop yield',
      price: 599,
      sizes: ['1L', '5L', '20L'],
      application: 'farm',
      specifications: {
        concentration: 'High',
        shelf_life: '2 years',
        application_rate: '5ml/L'
      },
      usage: 'Dilute with water and spray directly on crops',
      benefits: ['Accelerates nutrient absorption', 'Increases crop resistance', 'Improves soil microbial activity'],
      reviews: [
        { user: 'FarmPro', rating: 5, comment: 'Significant improvement in crop health' },
        { user: 'OrganicFarmer', rating: 5, comment: 'Best natural solution for farming' }
      ]
    },
    // Add more products here
  ];

  const filteredProducts = products.filter(product => {
    if (filters.type !== 'all' && product.type !== filters.type) return false;
    if (filters.application !== 'all' && product.application !== filters.application) return false;
    return true;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="products-hero-content">
          <h1>Sustainable Solutions for Your Garden & Farm</h1>
          <p>Premium compost and bioenzymes for optimal growth and soil health</p>
        </div>
      </section>

      <div className="products-container">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
        
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </div>

      <section className="education-section">
        <h2>Why Choose Our Products?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">🌿</span>
            <h3>100% Organic</h3>
            <p>Made from carefully processed organic waste, free from harmful chemicals</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🌍</span>
            <h3>Eco-Friendly</h3>
            <p>Sustainable production process that helps reduce waste and carbon footprint</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🌱</span>
            <h3>Enhanced Growth</h3>
            <p>Scientifically proven to improve plant growth and soil health</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductGrid;