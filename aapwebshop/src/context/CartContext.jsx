import { createContext, useContext, useReducer, useMemo, useCallback, useState } from 'react';

const CartContext = createContext(null);

function getInitialCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function cartReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        newState = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      break;
    }
    case 'REMOVE_ITEM':
      newState = state.filter((item) => item.id !== action.payload);
      break;
    case 'INCREMENT':
      newState = state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;
    case 'DECREMENT':
      newState = state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      break;
    case 'CLEAR_CART':
      newState = [];
      break;
    default:
      return state;
  }

  localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, getInitialCart);
  const [toast, setToast] = useState(null);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setToast('Product added to cart!');
    setTimeout(() => setToast(null), 2000);
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const increment = useCallback((productId) => {
    dispatch({ type: 'INCREMENT', payload: productId });
  }, []);

  const decrement = useCallback((productId) => {
    dispatch({ type: 'DECREMENT', payload: productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        toast,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
