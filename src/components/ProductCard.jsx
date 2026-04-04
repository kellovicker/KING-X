import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [liked, setLiked]   = useState(false);
  const [added, setAdded]   = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__img">
        {product.tag && <span className="product-card__tag">{product.tag}</span>}
        <button
          className={`product-card__wish ${liked ? 'product-card__wish--active' : ''}`}
          onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          aria-label="Wishlist"
        >
          <FiHeart size={16} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="product-card__photo"
          loading="lazy"
        />
        <button
          className={`product-card__add ${added ? 'product-card__add--done' : ''}`}
          onClick={handleAdd}
        >
          <FiShoppingBag size={14} />
          <span>{added ? 'Added!' : 'Add To Cart'}</span>
        </button>
      </div>
      <div className="product-card__info">
        <div className="product-card__cat">{product.category}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__price">₦{product.price.toLocaleString()}</div>
      </div>
    </Link>
  );
}
