/* Contact */
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();

const name = document.getElementById('name').value;
const message = document.getElementById('message').value;

successMessage.style.display = 'block';
contactForm.reset();

setTimeout(() => {
successMessage.style.display = 'none';
}, 5000);

console.log('Form submitted:', { name, message });
});
}


/* SIGN-UP */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const signupSuccess = document.getElementById('successMessage');

    if (password !== confirmPassword) {
      alert('Passwords do not match! Please try again.');
      return;
    }

    const formData = {
      firstName: document.getElementById('firstName')?.value,
      lastName: document.getElementById('lastName')?.value,
      email: document.getElementById('email')?.value,
      mobile: document.getElementById('mobile')?.value,
      address: document.getElementById('address')?.value,
      password: password  
    };

    localStorage.setItem('userData', JSON.stringify(formData));

    if (signupSuccess) signupSuccess.style.display = 'block';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
}

/* LOGIN */
const loginForm = document.getElementById('loginForm');

async function authenticateUser(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, email }), 1000);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const loginSuccess = document.getElementById('successMessage');

    try {
      const result = await authenticateUser(email, password);

      if (result?.success) {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('isLoggedIn', 'true');

        if (loginSuccess) loginSuccess.style.display = 'block';

        setTimeout(() => {
          window.location.href = 'index.html'; 
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  });
}

/* Profile */
document.addEventListener("DOMContentLoaded", () => {
  const notLoggedIn = document.getElementById("notLoggedIn");
  const profileInfo = document.getElementById("profileInfo");

  if (!notLoggedIn || !profileInfo) return;

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    notLoggedIn.style.display = "block";
    profileInfo.style.display = "none";
    return;
  }

  notLoggedIn.style.display = "none";
  profileInfo.style.display = "block";

  const saved = localStorage.getItem("userData");
  if (!saved) {
    console.warn("Logged in but no userData found in localStorage.");
    return;
  }

  const user = JSON.parse(saved);

  document.getElementById("displayFirstName").textContent = user.firstName || "—";
  document.getElementById("displayLastName").textContent = user.lastName || "—";
  document.getElementById("displayEmail").textContent = user.email || "—";
  document.getElementById("displayMobile").textContent = user.mobile || "—";
  document.getElementById("displayAddress").textContent = user.address || "—";

  const pw = user.password || "";
  document.getElementById("displayPassword").textContent =
    pw ? "•".repeat(Math.min(pw.length, 12)) : "—";

  const profileName = document.getElementById("profileName");
  if (profileName) {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    profileName.textContent = fullName || "Guest User";
  }
});

/* Shopping Cart Functions */
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, productName, productPrice, productDescription) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      quantity: 1
    });
  }
  
  saveCart(cart);
  showCartNotification();
}

function showCartNotification() {
  // Simple notification - you can enhance this with a toast message
  const notification = document.createElement('div');
  notification.textContent = 'Product added to cart!';
  notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #20b2aa; color: white; padding: 15px 20px; border-radius: 5px; z-index: 1000;';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

/* Product Catalog - Add to Cart */
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons in product catalog
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productId = productCard.getAttribute('data-product-id');
      const productName = productCard.getAttribute('data-product-name');
      const productPrice = productCard.getAttribute('data-product-price');
      const productDescription = productCard.getAttribute('data-product-description');
      
      addToCart(productId, productName, productPrice, productDescription);
    });
  });

  // Shopping Cart Page
  if (document.getElementById('cart-items')) {
    renderCart();
  }

  // Payment & Delivery Page
  if (document.querySelector('.checkout-container')) {
    loadOrderSummary();
  }

  // Transaction Receipt Page
  if (document.querySelector('.receipt-container')) {
    loadReceipt();
  }
});

/* Render Shopping Cart */
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cart = getCart();
  
  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';
    return;
  }
  
  if (emptyCartMessage) emptyCartMessage.style.display = 'none';
  
  let cartHTML = '';
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    cartHTML += `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="item-image"></div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-description">${item.description}</div>
        </div>
        <div class="item-price">
          <div>Php ${item.price.toFixed(2)}</div>
          <div style="font-size: 14px; color: #666;">× ${item.quantity} = Php ${itemTotal.toFixed(2)}</div>
        </div>
        <div class="quantity-controls">
          <button class="decrease-btn" type="button">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" type="button">+</button>
        </div>
        <button class="remove-btn" type="button">Remove</button>
      </div>
    `;
  });
  
  cartHTML += `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span id="subtotal">Php 0.00</span>
      </div>
      <div class="summary-row">
        <span>Shipping:</span>
        <span id="shipping">Php 50.00</span>
      </div>
      <div class="summary-row">
        <span>Tax (12%):</span>
        <span id="tax">Php 0.00</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span id="total">Php 0.00</span>
      </div>
      <button class="checkout-btn" type="button">Proceed to Checkout</button>
    </div>
  `;
  
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cartHTML;
    updateCartTotals();
    attachCartEventListeners();
  }
}

