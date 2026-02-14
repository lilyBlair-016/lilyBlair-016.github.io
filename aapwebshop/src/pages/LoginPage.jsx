import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/auth.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const result = await login(formData.email);

        if (result?.success) {
          setShowSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    },
    [formData.email, login, navigate]
  );

  return (
    <div className="split-container">
      <div className="login-left">
        <div className="login-form-wrapper">
          <h1 className="login-title">Get Started Now</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-label="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Password"
              />
            </div>

            <button type="submit" className="signup-btn">
              Login
            </button>
          </form>

          {showSuccess && (
            <div className="auth-success-message" role="alert">
              Login successful! Redirecting...
            </div>
          )}

          <div className="divider">
            <span>Or</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <img src={`${import.meta.env.BASE_URL}images/Google_Button.png`} alt="Google" />
              Sign in with Google
            </button>
          </div>

          <div className="auth-link-bottom">
            Don&apos;t have an account?{' '}
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src={`${import.meta.env.BASE_URL}images/BarkAvenue_Logo.png`} alt="Bark Avenue" />
      </div>
    </div>
  );
}
