import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PAYMENT_METHOD_LABELS, DELIVERY_LABELS } from '../data/products';
import '../css/transaction.css';

function getInitialOrder() {
  const orderStr = localStorage.getItem('currentOrder');
  return orderStr ? JSON.parse(orderStr) : null;
}

export default function TransactionPage() {
  const orderData = getInitialOrder();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!orderData) {
      alert('No order found. Redirecting to cart...');
      navigate('/cart');
      return;
    }

    if (!clearedRef.current) {
      clearedRef.current = true;
      clearCart();
    }
  }, [clearCart, navigate, orderData]);

  if (!orderData) {
    return null;
  }

  return (
    <section>
      <div className="receipt-container">
        <div className="receipt-header">
          <div className="receipt-logo">
            <img src={`${import.meta.env.BASE_URL}images/Header_Logo.png`} alt="Bark Avenue" />
          </div>
          <div className="receipt-title">BARK AVENUE</div>
          <div className="receipt-subtitle">ONLINE ORDER RECEIPT</div>
        </div>

        <div className="receipt-divider" />

        <div className="order-info">
          <div className="info-row">
            <span className="info-label">Order Number</span>
            <span className="info-value">#{orderData.orderNumber}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Date</span>
            <span className="info-value">{orderData.orderDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Payment</span>
            <span className="info-value">
              {PAYMENT_METHOD_LABELS[orderData.paymentMethod] || 'Credit Card'}
            </span>
          </div>
        </div>

        <div className="receipt-divider" />

        <div className="order-items">
          {orderData.cart.map((item) => {
            const itemTotal = item.price * item.quantity;
            return (
              <div key={item.id} className="item-row">
                <div className="receipt-item-details">
                  <div className="receipt-item-name">
                    {item.name.toUpperCase()}
                  </div>
                  <div className="receipt-item-description">
                    {item.description.toUpperCase()}
                  </div>
                </div>
                <div className="item-qty">QTY {item.quantity}</div>
                <div className="receipt-item-price">
                  ₱{itemTotal.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="receipt-divider" />

        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₱{orderData.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>
              {DELIVERY_LABELS[orderData.deliveryMethod] || 'Shipping'}
            </span>
            <span>₱{orderData.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (12%)</span>
            <span>₱{orderData.tax.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Total</span>
            <span>₱{orderData.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="receipt-actions">
          <button type="button" className="action-btn" aria-label="Save receipt">
            SAVE
          </button>
          <button type="button" className="action-btn" aria-label="Share receipt">
            SHARE
          </button>
        </div>

        <div className="receipt-footer">
          <p>Thank you for shopping at Bark Avenue!</p>
          <p className="footer-small">
            For inquiries, contact us at info@barkavenue.com
          </p>
        </div>
      </div>

      <div className="continue-shopping">
        <Link to="/products" className="continue-btn">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
