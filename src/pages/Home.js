import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over Rs1990' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day guarantee' },
    { icon: '⭐', title: 'Premium Quality', desc: 'Handpicked products' }
  ];

  const heroSlides = [
    { bg: '#4158D0', text: 'New Season Collection', sub: 'Discover the latest trends' },
    { bg: '#C850C0', text: 'Exclusive Deals', sub: 'Up to 50% off selected items' },
    { bg: '#FFCC70', text: 'Premium Quality', sub: 'Crafted with excellence' }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    setIsVisible(true);
    
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setFeaturedProducts(response.data.slice(0, 6));
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero-section {
          position: relative;
          text-align: center;
          padding: 4rem 2rem;
          border-radius: 20px;
          margin-bottom: 3rem;
          overflow: hidden;
          background: linear-gradient(135deg, ${heroSlides[currentSlide].bg}BB, ${heroSlides[currentSlide].bg}DD);
          transition: all 0.8s ease;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          animation: ${isVisible ? 'fadeInUp 0.8s ease' : 'none'};
        }
        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: white;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.95);
          margin-bottom: 2rem;
        }
        .hero-btn {
          animation: pulse 2s infinite;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
          opacity: ${isVisible ? 1 : 0};
          animation: ${isVisible ? 'fadeInUp 0.8s ease 0.3s forwards' : 'none'};
        }
        .feature-card {
          text-align: center;
          padding: 2rem;
          border-radius: 15px;
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }
        .feature-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        .feature-desc {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #2c3e50;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          animation: ${isVisible ? 'slideIn 0.6s ease 0.5s forwards' : 'none'};
        }
        .products-grid {
          opacity: ${isVisible ? 1 : 0};
          animation: ${isVisible ? 'fadeInUp 0.8s ease 0.7s forwards' : 'none'};
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }
        .cta-section {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          color: white;
          opacity: ${isVisible ? 1 : 0};
          animation: ${isVisible ? 'fadeInUp 0.8s ease 0.9s forwards' : 'none'};
        }
        .cta-title { font-size: 2rem; margin-bottom: 1rem; }
        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 2rem;
        }
        .slide-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .slide-dot.active {
          background: white;
          width: 30px;
          border-radius: 5px;
        }
        .shop-now-btn {
          font-size: 1.1rem;
          padding: 15px 40px;
          border: none;
          border-radius: 50px;
          background: white;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .shop-now-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero-section { padding: 2rem 1rem; border-radius: 15px; }
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 1rem; }
          .shop-now-btn { padding: 12px 25px; font-size: 1rem; }
          .features-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .products-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
          .cta-section { padding: 2rem 1rem; border-radius: 15px; }
          .cta-title { font-size: 1.5rem; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; gap: 1rem; }
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{heroSlides[currentSlide].text}</h1>
          <p className="hero-subtitle">{heroSlides[currentSlide].sub}</p>
          <Link to="/products">
            <button className="shop-now-btn hero-btn">Shop Now →</button>
          </Link>
          <div className="slide-indicators">
            {heroSlides.map((_, idx) => (
              <div 
                key={idx} 
                className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="feature-icon" style={{ animationDelay: `${idx * 0.2}s` }}>
              {feature.icon}
            </div>
            <div className="feature-title">{feature.title}</div>
            <div className="feature-desc">{feature.desc}</div>
          </div>
        ))}
      </div>

      {/* FEATURED PRODUCTS */}
      <div style={{ marginTop: '4rem' }}>
        <h2 className="section-title">Featured Products ✨</h2>

        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && featuredProducts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No products available at the moment.</p>
        )}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Upgrade Your Style?</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
          Explore our full collection and find your perfect match
        </p>
        <Link 
  to="/products"
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  <button className="shop-now-btn">View All Products</button>
</Link>

      </div>
    </div>
  );
};

export default Home;
