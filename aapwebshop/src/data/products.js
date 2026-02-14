export const products = [
  {
    id: 'DG1001',
    name: 'Premium Dog Food 25kg',
    description: 'Nutritious blend for healthy dogs',
    price: 999,
    oldPrice: 1299,
    rating: 5,
    reviewCount: 89,
    colors: ['#8B4513', '#D2691E'],
    category: 'food',
    image: '/images/premium-dog-food.jpg',
  },
  {
    id: 'CT2001',
    name: 'Cat Scratching Post',
    description: 'Durable sisal rope design',
    price: 799,
    oldPrice: null,
    rating: 4,
    reviewCount: 156,
    colors: ['#CD853F', '#A0522D', '#696969'],
    category: 'accessories',
    image: '/images/cat-scratching-post.jpg',
  },
  {
    id: 'TY3001',
    name: 'Interactive Ball Launcher',
    description: 'Automatic fetch machine',
    price: 2499,
    oldPrice: 2999,
    rating: 5,
    reviewCount: 234,
    colors: ['#FF6347', '#4169E1'],
    category: 'toys',
    image: '/images/ball-launcher.jpg',
  },
  {
    id: 'AP4001',
    name: 'Pupfer Jacket',
    description: 'Comfortable winter wear',
    price: 599,
    oldPrice: null,
    rating: 4,
    reviewCount: 78,
    colors: ['#FF1493', '#1E90FF', '#32CD32'],
    category: 'apparel',
    image: '/images/pupfer-jacket.jpg',
  },
  {
    id: 'FD5001',
    name: 'Gourmet Treats Pack',
    description: 'Assorted flavors for training',
    price: 299,
    oldPrice: 399,
    rating: 5,
    reviewCount: 312,
    colors: ['#FFD700', '#FF8C00'],
    category: 'food',
    image: '/images/gourmet-treats.jpg',
  },
  {
    id: 'CT6001',
    name: 'Cat Toy Set',
    description: 'Endless Playtime',
    price: 350,
    oldPrice: null,
    rating: 4,
    reviewCount: 145,
    colors: ['#FF69B4', '#00CED1'],
    category: 'toys',
    image: '/images/cat-toy-set.jpg',
  },
];

export const featuredProducts = [
  {
    id: 'featured-1',
    name: 'Premium Dog Food',
    price: 500,
    description: 'Nutritious and delicious meals for your furry friend',
    image: '/images/Dog_Food.png',
  },
  {
    id: 'featured-2',
    name: 'Cat Toys Bundle',
    price: 1280.50,
    description: 'Keep your kitty entertained for hours',
    image: '/images/Cat_Toys.png',
  },
  {
    id: 'featured-3',
    name: 'Cozy Pet Bed',
    price: 999,
    description: 'Comfortable sleeping space for pets of all sizes',
    image: '/images/Pet_Bed.jpg',
  },
];

export const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, American Express', icon: '💳' },
  { id: 'gcash', name: 'GCash', description: 'Pay using GCash wallet', icon: '📱' },
  { id: 'paymaya', name: 'PayMaya', description: 'Pay using PayMaya account', icon: '📲' },
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive order', icon: '💵' },
];

export const DELIVERY_OPTIONS = [
  { id: 'standard', name: 'Standard Delivery', description: '3-5 business days', fee: 50, icon: '📦' },
  { id: 'express', name: 'Express Delivery', description: '1-2 business days', fee: 150, icon: '🚚' },
  { id: 'same-day', name: 'Same-Day Delivery', description: 'Within Metro Manila only', fee: 250, icon: '⚡' },
  { id: 'pickup', name: 'Store Pickup', description: 'Pick up from store', fee: 0, icon: '🏪' },
];

export const PAYMENT_METHOD_LABELS = {
  'credit-card': 'Credit Card (****1234)',
  'gcash': 'GCash',
  'paymaya': 'PayMaya',
  'cod': 'Cash on Delivery',
};

export const DELIVERY_LABELS = {
  'standard': 'Shipping (Standard)',
  'express': 'Shipping (Express)',
  'same-day': 'Shipping (Same-Day)',
  'pickup': 'Shipping (Pickup)',
};

export const TAX_RATE = 0.12;
export const DEFAULT_SHIPPING = 50;