function attachCartEventListeners() {
  // Increase quantity
  document.querySelectorAll('.increase-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const cartItem = this.closest('.cart-item');
      if (!cartItem) return;
      
      const productId = cartItem.getAttribute('data-product-id');
      const cart = getCart();
      const item = cart.find(i => i.id === productId);
      
      if (item) {
        item.quantity += 1;
        saveCart(cart);
        renderCart();
      }
    });
  });
  
  // Decrease quantity
  document.querySelectorAll('.decrease-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const cartItem = this.closest('.cart-item');
      if (!cartItem) return;
      
      const productId = cartItem.getAttribute('data-product-id');
      const cart = getCart();
      const item = cart.find(i => i.id === productId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          saveCart(cart);
          renderCart();
        } else {
          // If quantity is 1, ask user if they want to remove
          if (confirm('Remove this item from cart?')) {
            const filteredCart = cart.filter(i => i.id !== productId);
            saveCart(filteredCart);
            renderCart();
          }
        }
      }
    });
  });
  
  // Remove item
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const cartItem = this.closest('.cart-item');
      if (!cartItem) return;
      
      const productId = cartItem.getAttribute('data-product-id');
      const cart = getCart();
      const filteredCart = cart.filter(i => i.id !== productId);
      saveCart(filteredCart);
      renderCart();
    });
  });
  
  // Checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const cart = getCart();
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      window.location.href = 'payment-delivery.html';
    });
  }
}

