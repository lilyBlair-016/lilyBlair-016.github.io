import { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  PAYMENT_METHODS,
  DELIVERY_OPTIONS,
  TAX_RATE,
} from '../data/products';
import '../css/payment-delivery.css';

export default function PaymentDeliveryPage() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  const deliveryFee = useMemo(() => {
    const option = DELIVERY_OPTIONS.find((o) => o.id === deliveryMethod);
    return option ? option.fee : 50;
  }, [deliveryMethod]);

  const total = useMemo(
    () => subtotal + tax + deliveryFee,
    [subtotal, tax, deliveryFee]
  );

  const handlePlaceOrder = useCallback(() => {
    if (cart.length === 0) {
      alert('Your cart is empty! Please add items to your cart first.');
      navigate('/products');
      return;
    }

    if (!paymentMethod || !deliveryMethod) {
      alert('Please select both payment and delivery methods.');
      return;
    }

    const now = new Date();
    const orderData = {
      cart: JSON.parse(JSON.stringify(cart)),
      subtotal,
      tax,
      deliveryFee,
      total,
      paymentMethod,
      deliveryMethod,
      orderDate: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      orderTime: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderNumber:
        'BA-' +
        now.getFullYear() +
        '-' +
        String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    navigate('/transaction');
  }, [cart, subtotal, tax, deliveryFee, total, paymentMethod, deliveryMethod, navigate]);

  return (
    <section>
      <div className="checkout-container">
        <h2 className="page-title">Payment &amp; Delivery</h2>

        <div className="section">
          <h3 className="section-title">Payment Method</h3>
          <div className="option-group">
            {PAYMENT_METHODS.map((method) => (
              <label key={method.id} className="option-card">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-icon">{method.icon}</span>
                  <div className="option-details">
                    <div className="option-name">{method.name}</div>
                    <div className="option-description">{method.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Delivery Option</h3>
          <div className="option-group">
            {DELIVERY_OPTIONS.map((option) => (
              <label key={option.id} className="option-card">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={deliveryMethod === option.id}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-icon">{option.icon}</span>
                  <div className="option-details">
                    <div className="option-name">{option.name}</div>
                    <div className="option-description">
                      {option.description} &bull;{' '}
                      {option.fee === 0
                        ? 'FREE'
                        : `₱${option.fee.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="order-summary-box">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (12%)</span>
            <span>₱{tax.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₱{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="button-group">
          <Link to="/cart" className="btn btn-secondary">
            Back to Cart
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePlaceOrder}
            aria-label="Place order"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}
