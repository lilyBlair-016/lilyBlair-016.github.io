import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const base = import.meta.env.BASE_URL;

export default function Header() {
  const { isLoggedIn, userData, logout } = useAuth();

  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <img src={`${base}images/Header_Logo.png`} alt="Bark Avenue Logo" />
          </div>
          <h1>Bark Avenue</h1>
        </div>
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header-profile" aria-label="View profile">
                <img
                  src={`${base}images/Owner_Pic.jpg`}
                  alt={userData?.firstName || 'Profile'}
                  className="header-avatar"
                />
              </Link>
              <button
                className="logout-btn"
                onClick={logout}
                type="button"
                aria-label="Log out"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="header-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
