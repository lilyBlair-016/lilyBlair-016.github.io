import { NavLink } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const NAV_ITEMS = [
  { to: '/', icon: `${base}images/home-nav.png`, label: 'Home' },
  { to: '/about', icon: `${base}images/about-nav.png`, label: 'About Us' },
  { to: '/contact', icon: `${base}images/contact-nav.png`, label: 'Contact Us' },
  { to: '/profile', icon: `${base}images/profile-nav.png`, label: 'Profile' },
  { to: '/products', icon: `${base}images/product-catalog-nav.png`, label: 'Products' },
  { to: '/cart', icon: `${base}images/shopping-cart-nav.png`, label: 'Cart' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Main navigation">
        <ul>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <img src={icon} alt="" className="icon" />
                <span className="label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
