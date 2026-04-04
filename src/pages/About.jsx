import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './About.css';

const values = [
  { icon: '◈', title: 'Premium Quality',    desc: 'We source only the finest fabrics from mills across the world. Every thread matters.' },
  { icon: '◇', title: 'Considered Design',  desc: 'Our pieces are designed with timelessness in mind — not trend cycles.' },
  { icon: '○', title: 'Ethical Production', desc: 'Fair wages, safe conditions, and responsible sourcing at every step.' },
  { icon: '△', title: 'Lasting Style',      desc: 'We believe in buying less and buying better. Our garments are made to endure.' },
];

const team = [
  { name: 'Adaeze Okafor',     role: 'Founder & Creative Director', initials: 'AO', color: '#e8dfd0' },
  { name: 'Chukwuemeka Eze',   role: 'Head of Design',              initials: 'CE', color: '#ddd5c8' },
  { name: 'Ngozi Abara',       role: 'Operations Director',         initials: 'NA', color: '#e4dbd2' },
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
            KING X was born in Port Harcourt from a simple conviction — that great clothing should feel
            as good as it looks, and last far longer than the season.
          </p>
          <Link to="/shop" className="btn-gold">
            Shop the Collection <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="about-hero__visual">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
            alt="KING X fashion"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {[['2019','Founded in Port Harcourt'],['500+','Pieces in catalogue'],['50k+','Happy customers'],['12','Countries shipped to']].map(([num, label]) => (
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
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
            alt="KING X craftsmanship"
          />
        </div>
        <div className="about-story__text">
          <p className="section-tag">The Beginning</p>
          <h2>From Port Harcourt,<br />to the World.</h2>
          <p>
            What began as a small studio in Port Harcourt has grown into one of Nigeria's most
            respected premium clothing labels. We started because we were frustrated with
            the compromise between quality and style — so we chose not to compromise.
          </p>
          <p>
            Every KING X garment is the result of meticulous sourcing, pattern-making,
            and finishing. We work with artisan manufacturers who share our obsession
            with the details that most people never notice — but always feel.
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
