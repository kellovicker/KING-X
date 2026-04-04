import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiMail, FiArrowRight } from 'react-icons/fi';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const orderNum = useRef(`KLX-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="order-confirm page-enter">
      <div className="order-confirm__card">
        <div className="order-confirm__icon">
          <FiCheckCircle size={52} />
        </div>

        <p className="section-tag" style={{ textAlign: 'center', marginBottom: 12 }}>Order Placed</p>
        <h1>Thank you!</h1>
        <p className="order-confirm__sub">
          Your order has been confirmed and is being prepared with care.
        </p>

        <div className="order-confirm__num">
          <span>Order Number</span>
          <strong>{orderNum.current}</strong>
        </div>

        <div className="order-confirm__steps">
          <div className="order-step order-step--done">
            <div className="order-step__dot"><FiCheckCircle size={14} /></div>
            <div>
              <span>Order Confirmed</span>
              <p>We've received your order</p>
            </div>
          </div>
          <div className="order-step__line" />
          <div className="order-step">
            <div className="order-step__dot order-step__dot--pending"><FiPackage size={14} /></div>
            <div>
              <span>Processing</span>
              <p>Your items are being prepared</p>
            </div>
          </div>
          <div className="order-step__line" />
          <div className="order-step">
            <div className="order-step__dot order-step__dot--pending"><FiMail size={14} /></div>
            <div>
              <span>Shipped</span>
              <p>You'll receive a tracking email</p>
            </div>
          </div>
        </div>

        <p className="order-confirm__email-note">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="order-confirm__actions">
          <Link to="/shop" className="btn-gold order-confirm__btn">
            Continue Shopping <FiArrowRight size={14} />
          </Link>
          <Link to="/" className="btn-outline-dark order-confirm__btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
