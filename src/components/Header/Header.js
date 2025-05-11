import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from 'C:/Users/DELL/waste-management/src/assets/images/EcoCrush_Logo.png';
import UserMenu from './UserMenu';
import './Header.css';
import '../../styles/animations.css';

const Header = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content stagger-fade-in">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="hamburger"></span>
        </button>

        <Link to="/" className="logo-container">
          <div className="logo">
            <img src={logo} alt="EcoCrush - Sustainable Waste Management" className="logo-image" />
            <div className="brand-text">
              <h1>EcoCrush</h1>
              <p>Transforming Function Hall Waste into Valuable Resources</p>
            </div>
          </div>
        </Link>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/partners">Partners</NavLink></li>
            <li>
              <NavLink to="/products" className="products-link">
                Products
              </NavLink>
            </li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="header-actions">
          <form className="search-form" onSubmit={handleSearch} ref={searchRef}>
            <input
              type="search"
              placeholder="Search halls or composters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              🔍
            </button>
          </form>

          <IconButton
            color="primary"
            onClick={() => navigate('/cart')}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user ? (
            <UserMenu />
          ) : (
            <button className="login-btn" onClick={handleLogin}>Login/Register</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;