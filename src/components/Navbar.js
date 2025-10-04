import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar" style={{ background: '#111', color: '#fff', padding: '0.5rem 1rem', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Trendify Logo" style={{ height: '32px', width: '32px' }} />
          Trendify
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`navbar-links ${isOpen ? 'open' : ''}`}
          style={{
            display: 'flex',
            gap: '1rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          </li>
          <li>
            <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
          </li>
          <li>
            <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', position: 'relative' }}>
              Cart
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-12px',
                  background: 'red',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.8rem',
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <span>Hello, {user.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                  style={{ padding: '5px 15px', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile CSS via inline styles */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn {
            display: block;
          }
          .navbar-links {
            display: ${isOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 0;
            background: #111;
            width: 200px;
            padding: 1rem;
            border-radius: 8px;
          }
          .navbar-links li {
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
