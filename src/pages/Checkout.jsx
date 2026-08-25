import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiChevronDown, FiChevronUp, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';
import './Checkout.css';

/* ─────────────────────────────────────────────────────────
   EmailJS credentials
   EJS_SERVICE      — same service for both emails
   EJS_TEMPLATE_BIZ — template sent TO King-X (order alert)   To Email = {{to_email}}
   EJS_TEMPLATE_CUS — template sent TO the customer (confirmation)  To Email = {{to_email}}
   EJS_PUBLIC       — your public key
───────────────────────────────────────────────────────── */
const EJS_SERVICE      = 'service_3yrp4ut';
const EJS_TEMPLATE_BIZ = 'template_92xxf3a';
const EJS_TEMPLATE_CUS = 'template_e0a4a01';
const EJS_PUBLIC       = '1dNrTuEHY6wE3FFyy';

const STEPS = ['Delivery', 'Payment', 'Review'];

const FIELDS = [
  { key: 'firstName', label: 'First Name',     placeholder: 'John',                      type: 'text',  row: 1 },
  { key: 'lastName',  label: 'Last Name',      placeholder: 'Doe',                       type: 'text',  row: 1 },
  { key: 'email',     label: 'Email Address',  placeholder: 'john@example.com',          type: 'email', row: 2 },
  { key: 'phone',     label: 'Phone Number',   placeholder: '+234 800 000 0000',         type: 'tel',   row: 3 },
  { key: 'address',   label: 'Street Address', placeholder: '12 Victoria Island, Lagos', type: 'text',  row: 4 },
  { key: 'city',      label: 'City',           placeholder: 'Lagos',                     type: 'text',  row: 5 },
  { key: 'state',     label: 'State',          placeholder: 'Lagos State',               type: 'text',  row: 5 },
];

function validateField(key, value) {
  const v = (value || '').trim();
  if (!v) return 'This field is required';
  if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    return 'Enter a valid email address';
  }
  if (key === 'phone' && v.replace(/\D/g, '').length < 10) {
    return 'Enter a valid phone number';
  }
  return '';
}

