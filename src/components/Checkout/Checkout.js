import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Checkout.css';
import { color } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    apartment: '',
    city: '',
    district: '',
    landmark: '',
    deliveryInstructions: '',
    cashOnDeliveryConsent: false
  });
  const [errors, setErrors] = useState({});

  const subtotal = calculateTotal();
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.cashOnDeliveryConsent) {
      newErrors.cashOnDeliveryConsent = 'Please agree to pay in cash upon delivery';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate order confirmation number
      const orderNumber = 'ECO' + Date.now().toString().slice(-8);
      
      // Clear cart and navigate to success page
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderNumber,
          orderDetails: {
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            deliveryInfo: formData,
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }
        }
      });
    } catch (error) {
      console.error('Error processing order:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'There was an error processing your order. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="form-section delivery-info">
            <h3>Delivery Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="streetAddress">Street Address *</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={errors.streetAddress ? 'error' : ''}
              />
              {errors.streetAddress && <span className="error-message">{errors.streetAddress}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="apartment">Apartment/Unit/Floor (Optional)</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City/Town *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="district">District/State *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={errors.district ? 'error' : ''}
                />
                {errors.district && <span className="error-message">{errors.district}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="landmark">Landmark (Optional)</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliveryInstructions">Additional Delivery Instructions (Optional)</label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
          </section>

          <section className="form-section payment-method">
            <h3>Payment Method</h3>
            <div className="payment-info">
              <div className="cash-on-delivery-notice">
                <i className="fas fa-money-bill-wave"></i>
                <h4>Cash on Delivery Only</h4>
                <p>We currently accept only cash payment upon delivery</p>
              </div>
              
              <div className="payment-benefits">
                <p><i className="fas fa-check"></i> No online payment processing fees</p>
                <p><i className="fas fa-check"></i> Pay only when you receive your products</p>
                <p><i className="fas fa-check"></i> Safe and convenient</p>
              </div>

              <div className="form-group consent-checkbox">
                <input
                  type="checkbox"
                  id="cashOnDeliveryConsent"
                  name="cashOnDeliveryConsent"
                  checked={formData.cashOnDeliveryConsent}
                  onChange={handleInputChange}
                />
                <label htmlFor="cashOnDeliveryConsent" style={{ color: '#4CAF50' }}>
                  I agree to pay the full amount in cash when products are delivered
                </label>
                {errors.cashOnDeliveryConsent && (
                  <span className="error-message">{errors.cashOnDeliveryConsent}</span>
                )}
              </div>

              <p className="exact-change-note">
                <i className="fas fa-info-circle"></i>
                Having exact change ready is appreciated
              </p>
            </div>
          </section>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button
            type="submit"
            className={`place-order-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
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
          </div>

          <div className="delivery-info">
            <h4>Estimated Delivery</h4>
            <p>3-5 business days</p>
            <p className="eco-packaging-note">
              <i className="fas fa-leaf"></i>
              Your products will be delivered in eco-friendly packaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;