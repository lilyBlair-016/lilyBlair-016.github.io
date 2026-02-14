import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toast from './Toast';
import { useCart } from '../context/CartContext';
import '../css/layout.css';

export default function Layout({ children }) {
  const { toast } = useCart();

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
      <Toast message={toast} />
    </>
  );
}
