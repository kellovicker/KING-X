import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { products, collections, heroSlides } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const [slide, setSlide]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (n) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide((n + heroSlides.length) % heroSlides.length);
      setAnimating(false);
    }, 320);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(slide + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [slide]);

  const featured = products.slice(0, 4);
  const cur = heroSlides[slide];

  return (
    <div className="home page-enter">

      {/* ── Hero ────────────────────────────────── */}
      <section className="hero">
        <div className="hero__left">
          <p className={`section-tag hero__tag ${animating ? 'fade-out' : 'fade-in'}`}>{cur.tag}</p>
          <h1 className={`hero__title ${animating ? 'fade-out' : 'fade-in'}`}>
            {cur.title.map((line, i) => (
              <span key={i}>{i === 1 ? <em>{line}</em> : line}<br /></span>
            ))}
          </h1>
          <p className={`hero__sub ${animating ? 'fade-out' : 'fade-in'}`}>{cur.sub}</p>
          <div className="hero__ctas">
            <Link to="/shop" className="btn-gold">Shop Now</Link>
            <Link to="/collections" className="btn-outline-light">Explore</Link>
          </div>
          <div className="hero__dots">
            {heroSlides.map((_, i) => (
              <button key={i} className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>

        <div className="hero__right">
          <img
            key={slide}
            src={cur.image}
            alt={cur.label}
            className={`hero__img ${animating ? 'fade-out' : 'fade-in'}`}
          />
          <div className="hero__badge"><span className="section-tag">New In</span></div>
          <div className="hero__slide-label">{cur.label}</div>
          <div className="hero__arrows">
            <button onClick={() => goTo(slide - 1)} aria-label="Previous"><FiChevronLeft size={18} /></button>
            <button onClick={() => goTo(slide + 1)} aria-label="Next"><FiChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {['Premium Fabrics','·','Refined Cuts','·','Timeless Style','·','New Arrivals 2026','·','Made to Last','·',
            'Premium Fabrics','·','Refined Cuts','·','Timeless Style','·','New Arrivals 2026','·','Made to Last'].map((t,i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Featured Products ─────────────────────── */}
      <section className="home-section">
        <div className="home-section__header">
          <div>
            <p className="section-tag">Curated For You</p>
            <h2>Featured Pieces</h2>
          </div>
          <Link to="/shop" className="view-all">View All <FiArrowRight size={14} /></Link>
        </div>
        <div className="products-grid products-grid--4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── Collections ──────────────────────────── */}
      <section className="home-section home-section--dark">
        <div className="home-section__header home-section__header--light">
          <div>
            <p className="section-tag">Explore</p>
            <h2 style={{ color: 'var(--cream)' }}>Our Collections</h2>
          </div>
          <Link to="/collections" className="view-all view-all--light">Browse All <FiArrowRight size={14} /></Link>
        </div>
        <div className="collections-grid">
          {collections.map(col => (
            <Link to={`/collections?cat=${col.id}`} key={col.id} className="collection-card">
              <img src={col.image} alt={col.label} className="collection-card__img" />
              <div className="collection-card__inner">
                <p className="section-tag">{col.name}</p>
                <h3>{col.label}</h3>
                <p className="collection-card__desc">{col.desc}</p>
                <span className="collection-card__link">Shop Now <FiArrowRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About Section ────────────────────────── */}
      <section className="about-section">
        <div className="about-section__img">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
            alt="About KING X"
          />
        </div>
        <div className="about-section__content">
          <p className="section-tag">Our Story</p>
          <h2>Crafted with<br /><em>intention.</em></h2>
          <p className="about-section__text">
            KING X was born from a belief that great clothing should feel as good as it looks.
            Every piece is thoughtfully made — premium fabrics, considered cuts, enduring style.
            We believe in dressing with purpose, not trend.
          </p>
          <div className="about-section__stats">
            <div><span>2019</span><p>Founded</p></div>
            <div><span>500+</span><p>Products</p></div>
            <div><span>50k+</span><p>Customers</p></div>
          </div>
          <Link to="/about" className="btn-gold">Learn More</Link>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="newsletter">
        <p className="section-tag">Stay Connected</p>
        <h2>Join the Inner Circle</h2>
        <p className="newsletter__sub">Early access, exclusive drops, and styling notes — straight to your inbox.</p>
        <form className="newsletter__form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button type="submit" className="btn-gol">Subscribe</button>
        </form>
      </section>

    </div>
  );
}
