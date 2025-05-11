import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Rating, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';

import { useCart } from '../../contexts/CartContext';
import './Products.css';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      selectedSize,
      quantity
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="product-card" elevation={3}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.alt || product.name}
          className="product-image"
          loading="lazy"
          sx={{
            objectFit: 'cover',
            width: '100%',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            bgcolor: 'grey.100',
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Loading image...
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip
              label={product.category}
              color="primary"
              variant="outlined"
              size="small"
            />
            {product.status === 'available' && (
              <Chip
                label="In Stock"
                color="success"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" className="product-description">
            {product.description}
          </Typography>
          <Box sx={{ mt: 2, mb: 1 }}>
            <Rating value={product.rating} readOnly precision={0.5} />
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
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

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
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

          <Typography variant="h6" color="primary" gutterBottom>
            ₹{product.price.toFixed(2)}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;