import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiShoppingBag, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { products, sizes } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty]         = useState(1);
  const [liked, setLiked]     = useState(false);
  const [added, setAdded]     = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) return (
    <div className="not-found page-enter">
      <h2>Product not found</h2>
      <Link to="/shop" className="btn-gold">Back to Shop</Link>
    </div>
  );

  const related = products
    .filter(p => p.id !== product.id && p.collection === product.collection)
    .slice(0, 3);

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail page-enter">

      {/* Breadcrumb */}
      <div className="product-detail__breadcrumb">
        <Link to="/shop"><FiArrowLeft size={14} /> Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail__main">

        {/* Gallery */}
        <div className="product-detail__gallery">
          <div className="product-detail__thumbs">
            {product.images.map((src, i) => (
              <button
                key={i}
                className={`product-detail__thumb ${i === activeImg ? 'product-detail__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt={`${product.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className="product-detail__img-main">
            {product.tag && <span className="product-card__tag">{product.tag}</span>}
            <img
              key={activeImg}
              src={product.images[activeImg]}
              alt={product.name}
              className="product-detail__img-active"
            />
          </div>
        </div>

        {/* Info */}
        <div className="product-detail__info">
          <p className="section-tag">{product.category}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price">₦{product.price.toLocaleString()}</p>
          <p className="product-detail__desc">{product.desc}</p>

          {/* Sizes */}
          <div className="product-detail__sizes">
            <div className="product-detail__size-header">
              <span className="product-detail__label">Select Size</span>
              {sizeError && <span className="product-detail__size-error">Please select a size</span>}
            </div>
            <div className="product-detail__size-grid">
              {sizes.map(s => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? 'size-btn--active' : ''}`}
                  onClick={() => { setSelectedSize(s); setSizeError(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="product-detail__qty">
            <span className="product-detail__label">Quantity</span>
            <div className="qty-row">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-detail__actions">
            <button className={`btn-gold product-detail__add ${added ? 'btn-done' : ''}`} onClick={handleAdd}>
              <FiShoppingBag size={16} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              className={`product-detail__wish ${liked ? 'product-detail__wish--active' : ''}`}
              onClick={() => setLiked(l => !l)}
            >
              <FiHeart size={20} />
            </button>
          </div>

          {/* Perks */}
          <div className="product-detail__perks">
            <div className="perk"><FiTruck size={16} /><span>Free delivery on orders over ₦50,000</span></div>
            <div className="perk"><FiRefreshCw size={16} /><span>30-day free returns</span></div>
            <div className="perk"><FiShield size={16} /><span>Authentic Kellox quality guaranteed</span></div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="product-detail__related">
          <div className="home-section__header">
            <div>
              <p className="section-tag">You May Also Like</p>
              <h2>Related Pieces</h2>
            </div>
          </div>
          <div className="products-grid products-grid--3">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
