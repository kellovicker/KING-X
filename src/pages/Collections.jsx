import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Collections.css';

export default function Collections() {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState(params.get('cat') || 'men');

  const col = collections.find(c => c.id === active);
  const filtered = useMemo(() => products.filter(p => p.collection === active), [active]);

  const switchCol = (id) => {
    setActive(id);
    setParams({ cat: id });
  };

  return (
    <div className="collections-page page-enter">
      <div className="collections-page__tabs">
        {collections.map(c => (
          <button
            key={c.id}
            className={`col-tab ${active === c.id ? 'col-tab--active' : ''}`}
            onClick={() => switchCol(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {col && (
        <div className="collections-page__hero">
          <img src={col.image} alt={col.label} className="collections-page__hero-img" />
          <div className="collections-page__hero-content">
            <p className="section-tag">{col.name}'s Collection</p>
            <h1>{col.label}</h1>
            <p>{col.desc}</p>
          </div>
        </div>
      )}

      <div className="collections-page__grid">
        <div className="home-section__header" style={{ marginBottom: 32 }}>
          <h2>{filtered.length} Pieces</h2>
        </div>
        <div className="products-grid products-grid--3">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