function updateCartTotals() {
  const cart = getCart();
  const shippingAmount = 50;
  const taxRate = 0.12;
  
  // Calculate subtotal: sum of (price * quantity) for each item
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  // Calculate tax: 12% of subtotal
  const tax = subtotal * taxRate;
  
  // Calculate total: subtotal + shipping + tax
  const total = subtotal + shippingAmount + tax;
  
  // Update display elements
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  
  if (subtotalEl) subtotalEl.textContent = `Php ${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `Php ${shippingAmount.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `Php ${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `Php ${total.toFixed(2)}`;
}

/* Payment & Delivery Page */
function loadOrderSummary() {
  const cart = getCart();
  const taxRate = 0.12;
  
  // Calculate subtotal from cart
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  // Calculate tax
  const tax = subtotal * taxRate;
  
  // Default delivery fee
  let deliveryFee = 50; // Standard delivery
  
  // Update order summary display
  const orderSummaryBox = document.querySelector('.order-summary-box');
  if (orderSummaryBox) {
    const summaryRows = orderSummaryBox.querySelectorAll('.summary-row');
    if (summaryRows.length >= 2) {
      // Update subtotal (first row)
      summaryRows[0].querySelector('span:last-child').textContent = `₱${subtotal.toFixed(2)}`;
      
      // Update delivery fee
      const deliveryFeeEl = document.getElementById('delivery-fee');
      if (deliveryFeeEl) {
        deliveryFeeEl.textContent = `₱${deliveryFee.toFixed(2)}`;
      }
      
      // Update total
      const totalEl = document.getElementById('total-amount');
      if (totalEl) {
        const total = subtotal + tax + deliveryFee;
        totalEl.textContent = `₱${total.toFixed(2)}`;
      }
    }
  }
  
  // Listen for delivery option changes
  const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const deliveryFees = {
        'standard': 50,
        'express': 150,
        'same-day': 250,
        'pickup': 0
      };
      deliveryFee = deliveryFees[this.value] || 50;
      
      // Update delivery fee display
      const deliveryFeeEl = document.getElementById('delivery-fee');
      if (deliveryFeeEl) {
        deliveryFeeEl.textContent = `₱${deliveryFee.toFixed(2)}`;
      }
      
      // Update total
      const totalEl = document.getElementById('total-amount');
      if (totalEl) {
        const total = subtotal + tax + deliveryFee;
        totalEl.textContent = `₱${total.toFixed(2)}`;
      }
    });
  });
  
  // Place Order button handler
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if cart is empty
      if (cart.length === 0) {
        alert('Your cart is empty! Please add items to your cart first.');
        window.location.href = 'product-catalog.html';
        return;
      }
      
      // Get selected payment and delivery methods
      const paymentRadio = document.querySelector('input[name="payment"]:checked');
      const deliveryRadio = document.querySelector('input[name="delivery"]:checked');
      
      if (!paymentRadio || !deliveryRadio) {
        alert('Please select both payment and delivery methods.');
        return;
      }
      
      const paymentMethod = paymentRadio.value;
      const deliveryMethod = deliveryRadio.value;
      
      // Get current delivery fee based on selection
      const deliveryFees = {
        'standard': 50,
        'express': 150,
        'same-day': 250,
        'pickup': 0
      };
      deliveryFee = deliveryFees[deliveryMethod] || 50;
      
      // Calculate final totals
      const finalSubtotal = subtotal;
      const finalTax = tax;
      const finalTotal = finalSubtotal + finalTax + deliveryFee;
      
      // Create order data
      const orderData = {
        cart: JSON.parse(JSON.stringify(cart)), // Deep copy
        subtotal: finalSubtotal,
        tax: finalTax,
        deliveryFee: deliveryFee,
        total: finalTotal,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        orderDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        orderTime: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        orderNumber: 'BA-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
      };
      
      // Save order to localStorage
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      
      // Redirect to transaction receipt page
      window.location.href = 'transaction.html';
    });
  }
}

/* Transaction Receipt Page */
function loadReceipt() {
  const orderDataStr = localStorage.getItem('currentOrder');
  
  if (!orderDataStr) {
    alert('No order found. Redirecting to cart...');
    window.location.href = 'shopping-cart.html';
    return;
  }
  
  const orderData = JSON.parse(orderDataStr);
  
  // Update order number
  const orderNumberEl = document.querySelector('.order-info .info-row:first-child .info-value');
  if (orderNumberEl) {
    orderNumberEl.textContent = '#' + orderData.orderNumber;
  }
  
  // Update date
  const dateEl = document.querySelectorAll('.order-info .info-value')[1];
  if (dateEl) {
    dateEl.textContent = orderData.orderDate;
  }
  
  // Update payment method
  const paymentEl = document.querySelectorAll('.order-info .info-value')[2];
  if (paymentEl) {
    const paymentMethods = {
      'credit-card': 'Credit Card (****1234)',
      'gcash': 'GCash',
      'paymaya': 'PayMaya',
      'cod': 'Cash on Delivery'
    };
    paymentEl.textContent = paymentMethods[orderData.paymentMethod] || 'Credit Card';
  }
  
  // Update order items
  const orderItemsEl = document.querySelector('.order-items');
  if (orderItemsEl && orderData.cart) {
    let itemsHTML = '';
    orderData.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      itemsHTML += `
        <div class="item-row">
          <div class="item-details">
            <div class="item-name">${item.name.toUpperCase()}</div>
            <div class="item-description">${item.description.toUpperCase()}</div>
          </div>
          <div class="item-qty">QTY ${item.quantity}</div>
          <div class="item-price">₱${itemTotal.toFixed(2)}</div>
        </div>
      `;
    });
    orderItemsEl.innerHTML = itemsHTML;
  }
  
  // Update order summary
  const summaryRows = document.querySelectorAll('.order-summary .summary-row');
  if (summaryRows.length >= 4) {
    // Subtotal
    summaryRows[0].querySelector('span:last-child').textContent = `₱${orderData.subtotal.toFixed(2)}`;
    
    // Shipping/Delivery Fee
    const deliveryLabels = {
      'standard': 'Shipping (Standard)',
      'express': 'Shipping (Express)',
      'same-day': 'Shipping (Same-Day)',
      'pickup': 'Shipping (Pickup)'
    };
    summaryRows[1].querySelector('span:first-child').textContent = deliveryLabels[orderData.deliveryMethod] || 'Shipping';
    summaryRows[1].querySelector('span:last-child').textContent = `₱${orderData.deliveryFee.toFixed(2)}`;
    
    // Tax
    summaryRows[2].querySelector('span:last-child').textContent = `₱${orderData.tax.toFixed(2)}`;
    
    // Total
    summaryRows[3].querySelector('span:last-child').textContent = `₱${orderData.total.toFixed(2)}`;
  }
  
  // Clear cart after showing receipt
  localStorage.removeItem('cart');
}