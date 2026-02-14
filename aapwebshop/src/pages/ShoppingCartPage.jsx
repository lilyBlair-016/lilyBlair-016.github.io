import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TAX_RATE, DEFAULT_SHIPPING } from '../data/products';
import '../css/shopping-cart.css';

export default function ShoppingCartPage() {
  const { cart, increment, decrement, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(
    () => subtotal + DEFAULT_SHIPPING + tax,
    [subtotal, tax]
  );

  const handleDecrement = useCallback(
    (item) => {
      if (item.quantity === 1) {
        if (window.confirm('Remove this item from cart?')) {
          removeFromCart(item.id);
        }
      } else {
        decrement(item.id);
      }
    },
    [decrement, removeFromCart]
  );

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/payment');
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <section>
      <div className="cart-items">
        {cart.map((item) => {
          const lineTotal = item.price * item.quantity;
          return (
            <div key={item.id} className="cart-item">
              <div className="item-image">🐾</div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-description">{item.description}</div>
              </div>
              <div className="item-price">
                <div>Php {item.price.toFixed(2)}</div>
                <div className="price-detail">
                  &times; {item.quantity} = Php {lineTotal.toFixed(2)}
                </div>
              </div>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => increment(item.id)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>Php {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Php {DEFAULT_SHIPPING.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (12%):</span>
          <span>Php {tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>Php {total.toFixed(2)}</span>
        </div>
        <button
          type="button"
          className="checkout-btn"
          onClick={handleCheckout}
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}
