import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product details. Please try again later.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Rs{quantity} item(s) added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="container">
        <div className="product-details-container">
          <div>
            <img
              src={product.image || 'https://via.placeholder.com/500?text=No+Image'}
              alt={product.name}
              className="product-details-image"
            />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#27ae60', marginBottom: '1rem' }}>
              Rs{product.price.toFixed(2)}
            </p>
            <p style={{ color: '#7f8c8d', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                Stock: {product.stock > 0 ? (
                  <span style={{ color: '#27ae60' }}>{product.stock} available</span>
                ) : (
                  <span style={{ color: '#e74c3c' }}>Out of stock</span>
                )}
              </p>
              {product.category && (
                <p style={{ marginBottom: '0.5rem' }}>
                  Category: <span style={{ fontWeight: '500' }}>{product.category}</span>
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '100px',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
                disabled={product.stock === 0}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ padding: '12px 30px', fontSize: '1rem' }}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-success"
                style={{ padding: '12px 30px', fontSize: '1rem' }}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn"
                style={{ padding: '12px 30px', fontSize: '1rem', background: '#95a5a6', color: 'white' }}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;