import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled]    = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal]   = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setSearchVal('');
  }, [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        {/* Left links */}
        <div className="navbar__left">
          <NavLink to="/shop"        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Shop</NavLink>
          <NavLink to="/collections" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Collections</NavLink>
          <NavLink to="/about"       className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>About</NavLink>
        </div>

        {/* Centered logo */}
        <Link to="/" className="navbar__logo">KELLOX</Link>

        {/* Right icons */}
        <div className="navbar__right">
          <button className="nav-icon" onClick={() => setSearchOpen(s => !s)} aria-label="Search">
            <FiSearch size={18} />
          </button>
          <button className="nav-icon" aria-label="Wishlist">
            <FiHeart size={18} />
          </button>
          <button className="nav-icon" onClick={() => setIsOpen(true)} aria-label="Cart">
            <FiShoppingBag size={18} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        </div>
      </nav>

      {/* Search dropdown */}
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
    </>
  );
}
