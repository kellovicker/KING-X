import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="order-confirm page-enter">
      <div className="order-confirm__card">

        {/* Icon */}
        <div className="order-confirm__icon">
          <FiCheckCircle size={56} />
        </div>

        <p className="section-tag order-confirm__tag">Order Received</p>

        <h1 className="order-confirm__heading">Thank You!</h1>

        <p className="order-confirm__message">
          We've received your order and we'll get back to you shortly.
        </p>

        <div className="order-confirm__divider" />

        <p className="order-confirm__note">
          Please complete your bank transfer if you haven't already.
          Send proof of payment to <strong>orders@kellox.ng</strong> or
          reach us on WhatsApp and we'll confirm your order right away.
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
