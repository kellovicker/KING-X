import { useState, useMemo } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Outerwear'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low'];

export default function Shop() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [collection, setCollection] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (collection !== 'All') list = list.filter(p => p.collection === collection);
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort, collection]);

  return (
    <div className="shop page-enter">
      <div className="shop__hero">
        <p className="section-tag">Kellox Store</p>
        <h1>All Products</h1>
        <p className="shop__hero-sub">{filtered.length} pieces available</p>
      </div>

      <div className="shop__body">
        {/* Sidebar Filters */}
        <aside className={`shop__filters ${showFilters ? 'shop__filters--open' : ''}`}>
          <div className="filter-group">
            <h4>Collection</h4>
            {['All', 'men', 'women'].map(c => (
              <button key={c} className={`filter-btn ${collection === c ? 'filter-btn--active' : ''}`} onClick={() => setCollection(c)}>
                {c === 'All' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <h4>Category</h4>
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-btn ${category === c ? 'filter-btn--active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="shop__main">
          <div className="shop__toolbar">
            <button className="shop__filter-toggle" onClick={() => setShowFilters(s => !s)}>
              <FiFilter size={14} /> Filters
            </button>
            <div className="shop__sort">
              <FiChevronDown size={14} />
              <select value={sort} onChange={e => setSort(e.target.value)}>
                {SORTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="products-grid products-grid--3">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {filtered.length === 0 && (
            <div className="shop__empty">
              <p>No products match your filters.</p>
              <button className="btn-outline-dark" onClick={() => { setCategory('All'); setCollection('All'); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
