import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import WasteListing from './components/WasteListing/WasteListing';
import About from './components/About/About';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import Partners from './components/Partners/Partners';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
              <Route path="/listings" element={<WasteListing />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
