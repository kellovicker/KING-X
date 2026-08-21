import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import blindfolded2 from '../Assets/blindfolded3.jpeg'
import tenis1 from '../Assets/tenis1.jpeg'
import './About.css';

const values = [
  { icon: '◈', title: 'Premium Quality',    desc: 'We source only the finest fabrics from mills across the world. Every thread matters.' },
  { icon: '◇', title: 'Considered Design',  desc: 'Our pieces are designed with timelessness in mind — not trend cycles.' },
  { icon: '○', title: 'Ethical Production', desc: 'Fair wages, safe conditions, and responsible sourcing at every step.' },
  { icon: '△', title: 'Lasting Style',      desc: 'We believe in buying less and buying better. Our garments are made to endure.' },
];

const team = [
  { name: 'Isaac Promise',     role: 'Founder',            initials: 'IP', color: '#e8dfd0' },
  { name: 'Pep Kome',          role: 'Creative Director',  initials: 'PK', color: '#ddd5c8' },
  { name: 'Blessed Abraham',   role: 'Operating Director', initials: 'BA', color: '#e4dbd2' },
];

export default function About() {
  return (
    <div className="about-page page-enter">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__content">
          <p className="section-tag">Our Story</p>
          <h1>Dressed with<br /><em>Purpose.</em></h1>
          <p className="about-hero__sub">
            KING X is more than a clothing brand, it is a lifestyle, a mindset, and a statement of identity.
          </p>
          <p>
            Built for individuals who believe in confidence, ambition, originality, and self-expression, KING X blends premium streetwear, lifestyle fashion, and performance-inspired pieces to create clothing that moves with you through every part of life.
          </p>
          <p className="about-hero__tagline">
            KING X — Royal, Prestige, and Legacy.
          </p>
          <Link to="/shop" className="btn-gold">
            Shop the Collection <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="about-hero__visual">
          <img
            src={tenis1}
            alt="KING X fashion"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {[['2026','Founded in Uyo, Akwa Ibom'],['200+','Pieces in catalogue'],['200+','Happy customers'],['12','Countries shipped to']].map(([num, label]) => (
          <div key={label} className="about-stat">
            <span>{num}</span>
            <p>{label}</p>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story__img">
          <img
            src={blindfolded2}
            alt="KING X craftsmanship"
          />
        </div>
        <div className="about-story__text">
          <p className="section-tag">The Beginning</p>
          <h2>From Uyo,<br />to the World.</h2>
          <p>
           From everyday street style to fitness, school, casual outings, and elevated lifestyle looks, every KING X piece is designed with comfort, quality, exclusivity, and modern style in mind.
          </p>
          <p>
            Our vision is simple: to build KING X into a globally recognized fashion house that represents confidence, individuality, and the relentless pursuit of greatness.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values__header">
          <p className="section-tag">What We Stand For</p>
          <h2>Our Values</h2>
        </div>
        <div className="about-values__grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <span className="value-card__icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="about-values__header">
          <p className="section-tag">The People</p>
          <h2>Meet the Team</h2>
        </div>
        <div className="about-team__grid">
          {team.map(m => (
            <div key={m.name} className="team-card">
              <div className="team-card__avatar" style={{ background: m.color }}>
                <span>{m.initials}</span>
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <p className="section-tag">Ready to Explore?</p>
        <h2>Discover the Collection</h2>
        <p>Premium pieces waiting to become a part of your story.</p>
        <div className="about-cta__btns">
          <Link to="/shop" className="btn-gold">Shop Now</Link>
          <Link to="/collections" className="btn-outline-dark">View Collections</Link>
        </div>
      </section>

    </div>
  );
}