import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ProductCard from './ProductCard';
import './Products.css';
import '../../styles/animations.css';
import compostImage from '../../assets/images/compost.jpg';
import bioenzymeImage from '../../assets/images/bioenzyme.jpg';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Simulated product data - in real app, this would come from an API
    const productData = [
      {
        id: 1,
        name: 'Premium Compost',
        description: 'High-quality organic compost for gardens and agriculture',
        category: 'Compost',
        type: 'compost',
        price: 50.00,
        rating: 4.5,
        image: compostImage,
        alt: 'EcoCrush Organic Compost Product',
        sizes: ['1kg', '2kg', '5kg'],
        status: 'available',
        stockQuantity: 100
      },
      {
        id: 2,
        name: 'Bio Enzyme Cleaner',
        description: 'Natural cleaning solution made from organic waste',
        category: 'Bioenzyme',
        type: 'bioenzyme',
        price: 75.00,
        rating: 4.8,
        image: bioenzymeImage,
        alt: 'EcoCrush Bioenzyme Cleaning Solution',
        sizes: ['500ml', '1L', '5L'],
        status: 'available',
        stockQuantity: 50
      }
    ];
    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [products, searchQuery, sortBy, category]);

  return (
    <Container maxWidth="lg" className="products-container">
      <Box className="products-hero stagger-fade-in" sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Sustainable Solutions
        </Typography>
        <Typography variant="h5" component="p" className="products-subtitle" gutterBottom>
          Discover our range of eco-friendly products and solutions for effective waste management
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }} className="products-filters stagger-fade-in">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Compost">Compost</MenuItem>
                <MenuItem value="Bioenzyme">Bioenzyme</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} className="products-grid stagger-fade-in">
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box className="cta-section stagger-fade-in" sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Ready to Make a Difference?
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Join us in creating a sustainable future through effective waste management solutions.
        </Typography>
        <button className="cta-button">
          Contact Us
        </button>
      </Box>
    </Container>
  );
};

export default Products;