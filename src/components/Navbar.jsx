import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { products } from '../data/products'; // adjust path if different
import './Navbar.css';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchVal, setSearchVal]   = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close everything on route change */
  useEffect(() => {
    setSearchOpen(false);
    setSearchVal('');
    setMenuOpen(false);
  }, [location]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* close mobile drawer if resized up to desktop */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const onChange = e => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* filtered search results — by name and category */
  const searchResults = useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchVal]);

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    setSearchOpen(false);
    setSearchVal('');
  };

  const navLinks = [
    { to: '/shop',        label: 'Shop' },
    { to: '/collections', label: 'Collections' },
    { to: '/about',       label: 'About' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        {/* Logo — left */}
        <Link to="/" className="navbar__logo-wrap">
          <img src="/logo.png" alt="Kellox" className="navbar__logo-img" />
          <span className="navbar__logo-text">KING-X</span>
        </Link>

        {/* Nav links — center, desktop only */}
        <div className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="navbar__right">

          <button
            className="nav-icon"
            onClick={() => setIsOpen(true)}
            aria-label="Cart"
          >
            <FiShoppingBag size={19} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>

          <button
            className="nav-icon"
            onClick={() => { setSearchOpen(s => !s); setMenuOpen(false); }}
            aria-label="Search"
          >
            <FiSearch size={19} />
          </button>
          
          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => { setMenuOpen(m => !m); setSearchOpen(false); }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          
        </div>
      </nav>

      {/* Drawer overlay — mobile only */}
      <div
        className={`nav-overlay ${menuOpen ? 'nav-overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer — mobile only */}
      <div className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}>
        <div className="nav-drawer__header">
          <span className="nav-drawer__brand">KING-X</span>
          <button className="nav-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>
        <nav className="nav-drawer__links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? 'drawer-link drawer-link--active' : 'drawer-link'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button className="drawer-link drawer-link--icon" onClick={() => setMenuOpen(false)} aria-label="Wishlist">
            <FiHeart size={16} /> Wishlist
          </button>
        </nav>
      </div>

      {/* Search bar */}
      <div className={`search-bar ${searchOpen ? 'search-bar--open' : ''}`}>
        <input
          type="text"
          placeholder="Search for pieces…"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          autoFocus={searchOpen}
        />
        <button onClick={() => setSearchOpen(false)}>✕</button>
      </div>

      {/* Search results — sibling of search-bar, not nested, so it isn't clipped by overflow:hidden */}
      {searchOpen && searchVal.trim() && (
        <div className="search-results">
          {searchResults.length === 0 ? (
            <p className="search-results__empty">No products found for "{searchVal}"</p>
          ) : (
            searchResults.map(p => (
              <div
                key={p.id}
                className="search-results__item"
                onClick={() => goToProduct(p.id)}
              >
                <img src={p.image} alt={p.name} />
                <div className="search-results__info">
                  <span className="search-results__name">{p.name}</span>
                  <span className="search-results__category">{p.category}</span>
                </div>
                <span className="search-results__price">₦{p.price.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}