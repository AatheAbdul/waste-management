import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [rating, setRating] = useState(null);

  // Redirect to home if no order details
  if (!location.state?.orderDetails) {
    return <Navigate to="/" />;
  }

  const { orderNumber, orderDetails } = location.state;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement email confirmation sending
    setEmailSubmitted(true);
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    // TODO: Implement survey submission
    setSurveySubmitted(true);
  };

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-header">
        <i className="fas fa-check-circle"></i>
        <h2>Order Confirmed!</h2>
        <p className="order-number">Order #{orderNumber}</p>
      </div>

      <div className="confirmation-content">
        <div className="order-details">
          <h3>Order Summary</h3>
          <div className="order-items">
            {orderDetails.items.map(item => (
              <div key={item.id} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{orderDetails.subtotal}</span>
            </div>
            <div className="total-row">
              <span>Delivery Fee</span>
              <span>₹{orderDetails.deliveryFee}</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span>₹{orderDetails.total}</span>
            </div>
          </div>

          <div className="delivery-details">
            <h3>Delivery Information</h3>
            <p><strong>Name:</strong> {orderDetails.deliveryInfo.fullName}</p>
            <p><strong>Phone:</strong> {orderDetails.deliveryInfo.phone}</p>
            <p>
              <strong>Address:</strong><br />
              {orderDetails.deliveryInfo.streetAddress}
              {orderDetails.deliveryInfo.apartment && `, ${orderDetails.deliveryInfo.apartment}`}<br />
              {orderDetails.deliveryInfo.city}, {orderDetails.deliveryInfo.district}
              {orderDetails.deliveryInfo.landmark && <><br />Landmark: {orderDetails.deliveryInfo.landmark}</>}
            </p>
            {orderDetails.deliveryInfo.deliveryInstructions && (
              <p>
                <strong>Delivery Instructions:</strong><br />
                {orderDetails.deliveryInfo.deliveryInstructions}
              </p>
            )}
            <p className="estimated-delivery">
              <i className="fas fa-truck"></i>
              Estimated Delivery: {orderDetails.estimatedDelivery}
            </p>
          </div>

          <div className="payment-reminder">
            <h3>Payment Information</h3>
            <p>
              <i className="fas fa-money-bill-wave"></i>
              Please keep ₹{orderDetails.total} ready for cash payment upon delivery
            </p>
          </div>
        </div>

        <div className="additional-actions">
          {!emailSubmitted ? (
            <div className="email-confirmation">
              <h3>Get Email Confirmation</h3>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit">Send Confirmation</button>
              </form>
            </div>
          ) : (
            <div className="confirmation-sent">
              <i className="fas fa-envelope"></i>
              <p>Order confirmation has been sent to your email</p>
            </div>
          )}

          <div className="track-order">
            <Link to="/track-order" className="track-button">
              <i className="fas fa-map-marker-alt"></i>
              Track My Order
            </Link>
          </div>

          {!surveySubmitted ? (
            <div className="satisfaction-survey">
              <h3>Quick Feedback</h3>
              <p>How was your shopping experience?</p>
              <form onSubmit={handleSurveySubmit}>
                <div className="rating-buttons">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`rating-button ${rating === value ? 'selected' : ''}`}
                      onClick={() => setRating(value)}
                    >
                      {value === 1 ? '😊' : value === 2 ? '😐' : '☹️'}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="submit-survey"
                  disabled={!rating}
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          ) : (
            <div className="survey-thanks">
              <i className="fas fa-heart"></i>
              <p>Thank you for your feedback!</p>
            </div>
          )}

          <Link to="/products" className="continue-shopping">
            <i className="fas fa-shopping-bag"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;