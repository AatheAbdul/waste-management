import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, calculateTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = calculateTotal();
  const deliveryFee = 25; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some eco-friendly products to get started!</p>
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-type">{item.type}</p>
                <div className="item-price">₹{item.price} per unit</div>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="quantity-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="item-subtotal">
                ₹{item.price * item.quantity}
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-btn"
                aria-label="Remove item"
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="proceed-checkout-btn"
          >
            Proceed to Checkout
          </button>
          
          <Link to="/products" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;