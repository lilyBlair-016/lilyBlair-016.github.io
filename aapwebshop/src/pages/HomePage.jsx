import { featuredProducts } from '../data/products';
import '../css/home.css';

export default function HomePage() {
  return (
    <section>
      <h2 className="page-title">Welcome to Bark Avenue!</h2>
      <p className="page-subtitle">
        Your one-stop shop for all your pet&apos;s needs
      </p>

      <h3 className="section-title">Featured Products</h3>
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <article key={product.id} className="featured-card">
            <div className="product-icon">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-price">
              Php {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
