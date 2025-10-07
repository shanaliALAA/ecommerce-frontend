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
          padding: 0 clamp(1rem, 3vw, 1.5rem);
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: clamp(60px, 10vw, 70px);
          position: relative;
        }

        .navbar-brand {
          font-size: clamp(1.2rem, 4vw, 1.5rem);
          font-weight: 700;
          color: #667eea !important;
          text-decoration: none;
          transition: color 0.3s ease;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: clamp(6px, 2vw, 8px);
        }

        .navbar-brand:hover {
          color: #764ba2 !important;
        }

        .navbar-brand img {
          height: clamp(28px, 6vw, 32px);
          width: clamp(28px, 6vw, 32px);
        }

        .navbar-toggle {
          display: none;
          flex-direction: column;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
          gap: clamp(4px, 1vw, 5px);
        }

        .navbar-toggle span {
          display: block;
          width: clamp(22px, 5vw, 26px);
          height: clamp(2.5px, 0.6vw, 3px);
          background: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .navbar-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(clamp(6px, 1.5vw, 7px), clamp(6px, 1.5vw, 7px));
        }

        .navbar-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .navbar-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(clamp(6px, 1.5vw, 7px), clamp(-6px, -1.5vw, -7px));
        }

        .navbar-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 2.5rem);
        }

        .navbar-links li {
          position: relative;
        }

        .navbar-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
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
          font-size: clamp(0.9rem, 2.5vw, 1rem);
        }

        /* RESPONSIVE CART BADGE - THE KEY FIX */
        .cart-badge {
          position: absolute;
          top: clamp(-10px, -2vw, -8px);
          right: clamp(-14px, -3vw, -12px);
          background: #667eea;
          color: white;
          border-radius: 50%;
          padding: clamp(2px, 0.8vw, 3px) clamp(5px, 1.5vw, 7px);
          font-size: clamp(0.65rem, 2vw, 0.7rem);
          font-weight: 700;
          min-width: clamp(18px, 4.5vw, 20px);
          height: clamp(18px, 4.5vw, 20px);
          text-align: center;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
        }

        .btn {
          padding: clamp(6px, 2vw, 8px) clamp(16px, 4vw, 20px);
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
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
/* Fixed-size cart badge — same on all screens */
.cart-badge {
  position: absolute;
  top: -8px;             /* adjust to align nicely with Cart text or icon */
  right: -12px;          /* adjust as needed */
  width: 18px;           /* fixed width */
  height: 18px;          /* fixed height */
  background-color: blue badge color */
  color: white;          /* text color */
  border-radius: 50%;    /* perfect circle */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;       /* small, fixed text size */
  font-weight: bold;
  line-height: 1;
  padding: 0;
  z-index: 10;
  transform: none;       /* prevents scaling */
}

/* prevent other media queries from resizing it */
@media (max-width: 768px),
(max-width: 480px),
(min-width: 1200px) {
  .cart-badge {
    width: 18px !important;
    height: 18px !important;
    font-size: 10px !important;
    top: -8px !important;
    right: -12px !important;
  }
}




          .btn-danger {
            width: 100%;
            padding: 12px 20px;
            margin-top: 0.5rem;
            font-size: 1rem;
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
            height: 26px !important;
            width: 26px !important;
          }

          .navbar-links {
            width: 80%;
          }

          /* Extra small phones - smaller badge */
          .cart-badge {
            min-width: 18px;
            height: 18px;
            font-size: 0.65rem;
            padding: 2px 5px;
            left: 32px;
          }
        }

        /* Large screens - slightly bigger badge */
        @media (min-width: 1200px) {
          .cart-badge {
            min-width: 22px;
            height: 22px;
            font-size: 0.75rem;
            padding: 3px 7px;
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