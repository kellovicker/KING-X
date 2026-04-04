import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">KING X</div>
          <p className="footer__tagline">You're cooler than you think.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><FiInstagram size={18} /></a>
            <a href="#" aria-label="Twitter"><FiTwitter size={18} /></a>
            <a href="#" aria-label="Facebook"><FiFacebook size={18} /></a>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Shop</h4>
            <Link to="/shop">All Products</Link>
            <Link to="/collections">Men</Link>
            <Link to="/collections">Women</Link>
            <Link to="/shop">New Arrivals</Link>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <Link to="/about">About Kellox</Link>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Sustainability</a>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <a href="#">Shipping & Returns</a>
            <a href="#">Size Guide</a>
            <a href="#">Care Instructions</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Kellox. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
