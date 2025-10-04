import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <img
        src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'}
        alt={product.name}
        className="product-image"
        loading="lazy"
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">Rs{product.price.toFixed(2)}</p>
        <p className="product-description">
          {product.description?.substring(0, 100)}
          {product.description?.length > 100 ? '...' : ''}
        </p>
        <button onClick={handleAddToCart} className="btn btn-primary" style={{ width: '100%' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;