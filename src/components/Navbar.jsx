import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useSearch } from '../hooks/useSearch';
import './Navbar.css';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const navigate = useNavigate();

  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchVal,   setSearchVal]   = useState('');
  const [showDrop,    setShowDrop]    = useState(false);

  const location = useLocation();
  const inputRef = useRef(null);
  const dropRef  = useRef(null);

  const suggestions = useSearch(searchVal).slice(0, 5);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
    setSearchVal('');
    setShowDrop(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropRef.current  && !dropRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) setShowDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [searchOpen]);

  const handleOpen  = () => { setSearchOpen(true); setMenuOpen(false); };
  const handleClose = () => { setSearchOpen(false); setSearchVal(''); setShowDrop(false); };

  const handleChange = (e) => {
    const v = e.target.value;
    setSearchVal(v);
    setShowDrop(v.trim().length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = searchVal.trim();
    if (!q) return;
    setShowDrop(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const goToProduct = (p) => { setShowDrop(false); navigate(`/product/${p.id}`); };

  const goToAll = () => {
    const q = searchVal.trim();
    if (!q) return;
    setShowDrop(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const navLinks = [
    { to: '/shop',        label: 'Shop' },
    { to: '/collections', label: 'Collections' },
    { to: '/about',       label: 'About' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="nav_carrier">

          <Link to="/" className="navbar__logo-wrap">
            <img src="/logo.png" alt="Kellox" className="navbar__logo-img" />
            <span className="navbar__logo-text">KING X</span>
          </Link>

          <div className="navbar__links">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="navbar__right">
            <button className={`nav-icon ${searchOpen ? 'nav-icon--active' : ''}`}
              onClick={searchOpen ? handleClose : handleOpen} aria-label="Search">
              {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
            </button>

            <button className="nav-icon" onClick={() => setIsOpen(true)} aria-label="Cart">
              <FiShoppingBag size={20} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>

            <button className="nav-hamburger"
              onClick={() => { setMenuOpen(m => !m); setSearchOpen(false); }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div className={`nav-overlay ${menuOpen ? 'nav-overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}>
        <div className="nav-drawer__header">
          <span className="nav-drawer__brand">KELLOX</span>
          <button className="nav-drawer__close" onClick={() => setMenuOpen(false)}>
            <FiX size={20} />
          </button>
        </div>
        <nav className="nav-drawer__links">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => isActive ? 'drawer-link drawer-link--active' : 'drawer-link'}
              onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Search bar */}
      <div className={`search-bar ${searchOpen ? 'search-bar--open' : ''}`}>
        <form className="search-bar__form" onSubmit={handleSubmit}>
          <FiSearch size={16} className="search-bar__icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, categories…"
            value={searchVal}
            onChange={handleChange}
            onFocus={() => searchVal.trim().length > 0 && setShowDrop(true)}
          />
          {searchVal && (
            <button type="button" className="search-bar__clear"
              onClick={() => { setSearchVal(''); setShowDrop(false); inputRef.current?.focus(); }}>
              <FiX size={14} />
            </button>
          )}
          <button type="submit" className="search-bar__submit">Search</button>
        </form>

        {/* Live dropdown */}
        {showDrop && (
          <div className="search-drop" ref={dropRef}>
            {suggestions.length > 0 ? (
              <>
                <p className="search-drop__label">Products</p>
                <ul className="search-drop__list">
                  {suggestions.map(p => (
                    <li key={p.id}>
                      <button className="search-drop__item" onClick={() => goToProduct(p)}>
                        <img src={p.image} alt={p.name} className="search-drop__img" />
                        <div className="search-drop__info">
                          <span className="search-drop__name">{p.name}</span>
                          <span className="search-drop__meta">
                            {p.category} · {p.collection === 'men' ? 'Men' : 'Women'}
                          </span>
                        </div>
                        <span className="search-drop__price">₦{p.price.toLocaleString()}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="search-drop__see-all" onClick={goToAll}>
                  See all results for "{searchVal}" <FiArrowRight size={13} />
                </button>
              </>
            ) : (
              <div className="search-drop__empty">
                <FiSearch size={20} />
                <p>No results for <strong>"{searchVal}"</strong></p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dim overlay when dropdown open */}
      {showDrop && <div className="search-overlay" onClick={() => setShowDrop(false)} />}
    </>
  );
}
