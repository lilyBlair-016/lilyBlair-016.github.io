import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProductCatalogPage = lazy(() => import('./pages/ProductCatalogPage'));
const ShoppingCartPage = lazy(() => import('./pages/ShoppingCartPage'));
const PaymentDeliveryPage = lazy(() => import('./pages/PaymentDeliveryPage'));
const TransactionPage = lazy(() => import('./pages/TransactionPage'));

function LoadingFallback() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Auth pages - no Layout */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Main pages - with Layout */}
              <Route
                path="/*"
                element={
                  <Layout>
                    <ErrorBoundary>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/products" element={<ProductCatalogPage />} />
                        <Route path="/cart" element={<ShoppingCartPage />} />
                        <Route path="/payment" element={<PaymentDeliveryPage />} />
                        <Route path="/transaction" element={<TransactionPage />} />
                      </Routes>
                    </ErrorBoundary>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}
