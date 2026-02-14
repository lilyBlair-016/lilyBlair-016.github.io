import { useState, useMemo, useCallback } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import '../css/product-catalog.css';

export default function ProductCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortOption]);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
    },
    [addToCart]
  );

  return (
    <section>
      <div className="catalog-header">
        <h2>Product Catalog</h2>
        <div className="catalog-controls">
          <input
            type="text"
            className="search-box"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="toys">Toys</option>
            <option value="accessories">Accessories</option>
            <option value="apparel">Apparel</option>
          </select>
        </div>
      </div>

      <div className="products-info">
        <span className="product-count">
          {filteredProducts.length} products
        </span>
        <div className="sort-by">
          <span>Sort by:</span>
          <select
            className="filter-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
