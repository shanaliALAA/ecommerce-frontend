import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { productsAPI } from "../api/axios";
import { categoryImages } from "../assets/categoryImages";

const categories = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
  { label: "Accessories", value: "Accessories" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const gridRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.getAll();
      setProducts(res.data);
      setFiltered(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (cat) => {
    setActive(cat);
    let result = cat === "all" 
      ? products 
      : products.filter((p) => (p.category || "").toLowerCase() === cat.toLowerCase());
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    result = applySorting(result);
    setFiltered(result);
    
    setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    let result = active === "all" 
      ? products 
      : products.filter((p) => (p.category || "").toLowerCase() === active.toLowerCase());
    
    if (query) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    result = applySorting(result);
    setFiltered(result);
  };

  const applySorting = (items) => {
    const sorted = [...items];
    if (sortBy === "price-low") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      return sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };

  const handleSort = (value) => {
    setSortBy(value);
    const sorted = applySorting(filtered);
    setFiltered(sorted);
  };

  return (
    <div className="container" style={{ minHeight: "80vh", padding: "2rem 0" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #2c3e50;
          font-weight: 700;
          animation: ${isVisible ? 'slideDown 0.6s ease' : 'none'};
        }

        .page-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-bottom: 2.5rem;
          animation: ${isVisible ? 'slideDown 0.6s ease 0.1s backwards' : 'none'};
        }

        .search-sort-bar {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          animation: ${isVisible ? 'fadeIn 0.6s ease 0.2s backwards' : 'none'};
        }

        .search-input {
          padding: 12px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 50px;
          font-size: 1rem;
          width: 300px;
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          transform: translateY(-2px);
        }

        .sort-select {
          padding: 12px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          background: white;
        }

        .sort-select:hover {
          border-color: #6366f1;
          transform: translateY(-2px);
        }

        .category-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
          z-index: 3;
        }

        .category-card:hover::before {
          left: 100%;
        }

        .products-grid-container {
          animation: ${isVisible ? 'fadeIn 0.6s ease 0.4s backwards' : 'none'};
        }

        .stat-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          animation: ${isVisible ? 'scaleIn 0.5s ease 0.3s backwards' : 'none'};
        }

        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
          border-radius: 10px;
          height: 300px;
        }

        @media (max-width: 768px) {
          .search-input {
            width: 100%;
          }
          .page-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <h1 className="page-title">Discover Your Style</h1>
      <p className="page-subtitle">Explore our curated collection across all categories</p>

      {/* Search and Sort Bar */}
      <div className="search-sort-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="default">Sort by: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Stats Badge */}
      <div style={{ textAlign: "center" }}>
        <div className="stat-badge">
          {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'} Found
        </div>
      </div>

      {/* Category Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          marginBottom: "3rem",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.value}
            className="category-card"
            onClick={() => handleCategory(cat.value)}
            onMouseEnter={() => setHoveredCard(cat.value)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              width: 260,
              height: 520,
              borderRadius: 20,
              background: active === cat.value ? "#111" : "#aaa",
              boxShadow: active === cat.value 
                ? "0 12px 40px rgba(99, 102, 241, 0.4)" 
                : hoveredCard === cat.value
                ? "0 8px 24px rgba(0, 0, 0, 0.2)"
                : "0 2px 8px rgba(99, 102, 241, 0.15)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              border: active === cat.value ? "3px solid #6366f1" : "3px solid transparent",
              animation: isVisible ? `scaleIn 0.5s ease ${idx * 0.1}s backwards` : 'none',
            }}
          >
            <img
              src={categoryImages[cat.label]}
              alt={cat.label}
              loading="lazy"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: active === cat.value ? 0.75 : hoveredCard === cat.value ? 0.65 : 0.5,
                zIndex: 1,
                transition: "all 0.3s ease",
                transform: hoveredCard === cat.value ? "scale(1.1)" : "scale(1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: active === cat.value
                  ? "linear-gradient(to top, rgba(99, 102, 241, 0.6), transparent)"
                  : "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                zIndex: 2,
                transition: "all 0.3s ease",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 3,
                width: "100%",
                textAlign: "center",
                paddingBottom: 32,
                transform: hoveredCard === cat.value ? "translateY(-8px)" : "translateY(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: 2,
                  textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
                  borderBottom: active === cat.value ? "3px solid #fff" : "3px solid transparent",
                  paddingBottom: 4,
                  transition: "all 0.3s ease",
                }}
              >
                {cat.label.toUpperCase()}
              </span>
            </div>
          </div>
        ))}

        {/* All category button */}
        <div
          className="category-card"
          onClick={() => handleCategory("all")}
          onMouseEnter={() => setHoveredCard("all")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            width: 260,
            height: 520,
            borderRadius: 20,
            background: active === "all" ? "#111" : "#aaa",
            boxShadow: active === "all" 
              ? "0 12px 40px rgba(99, 102, 241, 0.4)" 
              : hoveredCard === "all"
              ? "0 8px 24px rgba(0, 0, 0, 0.2)"
              : "0 2px 8px rgba(99, 102, 241, 0.15)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            border: active === "all" ? "3px solid #6366f1" : "3px solid transparent",
            animation: isVisible ? `scaleIn 0.5s ease ${categories.length * 0.1}s backwards` : 'none',
          }}
        >
          <img
            src={categoryImages.All || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=800&fit=crop"}
            alt="All Products"
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: active === "all" ? 0.75 : hoveredCard === "all" ? 0.65 : 0.5,
              zIndex: 1,
              transition: "all 0.3s ease",
              transform: hoveredCard === "all" ? "scale(1.1)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: active === "all"
                ? "linear-gradient(to top, rgba(99, 102, 241, 0.6), transparent)"
                : "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
              zIndex: 2,
              transition: "all 0.3s ease",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 3,
              width: "100%",
              textAlign: "center",
              paddingBottom: 32,
              transform: hoveredCard === "all" ? "translateY(-8px)" : "translateY(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: 2,
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
                borderBottom: active === "all" ? "3px solid #fff" : "3px solid transparent",
                paddingBottom: 4,
                transition: "all 0.3s ease",
              }}
            >
              ALL
            </span>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="loading-shimmer" />
          ))}
        </div>
      )}

      {error && (
        <div style={{ 
          color: "#e74c3c", 
          textAlign: "center", 
          padding: "2rem",
          background: "#fee",
          borderRadius: "10px",
          fontWeight: 600
        }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="products-grid-container">
          <div
            ref={gridRef}
            className="products-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              marginTop: "1.5rem",
            }}
          >
            {filtered.length === 0 ? (
              <div style={{ 
                gridColumn: "1/-1", 
                textAlign: "center", 
                color: "#7f8c8d",
                padding: "3rem",
                fontSize: "1.2rem"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                No products found {searchQuery && `for "${searchQuery}"`}
              </div>
            ) : (
              filtered.map((product, idx) => (
                <div
                  key={product._id}
                  style={{
                    animation: `fadeIn 0.5s ease ${idx * 0.05}s backwards`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;