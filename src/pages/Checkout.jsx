import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    payMethod: 'card',
    cardName: '', cardNum: '', expiry: '', cvv: '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const shipping = total >= 30000 ? 0 : 2500;
  const grandTotal = total + shipping;
  const fmt = n => `₦${n.toLocaleString()}`;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const handlePlace = () => {
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="checkout page-enter">
      <div className="checkout__left">
        <div className="checkout__brand">KELLOX</div>

        {/* Steps */}
        <div className="checkout__steps">
          {STEPS.map((s, i) => (
            <button
              key={s}
              className={`checkout__step ${i === step ? 'checkout__step--active' : ''} ${i < step ? 'checkout__step--done' : ''}`}
              onClick={() => i < step && setStep(i)}
            >
              <span className="checkout__step-num">{i < step ? '✓' : i + 1}</span>
              {s}
            </button>
          ))}
        </div>

        {/* Mobile order summary toggle */}
        <button className="checkout__summary-toggle" onClick={() => setSummaryOpen(o => !o)}>
          <span>Order Summary ({items.length} items)</span>
          <span className="checkout__summary-toggle-right">
            {fmt(grandTotal)}
            {summaryOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </span>
        </button>

        {summaryOpen && (
          <div className="checkout__mobile-summary">
            {items.map(item => (
              <div key={item.key} className="checkout__mini-item">
                <div className="checkout__mini-img" style={{ background: item.color }} />
                <div className="checkout__mini-info">
                  <span>{item.name}</span>
                  <span className="checkout__mini-sub">Size {item.size} × {item.qty}</span>
                </div>
                <span>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 0: Delivery */}
        {step === 0 && (
          <div className="checkout__form">
            <h2>Delivery Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input placeholder="John" value={form.firstName} onChange={set('firstName')} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input placeholder="Doe" value={form.lastName} onChange={set('lastName')} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input placeholder="12 Victoria Island, Lagos" value={form.address} onChange={set('address')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input placeholder="Lagos" value={form.city} onChange={set('city')} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input placeholder="Lagos State" value={form.state} onChange={set('state')} />
              </div>
            </div>
            <button className="btn-gold checkout__next-btn" onClick={handleNext}>
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 1: Payment */}
        {step === 1 && (
          <div className="checkout__form">
            <h2>Payment Method</h2>
            <div className="pay-methods">
              {[
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'paystack', label: 'Pay with Paystack' },
                { id: 'transfer', label: 'Bank Transfer' },
              ].map(m => (
                <button
                  key={m.id}
                  className={`pay-method ${form.payMethod === m.id ? 'pay-method--active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, payMethod: m.id }))}
                >
                  <span className="pay-method__radio" />
                  {m.label}
                </button>
              ))}
            </div>

            {form.payMethod === 'card' && (
              <div className="card-fields">
                <div className="form-group">
                  <label>Name on Card</label>
                  <input placeholder="John Doe" value={form.cardName} onChange={set('cardName')} />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input placeholder="0000 0000 0000 0000" value={form.cardNum} onChange={set('cardNum')} maxLength={19} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input placeholder="MM / YY" value={form.expiry} onChange={set('expiry')} maxLength={7} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input placeholder="•••" value={form.cvv} onChange={set('cvv')} maxLength={4} type="password" />
                  </div>
                </div>
              </div>
            )}

            {form.payMethod === 'transfer' && (
              <div className="transfer-info">
                <p>Bank: <strong>First Bank of Nigeria</strong></p>
                <p>Account Name: <strong>Kellox Limited</strong></p>
                <p>Account Number: <strong>3012345678</strong></p>
                <p className="transfer-note">Transfer the exact amount and send proof of payment to orders@kellox.ng</p>
              </div>
            )}

            {form.payMethod === 'paystack' && (
              <div className="paystack-note">
                <p>You'll be redirected to Paystack's secure payment page to complete your order.</p>
              </div>
            )}

            <div className="checkout__nav-btns">
              <button className="btn-outline-dark" onClick={() => setStep(0)}>Back</button>
              <button className="btn-gold checkout__next-btn" onClick={handleNext}>Review Order</button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="checkout__form">
            <h2>Review Order</h2>
            <div className="review-block">
              <div className="review-block__header">
                <span>Delivery</span>
                <button onClick={() => setStep(0)} className="review-edit">Edit</button>
              </div>
              <p>{form.firstName} {form.lastName}</p>
              <p>{form.address}, {form.city}</p>
              <p>{form.email}</p>
            </div>
            <div className="review-block">
              <div className="review-block__header">
                <span>Payment</span>
                <button onClick={() => setStep(1)} className="review-edit">Edit</button>
              </div>
              <p>{form.payMethod === 'card' ? 'Credit / Debit Card' : form.payMethod === 'paystack' ? 'Paystack' : 'Bank Transfer'}</p>
              {form.payMethod === 'card' && form.cardNum && <p>•••• •••• •••• {form.cardNum.slice(-4)}</p>}
            </div>

            <div className="checkout__totals">
              <div className="checkout__total-row">
                <span>Subtotal</span><span>{fmt(total)}</span>
              </div>
              <div className="checkout__total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
              </div>
              <div className="checkout__total-row checkout__total-row--grand">
                <span>Total</span><span>{fmt(grandTotal)}</span>
              </div>
            </div>

            <button className="btn-gold checkout__next-btn checkout__place-btn" onClick={handlePlace}>
              <FiLock size={14} /> Place Order
            </button>
            <button className="btn-outline-dark" onClick={() => setStep(1)} style={{ width: '100%', marginTop: 12 }}>Back</button>
          </div>
        )}
      </div>

      {/* Right: Order Summary (desktop) */}
      <div className="checkout__right">
        <h3>Order Summary</h3>
        <div className="checkout__items">
          {items.map(item => (
            <div key={item.key} className="checkout__item">
              <div className="checkout__item-img" style={{ background: item.color }}>
                <span className="checkout__item-qty">{item.qty}</span>
              </div>
              <div className="checkout__item-info">
                <span>{item.name}</span>
                <span className="checkout__item-sub">Size: {item.size}</span>
              </div>
              <span className="checkout__item-price">{fmt(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="checkout__summary-totals">
          <div className="checkout__total-row">
            <span>Subtotal</span><span>{fmt(total)}</span>
          </div>
          <div className="checkout__total-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
          </div>
          {shipping === 0 && <p className="shipping-note">Free shipping applied</p>}
          <div className="checkout__total-row checkout__total-row--grand">
            <span>Total</span><span>{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
