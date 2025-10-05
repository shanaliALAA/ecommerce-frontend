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
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }

        .navbar .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          position: relative;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea !important;
          text-decoration: none;
          transition: color 0.3s ease;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar-brand:hover {
          color: #764ba2 !important;
        }

        .navbar-brand img {
          height: 32px;
          width: 32px;
        }

        .navbar-toggle {
          display: none;
          flex-direction: column;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
          gap: 5px;
        }

        .navbar-toggle span {
          display: block;
          width: 26px;
          height: 3px;
          background: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .navbar-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .navbar-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .navbar-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .navbar-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          gap: 2.5rem;
        }

        .navbar-links li {
          position: relative;
        }

        .navbar-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
          display: inline-block;
        }

        .navbar-links a:hover {
          color: #667eea;
        }

        .navbar-links span {
          color: #333;
          font-weight: 500;
          font-size: 1rem;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -12px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          padding: 3px 7px;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 20px;
          text-align: center;
          line-height: 1;
        }

        .btn {
          padding: 8px 20px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .btn-danger {
          background: #667eea;
          color: white;
        }

        .btn-danger:hover {
          background: #764ba2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-danger:active {
          transform: translateY(0);
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar-content {
            height: 60px;
          }

          .navbar-brand {
            font-size: 1.3rem;
          }

          .navbar-toggle {
            display: flex;
          }

          .navbar-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 75%;
            max-width: 300px;
            flex-direction: column;
            background: white;
            padding: 80px 2rem 2rem;
            gap: 0;
            align-items: flex-start;
            transition: right 0.3s ease-in-out;
            box-shadow: -5px 0 25px rgba(0,0,0,0.1);
            overflow-y: auto;
          }

          .navbar-links.open {
            right: 0;
          }

          .navbar-links li {
            width: 100%;
            border-bottom: 1px solid #f0f0f0;
            padding: 1rem 0;
          }

          .navbar-links li:last-child {
            border-bottom: none;
          }

          .navbar-links a,
          .navbar-links span {
            display: block;
            width: 100%;
            font-size: 1.1rem;
            padding: 0.5rem 0;
            color: #333;
          }

          .cart-badge {
            top: 8px;
            right: auto;
            left: 35px;
          }

          .btn-danger {
            width: 100%;
            padding: 12px 20px;
            margin-top: 0.5rem;
          }

          /* Overlay */
          .navbar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .navbar-overlay.active {
            opacity: 1;
            visibility: visible;
          }
        }

        @media (max-width: 480px) {
          .navbar .container {
            padding: 0 1rem;
          }

          .navbar-brand {
            font-size: 1.2rem;
          }

          .navbar-brand img {
            height: 28px !important;
            width: 28px !important;
          }

          .navbar-links {
            width: 80%;
          }
        }

        /* Prevent body scroll when menu is open */
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
      
      {menuOpen && (
        <div 
          className={`navbar-overlay ${menuOpen ? 'active' : ''}`}
          onClick={() => {
            setMenuOpen(false);
            document.body.classList.remove('menu-open');
          }}
        />
      )}

      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <img src="/logo.svg" alt="Trendify Logo" />
              Trendify
            </Link>
            
            <button
              aria-label="Toggle menu"
              className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
              onClick={() => {
                setMenuOpen((prev) => !prev);
                document.body.classList.toggle('menu-open');
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <ul 
              className={`navbar-links ${menuOpen ? 'open' : ''}`}
            >
              <li>
                <Link to="/" onClick={() => {
                  setMenuOpen(false);
                  document.body.classList.remove('menu-open');
                }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={() => {
                  setMenuOpen(false);
                  document.body.classList.remove('menu-open');
                }}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ position: 'relative' }} onClick={() => {
                  setMenuOpen(false);
                  document.body.classList.remove('menu-open');
                }}>
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
                    <button onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                      document.body.classList.remove('menu-open');
                    }} className="btn btn-danger">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove('menu-open');
                    }}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove('menu-open');
                    }}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;