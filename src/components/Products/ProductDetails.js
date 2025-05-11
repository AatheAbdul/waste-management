import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, Rating, Chip, FormControl, InputLabel, Select, MenuItem, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import './Products.css';
import compostImage from '../../assets/images/compost.jpg';
import bioenzymeImage from '../../assets/images/bioenzyme.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // In a real application, this would fetch product data from an API
  const product = {
    id: parseInt(id),
    name: id === '1' ? 'Premium Compost' : 'Bio Enzyme Cleaner',
    description: id === '1' 
      ? 'High-quality organic compost perfect for gardens and agriculture. Made from carefully processed organic waste, this premium compost provides essential nutrients for plant growth.'
      : 'Natural cleaning solution created from citrus and kitchen waste. Effective for various cleaning purposes while being environmentally friendly.',
    category: id === '1' ? 'Compost' : 'Bioenzyme',
    type: id === '1' ? 'compost' : 'bioenzyme',
    price: id === '1' ? 15 : 75,
    rating: id === '1' ? 4.5 : 4.8,
    image: id === '1' ? compostImage : bioenzymeImage,
    sizes: id === '1' ? ['1kg', '2kg', '5kg'] : ['500ml', '1L', '5L'],
    status: 'available',
    stockQuantity: id === '1' ? 100 : 50,
    features: id === '1' 
      ? [
          'Rich in organic matter',
          'Balanced nutrient content',
          'Improves soil structure',
          'Promotes healthy plant growth',
          'Chemical-free'
        ]
      : [
          'Natural cleaning power',
          'Multi-purpose solution',
          'Eco-friendly formula',
          'Pleasant citrus scent',
          'Safe for all surfaces'
        ],
    specifications: id === '1'
      ? {
          'Nutrient Content': 'NPK balanced',
          'pH Level': '6.5-7.5',
          'Organic Matter': '65-70%',
          'Moisture Content': '35-40%',
          'Packaging': 'Recyclable bags'
        }
      : {
          'pH Level': '4.0-4.5',
          'Concentration': '100% natural',
          'Shelf Life': '6 months',
          'Storage': 'Cool, dry place',
          'Packaging': 'Recyclable bottles'
        }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // TODO: Implement cart functionality
    console.log('Added to cart:', {
      ...product,
      selectedSize,
      quantity
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1
                }}
              />
            </Paper>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={product.category} color="primary" />
                <Chip
                  label={product.status === 'available' ? 'In Stock' : 'Out of Stock'}
                  color={product.status === 'available' ? 'success' : 'error'}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
              </Box>

              <Typography variant="h5" color="primary" gutterBottom>
                ₹{product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={selectedSize}
                    label="Size"
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes.map(size => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Quantity</InputLabel>
                  <Select
                    value={quantity}
                    label="Quantity"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>

          {/* Product Features and Specifications */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Key Features
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {product.features.map((feature, index) => (
                      <Typography
                        key={index}
                        component="li"
                        variant="body1"
                        sx={{ mb: 1 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Specifications
                  </Typography>
                  <Box>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', py: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2, minWidth: 150 }}>
                          {key}:
                        </Typography>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;