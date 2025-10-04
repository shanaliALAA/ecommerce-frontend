import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, user } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Sri Lanka'
  });

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity) || 1;
    updateQuantity(productId, quantity);
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate order placement
    const orderDetails = {
      items: cart,
      total: getCartTotal(),
      shippingInfo: shippingInfo,
      orderDate: new Date().toISOString(),
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    console.log('Order placed:', orderDetails);
    alert(`Order placed successfully! Order ID: ${orderDetails.orderId}`);
    setOrderPlaced(true);
    
    // Clear cart after 3 seconds and reset
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setOrderPlaced(false);
      setShippingInfo({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'Sri Lanka'
      });
      navigate('/products');
    }, 5000);
  };

  // Order Success View
  if (orderPlaced) {
    return (
      <div className="container" style={{
        paddingTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '10px',
          padding: '30px',
          marginBottom: '20px',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
          <h2 style={{ color: '#155724', marginBottom: '10px' }}>Order Placed Successfully!</h2>
          <p style={{ color: '#155724' }}>Thank you for your purchase. Your order has been confirmed.</p>
        </div>
        <p style={{ color: '#7f8c8d' }}>Redirecting to shop...</p>
      </div>
    );
  }

  // Checkout Form View
  if (showCheckout) {
    return (
      <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#2c3e50' }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Order Summary */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <span>{item.name} x {item.quantity}</span>
                <span style={{ fontWeight: 'bold' }}>Rs{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginTop: '15px',
              color: '#27ae60'
            }}>
              <span>Total:</span>
              <span>Rs{getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Form */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Shipping Information</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div className="form-grid-2" style={{ marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div className="form-grid-3" style={{ marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    backgroundColor: '#f8f9fa',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowCheckout(false)}
                className="btn"
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Back to Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="btn btn-success"
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="container" style={{ 
        paddingTop: '3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2c3e50', textAlign: 'center' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '2rem', textAlign: 'center' }}>
          Add some products to your cart to see them here.
        </p>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"  
          alt="Empty Cart" 
          style={{
            width: "280px",
            marginBottom: "2rem",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }} 
        />
        <Link to="/products">
          <button 
            className="btn btn-primary"  
            style={{ 
              backgroundColor: "#3498db", 
              color: "white", 
              padding: "12px 30px", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  // Cart View
  return (
    <div className="cart-container">
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#2c3e50' }}>
          Shopping Cart
        </h1>

        <div className="cart-grid">
          <div>
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={item.image || 'https://via.placeholder.com/80?text=No+Image'}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      Rs{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '500' }}>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      style={{
                        width: '70px',
                        padding: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        textAlign: 'center',
                      }}
                    />
                  </div>
                  <p style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                    Rs{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-danger"
                    style={{ padding: '8px 15px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={clearCart}
                className="btn"
                style={{ background: '#95a5a6', color: 'white', padding: '10px 20px' }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div>
            <div className="cart-summary">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
                Order Summary
              </h2>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal:</span>
                  <span>Rs{getCartTotal().toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Shipping:</span>
                  <span>Rs0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Tax:</span>
                  <span>Rs0.00</span>
                </div>
                <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span style={{ color: '#27ae60' }}>Rs{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-success"
                style={{ width: '100%', padding: '12px', fontSize: '1.1rem', marginTop: '1rem' }}
              >
                Proceed to Checkout
              </button>
              <Link to="/products">
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', marginTop: '1rem' }}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;