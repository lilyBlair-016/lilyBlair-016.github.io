import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/auth.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match! Please try again.');
        return;
      }

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        password: formData.password,
      };

      signup(userData);
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    [formData, signup, navigate]
  );

  return (
    <div className="split-container">
      <div className="login-left">
        <div className="login-form-wrapper signup-wider">
          <h1 className="login-title">Create Your Account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-grid-two-cols">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  aria-label="First name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  aria-label="Last name"
                />
              </div>
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
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="(123) 456-7890"
                value={formData.mobile}
                onChange={handleChange}
                required
                aria-label="Mobile number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Home Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
                aria-label="Home address"
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
                minLength={6}
                aria-label="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                aria-label="Confirm password"
              />
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the terms &amp; conditions
                </label>
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {showSuccess && (
            <div className="auth-success-message" role="alert">
              Account created successfully! Redirecting to login...
            </div>
          )}

          <div className="divider">
            <span>Or</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <img src={`${import.meta.env.BASE_URL}images/Google_Button.png`} alt="Google" />
              Sign up with Google
            </button>
          </div>

          <div className="auth-link-bottom">
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src={`${import.meta.env.BASE_URL}images/BarkAvenue_Logo.png`} alt="Bark Avenue" />
      </div>
    </div>
  );
}
