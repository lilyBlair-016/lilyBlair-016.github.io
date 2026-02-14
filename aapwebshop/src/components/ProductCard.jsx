import { memo, useState } from 'react';
import '../css/product-card.css';

const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  const [favorited, setFavorited] = useState(false);

  const fullStars = product.rating;
  const emptyStars = 5 - fullStars;

  return (
    <article className="product-card">
      <button
        className="favorite-btn"
        onClick={() => setFavorited((f) => !f)}
        type="button"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorited ? '❤️' : '🤍'}
      </button>

      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-code">code: {product.id}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-description">{product.description}</div>

      <div className="product-rating">
        <span className="stars">
          {'★'.repeat(fullStars)}
          {'☆'.repeat(emptyStars)}
        </span>
        <span className="review-count">({product.reviewCount} reviews)</span>
      </div>

      <div className="product-colors">
        {product.colors.map((color) => (
          <span
            key={color}
            className="color-dot"
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>

      <div className="product-footer">
        <div className="product-price">
          {product.oldPrice && (
            <span className="old-price">₱{product.oldPrice.toLocaleString()}</span>
          )}
          ₱{product.price.toLocaleString()}
        </div>
        {onAddToCart && (
          <button
            className="add-to-cart-btn"
            onClick={() =>
              onAddToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
              })
            }
            type="button"
            aria-label={`Add ${product.name} to cart`}
          >
            +
          </button>
        )}
      </div>
    </article>
  );
});

export default ProductCard;