function Field({ fKey, fields, form, touched, errors, onChange, onBlur }) {
  const f      = fields.find((x) => x.key === fKey);
  const hasErr = touched[fKey] && errors[fKey];

  return (
    <div className={`form-group ${hasErr ? 'form-group--error' : ''}`}>
      <label htmlFor={fKey}>
        {f.label} <span className="required-star">*</span>
      </label>
      <input
        id={fKey}
        type={f.type}
        placeholder={f.placeholder}
        value={form[fKey]}
        onChange={onChange(fKey)}
        onBlur={onBlur(fKey)}
        autoComplete="on"
      />
      {hasErr && (
        <span className="field-error">
          <FiAlertCircle size={11} /> {errors[fKey]}
        </span>
      )}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    payMethod: 'transfer',
    cardName: '', cardNum: '', expiry: '', cvv: '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors]   = useState({});
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState('');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors(er => ({ ...er, [key]: validateField(key, value) }));
    }
  };

  const handleBlur = (key) => () => {
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(er => ({ ...er, [key]: validateField(key, form[key]) }));
  };

  const shipping = total >= 30000 ? 0 : 2500;
  const grandTotal = total + shipping;
  const fmt = n => `₦${n.toLocaleString()}`;

  const handleNext = () => {
    if (step === 0) {
      const newTouched = {};
      const newErrors = {};
      FIELDS.forEach(({ key }) => {
        newTouched[key] = true;
        newErrors[key] = validateField(key, form[key]);
      });
      setTouched(t => ({ ...t, ...newTouched }));
      setErrors(er => ({ ...er, ...newErrors }));
      if (Object.values(newErrors).some(Boolean)) return;
    }
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const payMethodLabel = 'Bank Transfer';

  /* ── place order: send both emails ── */
  const handlePlace = async () => {
    setSendError('');
    setSending(true);

    const orderId    = `KX-${Date.now()}`;
    const orderLines = items
      .map((i) => `${i.name} | Size: ${i.size} | Qty: ${i.qty} | NGN ${(i.price * i.qty).toLocaleString()}`)
      .join(' || ');

    const sharedParams = {
      order_id         : orderId,
      customer_name    : `${form.firstName} ${form.lastName}`,
      customer_email   : form.email,
      customer_phone   : form.phone,
      delivery_address : `${form.address}, ${form.city}, ${form.state}`,
      payment_method   : payMethodLabel,
      order_items      : orderLines,
      subtotal         : `NGN ${total.toLocaleString()}`,
      shipping_fee     : shipping === 0 ? 'Free' : `NGN ${shipping.toLocaleString()}`,
      grand_total      : `NGN ${grandTotal.toLocaleString()}`,
      order_date       : new Date().toLocaleString('en-NG', {
                           dateStyle: 'medium',
                           timeStyle: 'short',
                         }),
    };

    /* bizParams → sent to King-X inbox. Template's To Email = {{to_email}} */
    const bizParams = {
      ...sharedParams,
      to_email : 'kingzexclusiveconcept@gmail.com',
      to_name  : 'King-X Team',
    };

    /* cusParams → sent to the customer. Template's To Email = {{to_email}} */
    const cusParams = {
      ...sharedParams,
      to_email : form.email,
      to_name  : `${form.firstName} ${form.lastName}`,
    };

    try {
      // Business alert — must succeed for the order to count as placed
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE_BIZ, bizParams, { publicKey: EJS_PUBLIC });

      // Customer confirmation — best-effort, won't block checkout if it fails
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE_CUS, cusParams, { publicKey: EJS_PUBLIC });
      } catch (custErr) {
        console.warn('Customer confirmation email failed (non-blocking):', custErr);
      }

      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      console.error('EmailJS error:', err.status, err.text);
      setSendError('Could not send your order. Please try again or reach us on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const rowKeys    = (rowNum) => FIELDS.filter((f) => f.row === rowNum).map((f) => f.key);
  const fieldProps = { fields: FIELDS, form, touched, errors, onChange: handleChange, onBlur: handleBlur };

  return (
    <div className="checkout page-enter">
      <div className="checkout__left">
        <div className="checkout__brand">KELLOX</div>

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

        {step === 0 && (
          <div className="checkout__form">
            <h2>Delivery Details</h2>
            <div className="form-row">
              {rowKeys(1).map((k) => <Field key={k} fKey={k} {...fieldProps} />)}
            </div>
            {[2, 3, 4].map((r) =>
              rowKeys(r).map((k) => <Field key={k} fKey={k} {...fieldProps} />)
            )}
            <div className="form-row">
              {rowKeys(5).map((k) => <Field key={k} fKey={k} {...fieldProps} />)}
            </div>
            <button className="btn-gold checkout__next-btn" onClick={handleNext}>
              Continue to Payment
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="checkout__form">
            <h2>Payment Method</h2>
            <div className="pay-methods">
              {[
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

            {form.payMethod === 'transfer' && (
              <div className="transfer-info">
                <p>Bank: <strong>UBA</strong></p>
                <p>Account Name: <strong>KINGZ EXCLUSIVE CONCEPTS</strong></p>
                <p>Account Number: <strong>1030052894</strong></p>
                <p className="transfer-note">Transfer the exact amount and send proof of payment to orders@kellox.ng</p>
              </div>
            )}

            <div className="checkout__nav-btns">
              <button className="btn-outline-dark" onClick={() => setStep(0)}>Back</button>
              <button className="btn-gold checkout__next-btn" onClick={handleNext}>Review Order</button>
            </div>
          </div>
        )}

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
              <p>{payMethodLabel}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>UBA · 1030052894 · KINGZ EXCLUSIVE CONCEPTS</p>
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

            {sendError && (
              <p className="field-error" style={{ marginBottom: 12 }}>
                <FiAlertCircle size={11} /> {sendError}
              </p>
            )}

            <button
              className="btn-gold checkout__next-btn checkout__place-btn"
              onClick={handlePlace}
              disabled={sending}
            >
              <FiLock size={14} /> {sending ? 'Placing Order…' : 'Place Order'}
            </button>
            <button className="btn-outline-dark" onClick={() => setStep(1)} style={{ width: '100%', marginTop: 12 }} disabled={sending}>Back</button>
          </div>
        )}
      </div>

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