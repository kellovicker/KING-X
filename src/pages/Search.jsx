import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Search.css';

/* ── search logic ── */
function searchProducts(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.trim().toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.collection.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    (p.tag && p.tag.toLowerCase().includes(q))
  );
}

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="search-page page-enter">

      {/* Header */}
      <div className="search-page__hero">
        <div className="search-page__hero-inner">
          <p className="section-tag">Search Results</p>
          {query ? (
            <h1>
              {results.length > 0
                ? <>Results for <em>"{query}"</em></>
                : <>No results for <em>"{query}"</em></>
              }
            </h1>
          ) : (
            <h1>What are you looking for?</h1>
          )}
          {query && results.length > 0 && (
            <p className="search-page__count">
              {results.length} piece{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      <div className="search-page__body">

        {/* Results */}
        {results.length > 0 && (
          <section className="search-page__results">
            <div className="products-grid products-grid--4">
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">
              <FiSearch size={40} />
            </div>
            <h2>We couldn't find "{query}"</h2>
            <p>Try different keywords, or explore our collections below.</p>
            <div className="search-page__empty-actions">
              <Link to="/shop" className="btn-gold">
                Browse All Products
              </Link>
              <Link to="/collections" className="btn-outline-dark">
                View Collections <FiArrowRight size={13} />
              </Link>
            </div>

            {/* Suggestions */}
            <div className="search-page__suggestions">
              <p className="search-page__suggestions-label">Try searching for</p>
              <div className="search-page__suggestion-chips">
                {['Overcoat', 'Trousers', 'Shirt', 'Blazer', 'Tops', 'Men', 'Women', 'New'].map(s => (
                  <Link key={s} to={`/search?q=${s}`} className="suggestion-chip">{s}</Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No query — show popular / all */}
        {!query && (
          <div className="search-page__no-query">
            <div className="search-page__suggestions">
              <p className="search-page__suggestions-label">Popular searches</p>
              <div className="search-page__suggestion-chips">
                {['Overcoat', 'Trousers', 'Shirt', 'Blazer', 'Cashmere', 'Men', 'Women', 'New'].map(s => (
                  <Link key={s} to={`/search?q=${s}`} className="suggestion-chip">{s}</Link>
                ))}
              </div>
            </div>
            <h3 className="search-page__browse-label">All Products</h3>
            <div className="products-grid products-grid--4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
