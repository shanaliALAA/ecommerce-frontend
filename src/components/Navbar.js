import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, getCartCount } = useCart();
  const cartCount = getCartCount();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.svg" alt="Trendify Logo" style={{ height: '32px', width: '32px' }} />
            Trendify
          </Link>
          <button
            className="navbar-toggle"
            aria-label="Toggle navigation"
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <ul id="primary-navigation" className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={closeMenu}>Products</Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeMenu}>
                Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span>Hello, {user.name}</span>
                </li>
                <li>
                  <button onClick={() => { handleLogout(); closeMenu(); }} className="btn btn-danger" style={{ padding: '5px 15px' }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={closeMenu}>Login</Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeMenu}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;