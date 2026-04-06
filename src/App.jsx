import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Search from './pages/Search';
import WhatsAppButton from './pages/WhatsAppBtn';

function AppLayout() {
  const location = useLocation();
  const hideFooter = ['/checkout', '/order-confirmation'].includes(location.pathname);
  const hideNav    = location.pathname === '/order-confirmation';

  return (
    <>
      {!hideNav && <Navbar />}
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/shop"               element={<Shop />} />
          <Route path="/collections"        element={<Collections />} />
          <Route path="/product/:id"        element={<ProductDetail />} />
          <Route path="/about"              element={<About />} />
          <Route path="/checkout"           element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/search"             element={<Search />} />
        </Routes>
        <WhatsAppButton/>
      </main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
