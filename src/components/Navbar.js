import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, getCartCount } = useCart();
  const cartCount = getCartCount();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.svg" alt="Trendify Logo" style={{ height: '32px', width: '32px' }} />
            Trendify
          </Link>
          <button
            aria-label="Toggle menu"
            className="navbar-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">
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
                  <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '5px 15px' }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
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