import React from 'react';

const AlternativeProducts: React.FC = () => {
  // Mock product recommendations
  const mockProducts = [
    {
      id: 1,
      name: "Gentle Cleansing Foam",
      brand: "Clean Beauty Co",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      link: "#"
    },
    {
      id: 2,
      name: "Hydrating Serum",
      brand: "Pure Skin",
      price: "$32.00",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
      link: "#"
    },
    {
      id: 3,
      name: "Natural Moisturizer",
      brand: "Eco Beauty",
      price: "$28.50",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
      link: "#"
    },
    {
      id: 4,
      name: "Vitamin C Cream",
      brand: "Glow Labs",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
      link: "#"
    }
  ];

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, txt =>
      txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  };

  return (
    <section className="aira-recommendations">
      <div className="aira-section-title">🛍️ Recommended Alternatives</div>
      <div className="recommendations-scroll">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="recommendation-card"
            onClick={() => window.open(product.link, '_blank')}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-brand">
              {toTitleCase(product.brand)}
            </div>
            <div className="product-name">
              {product.name}
            </div>
            <div className="product-price">
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlternativeProducts;