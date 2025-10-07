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
  const gridRef = useRef(null);

  useEffect(() => {
    fetchProducts();
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
    if (cat === "all") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter(
          (p) => (p.category || "").toLowerCase() === cat.toLowerCase()
        )
      );
    }
    setTimeout(() => {
      if (gridRef.current)
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // ✅ Responsive card styles
  const cardStyle = (catValue) => ({
    width: "clamp(140px, 30vw, 260px)",
    height: "clamp(260px, 60vw, 520px)",
    borderRadius: 20,
    background: active === catValue ? "#111" : "#aaa",
    boxShadow:
      active === catValue
        ? "0 8px 32px #6366f155"
        : "0 2px 8px #6366f122",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
    border: active === catValue ? "3px solid #6366f1" : "3px solid transparent",
    flex: "0 0 auto",
    marginRight: 16,
  });

  const imgStyle = (catValue) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: active === catValue ? 0.7 : 0.5,
    zIndex: 1,
    transition: "opacity 0.2s",
  });

  return (
    <div
      className="container"
      style={{
        minHeight: "80vh",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          marginBottom: "2rem",
          color: "#2c3e50",
        }}
      >
        Shop by Category
      </h1>

      {/* Category Cards */}
      <div
        className="categories-wrapper"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "1rem",
          marginBottom: "3rem",
          flexWrap: "nowrap",
          overflowX: "auto",
          paddingBottom: 8,
          scrollbarWidth: "thin",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            style={cardStyle(cat.value)}
          >
            <img
              src={categoryImages[cat.label]}
              alt={cat.label}
              style={imgStyle(cat.value)}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                textAlign: "center",
                paddingBottom: "clamp(16px, 3vw, 32px)",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  letterSpacing: 1,
                  textShadow: "0 2px 8px #000a",
                  borderBottom:
                    active === cat.value
                      ? "3px solid #fff"
                      : "3px solid transparent",
                  paddingBottom: 4,
                  transition: "border-bottom 0.2s",
                }}
              >
                {cat.label.toUpperCase()}
              </span>
            </div>
          </div>
        ))}

        <div onClick={() => handleCategory("all")} style={cardStyle("all")}>
          <img
            src={
              categoryImages.All ||
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=800&fit=crop"
            }
            alt="All Products"
            style={imgStyle("all")}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              textAlign: "center",
              paddingBottom: "clamp(16px, 3vw, 32px)",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                letterSpacing: 1,
                textShadow: "0 2px 8px #000a",
                borderBottom:
                  active === "all"
                    ? "3px solid #fff"
                    : "3px solid transparent",
                paddingBottom: 4,
                transition: "border-bottom 0.2s",
              }}
            >
              ALL
            </span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading && <div style={{ textAlign: "center" }}>Loading products...</div>}
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      {!loading && !error && (
        <div
          ref={gridRef}
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: "#7f8c8d",
              }}
            >
              No products found in this category.
            </div>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
