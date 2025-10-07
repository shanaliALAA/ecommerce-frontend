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
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

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
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '10px',
          padding: '30px 20px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
          <h2 style={{ color: '#155724', marginBottom: '10px', fontSize: 'clamp(1.3rem, 4vw, 1.5rem)' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: '#155724', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>
        <p style={{ color: '#7f8c8d' }}>Redirecting to shop...</p>
      </div>
    );
  }

  // Checkout Form View
  if (showCheckout) {
    return (
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '1.5rem', color: '#2c3e50' }}>
          Checkout
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Order Summary */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: 'clamp(12px, 3vw, 15px)',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50', fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
              Order Summary
            </h3>
            {cart.map((item) => (
              <div key={item._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                gap: '10px'
              }}>
                <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                  {item.name} x {item.quantity}
                </span>
                <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  Rs{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
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
            padding: 'clamp(12px, 3vw, 15px)',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
              Shipping Information
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: 'clamp(8px, 2vw, 10px)',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(8px, 2vw, 10px)',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(8px, 2vw, 10px)',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: 'clamp(8px, 2vw, 10px)',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(8px, 2vw, 10px)',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(8px, 2vw, 10px)',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)' }}>
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  readOnly
                  style={{
                    width: '100%',
                    padding: 'clamp(8px, 2vw, 10px)',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    backgroundColor: '#f8f9fa',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setShowCheckout(false)}
                className="btn"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 3vw, 12px)',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
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
                  width: '100%',
                  padding: 'clamp(10px, 3vw, 12px)',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
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
        paddingTop: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem 1rem'
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '1rem', color: '#2c3e50', textAlign: 'center' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '2rem', textAlign: 'center', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
          Add some products to your cart to see them here.
        </p>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"  
          alt="Empty Cart" 
          style={{
            width: "100%",
            maxWidth: "280px",
            marginBottom: "2rem",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }} 
        />
        <Link to="/products" style={{ width: '100%', maxWidth: '300px' }}>
          <button 
            className="btn btn-primary"  
            style={{ 
              width: '100%',
              backgroundColor: "#3498db", 
              color: "white", 
              padding: "clamp(10px, 3vw, 12px) 30px", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
              fontWeight: "500"
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  // Cart View - MAIN FIX HERE
  return (
    <div className="cart-container" style={{ padding: 'clamp(1rem, 3vw, 2rem) 0' }}>
      <div className="container">
        <h1 style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)', 
          color: '#2c3e50' 
        }}>
          Shopping Cart
        </h1>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 3vw, 1.5rem)'
        }}>
          {/* Cart Items Section */}
          <div>
            {cart.map((item) => (
              <div key={item._id} style={{
                background: 'white',
                padding: 'clamp(12px, 3vw, 16px)',
                borderRadius: '10px',
                marginBottom: 'clamp(10px, 2vw, 12px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0'
              }}>
                {/* Product Info Row */}
                <div style={{ 
                  display: 'flex', 
                  gap: 'clamp(10px, 2vw, 12px)', 
                  marginBottom: 'clamp(10px, 2vw, 12px)'
                }}>
                  <img
                    src={item.image || 'https://via.placeholder.com/80?text=No+Image'}
                    alt={item.name}
                    style={{
                      width: 'clamp(60px, 15vw, 80px)',
                      height: 'clamp(60px, 15vw, 80px)',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', 
                      marginBottom: 'clamp(4px, 1vw, 6px)', 
                      color: '#2c3e50',
                      lineHeight: '1.3',
                      wordBreak: 'break-word'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{ 
                      color: '#27ae60', 
                      fontWeight: 'bold', 
                      fontSize: 'clamp(1rem, 3.5vw, 1.15rem)',
                      margin: 0
                    }}>
                      Rs{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                {/* Actions Row */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: 'clamp(8px, 2vw, 10px)',
                  flexWrap: 'wrap',
                  paddingTop: 'clamp(8px, 2vw, 10px)',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ 
                      fontWeight: '500', 
                      fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                      whiteSpace: 'nowrap'
                    }}>
                      Qty:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      style={{
                        width: 'clamp(55px, 12vw, 70px)',
                        padding: 'clamp(6px, 1.5vw, 8px)',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        textAlign: 'center',
                        fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                      }}
                    />
                  </div>
                  
                  <p style={{ 
                    fontWeight: 'bold', 
                    fontSize: 'clamp(1rem, 3.5vw, 1.1rem)',
                    color: '#2c3e50',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    Rs{(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ 
                      padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 15px)', 
                      fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'clamp(12px, 3vw, 16px)' }}>
              <button
                onClick={clearCart}
                style={{ 
                  background: '#95a5a6', 
                  color: 'white', 
                  padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 24px)',
                  width: '100%',
                  maxWidth: '200px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                  fontWeight: '500'
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <div style={{ 
              background: 'white',
              padding: 'clamp(15px, 4vw, 20px)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0'
            }}>
              <h2 style={{ 
                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
                marginBottom: 'clamp(12px, 3vw, 16px)', 
                color: '#2c3e50' 
              }}>
                Order Summary
              </h2>
              <div style={{ marginBottom: 'clamp(12px, 3vw, 16px)' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 'clamp(8px, 2vw, 10px)',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                }}>
                  <span>Subtotal:</span>
                  <span>Rs{getCartTotal().toFixed(2)}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 'clamp(8px, 2vw, 10px)',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                }}>
                  <span>Shipping:</span>
                  <span>Rs0.00</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 'clamp(8px, 2vw, 10px)',
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                }}>
                  <span>Tax:</span>
                  <span>Rs0.00</span>
                </div>
                <hr style={{ margin: 'clamp(12px, 3vw, 16px) 0', border: 'none', borderTop: '1px solid #ddd' }} />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', 
                  fontWeight: 'bold' 
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#27ae60' }}>Rs{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                style={{ 
                  width: '100%', 
                  padding: 'clamp(12px, 3vw, 14px)', 
                  fontSize: 'clamp(0.95rem, 3vw, 1rem)', 
                  marginTop: 'clamp(8px, 2vw, 10px)',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Proceed to Checkout
              </button>
              <Link to="/products">
                <button
                  style={{ 
                    width: '100%', 
                    padding: 'clamp(12px, 3vw, 14px)', 
                    marginTop: 'clamp(8px, 2vw, 10px)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.95rem, 3vw, 1rem)',
                    fontWeight: '600'
                  }}
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