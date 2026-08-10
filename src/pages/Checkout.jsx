import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiChevronDown, FiChevronUp, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';
import './Checkout.css';

/* ─────────────────────────────────────────────────────────
   EmailJS credentials
   EJS_SERVICE      — same service for both emails
   EJS_TEMPLATE_BIZ — template sent TO King-X (order alert)
   EJS_TEMPLATE_CUS — template sent TO the customer (confirmation)
   EJS_PUBLIC       — your public key
───────────────────────────────────────────────────────── */
const EJS_SERVICE      = 'service_3yrp4ut';
const EJS_TEMPLATE_BIZ = 'template_92xxf3a';   // ← your existing template (notify King-X)
const EJS_TEMPLATE_CUS = 'template_CUSTOMER';  // ← new template (confirm to customer)
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

/* ─────────────────────────────────────────────────────────
   Field — outside Checkout to prevent remount on re-render
   (fixes mobile keyboard losing focus on every keystroke)
───────────────────────────────────────────────────────── */
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

/* ───────────────────────────────────────────────────────── */

export default function Checkout() {
  const navigate                    = useNavigate();
  const { items, total, clearCart } = useCart();

  const [step,        setStep]        = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [touched,     setTouched]     = useState({});
  const [sending,     setSending]     = useState(false);
  const [sendError,   setSendError]   = useState('');

  const [form, setForm] = useState({
    firstName : '',
    lastName  : '',
    email     : '',
    phone     : '',
    address   : '',
    city      : '',
    state     : '',
  });

  const shipping   = total >= 30000 ? 0 : 3000;
  const grandTotal = total + shipping;
  const fmt        = (n) => `NGN ${n.toLocaleString()}`;

  /* ── validation ── */
  const errors = useMemo(() => {
    const e = {};
    if (!form.firstName.trim())  e.firstName = 'First name is required';
    if (!form.lastName.trim())   e.lastName  = 'Last name is required';
    if (!form.email.trim())      e.email     = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                 e.email     = 'Enter a valid email address';
    if (!form.phone.trim())      e.phone     = 'Phone number is required';
    else if (!/^[+\d\s\-()\\.]{7,}$/.test(form.phone))
                                 e.phone     = 'Enter a valid phone number';
    if (!form.address.trim())    e.address   = 'Address is required';
    if (!form.city.trim())       e.city      = 'City is required';
    if (!form.state.trim())      e.state     = 'State is required';
    return e;
  }, [form]);

  const deliveryValid = Object.keys(errors).length === 0;

  /* ── handlers ── */
  const handleChange = (key) => (e) => {
    setForm((prev)    => ({ ...prev, [key]: e.target.value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleBlur = (key) => () =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const touchAll = () => {
    const all = {};
    FIELDS.forEach((f) => { all[f.key] = true; });
    setTouched(all);
  };

  const handleNext = () => {
    if (step === 0 && !deliveryValid) { touchAll(); return; }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  /* ── place order: send both emails ── */
  const handlePlace = async () => {
    setSendError('');
    setSending(true);

    const orderId    = `KX-${Date.now()}`;
    const orderLines = items
      .map((i) => `${i.name} | Size: ${i.size} | Qty: ${i.qty} | NGN ${(i.price * i.qty).toLocaleString()}`)
      .join(' || ');

    /* shared params used in both templates */
    const sharedParams = {
      order_id         : orderId,
      customer_name    : `${form.firstName} ${form.lastName}`,
      customer_email   : form.email,
      customer_phone   : form.phone,
      delivery_address : `${form.address}, ${form.city}, ${form.state}`,
      payment_method   : 'Bank Transfer',
      order_items      : orderLines,
      subtotal         : `NGN ${total.toLocaleString()}`,
      shipping_fee     : shipping === 0 ? 'Free' : `NGN ${shipping.toLocaleString()}`,
      grand_total      : `NGN ${grandTotal.toLocaleString()}`,
      order_date       : new Date().toLocaleString('en-NG', {
                           dateStyle: 'medium',
                           timeStyle: 'short',
                         }),
    };

    /*
      bizParams  → sent to King-X inbox
      "to_email" must match the "To Email" field in your
       EJS_TEMPLATE_BIZ template on emailjs.com
    */
    const bizParams = {
      ...sharedParams,
      to_email : 'kingzexclusiveconcept@gmail.com',  // ← King-X receives this
      to_name  : 'King-X Team',
    };

    /*
      cusParams  → sent to the customer
      "to_email" must match the "To Email" field in your
       EJS_TEMPLATE_CUS template on emailjs.com
    */
    const cusParams = {
      ...sharedParams,
      to_email : form.email,            // ← customer receives this
      to_name  : `${form.firstName} ${form.lastName}`,
    };

    try {
      /* fire both emails in parallel */
      await Promise.all([
        emailjs.send(EJS_SERVICE, EJS_TEMPLATE_BIZ, bizParams, { publicKey: EJS_PUBLIC }),
        emailjs.send(EJS_SERVICE, EJS_TEMPLATE_CUS, cusParams, { publicKey: EJS_PUBLIC }),
      ]);
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      console.error('EmailJS error:', err.status, err.text);
      setSendError('Could not send your order. Please try again or reach us on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  /* ── helpers ── */
  const rowKeys    = (rowNum) => FIELDS.filter((f) => f.row === rowNum).map((f) => f.key);
  const fieldProps = { fields: FIELDS, form, touched, errors, onChange: handleChange, onBlur: handleBlur };

  return (
    <div className="checkout page-enter">

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div className="checkout__left">

        <div className="checkout__brand">KELLOX</div>

        {/* Steps */}
        <div className="checkout__steps">
          {STEPS.map((s, i) => (
            <button
              key={s}
              className={[
                'checkout__step',
                i === step ? 'checkout__step--active' : '',
                i < step   ? 'checkout__step--done'   : '',
              ].join(' ')}
              onClick={() => i < step && setStep(i)}
            >
              <span className="checkout__step-num">
                {i < step ? '✓' : i + 1}
              </span>
              {s}
            </button>
          ))}
        </div>

        {/* Mobile summary toggle */}
        <button
          className="checkout__summary-toggle"
          onClick={() => setSummaryOpen((o) => !o)}
        >
          <span>Order Summary ({items.length} item{items.length !== 1 ? 's' : ''})</span>
          <span className="checkout__summary-toggle-right">
            {fmt(grandTotal)}
            {summaryOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </span>
        </button>

        {summaryOpen && (
          <div className="checkout__mobile-summary">
            {items.map((item) => (
              <div key={item.key} className="checkout__mini-item">
                <img src={item.image} alt={item.name} className="checkout__mini-img" />
                <div className="checkout__mini-info">
                  <span>{item.name}</span>
                  <span className="checkout__mini-sub">Size {item.size} × {item.qty}</span>
                </div>
                <span>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        )}

        {/* ─── STEP 0: Delivery ─── */}
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

            <button
              className={`btn-gold checkout__next-btn ${!deliveryValid ? 'checkout__next-btn--disabled' : ''}`}
              onClick={handleNext}
            >
              Continue to Payment
            </button>

            {!deliveryValid && Object.keys(touched).length > 0 && (
              <p className="checkout__form-hint">
                <FiAlertCircle size={13} />
                Please fill in all required fields above.
              </p>
            )}
          </div>
        )}

        {/* ─── STEP 1: Payment ─── */}
        {step === 1 && (
          <div className="checkout__form">
            <h2>Payment Method</h2>

            <div className="pay-method pay-method--active">
              <span className="pay-method__radio pay-method__radio--checked" />
              <div className="pay-method__label">
                <span className="pay-method__name">Bank Transfer</span>
                <span className="pay-method__sub">Transfer directly to our account</span>
              </div>
            </div>

            <div className="transfer-info">
              <div className="transfer-info__row">
                <span>Bank</span>
                <strong>United Bank of Africa</strong>
              </div>
              <div className="transfer-info__row">
                <span>Account Name</span>
                <strong>KINGZ EXCLUSIVE CONCEPTS</strong>
              </div>
              <div className="transfer-info__row">
                <span>Account Number</span>
                <strong className="transfer-info__acct">1030052894</strong>
              </div>
              <div className="transfer-info__row">
                <span>Amount to Transfer</span>
                <strong className="transfer-info__amount">{fmt(grandTotal)}</strong>
              </div>
              <p className="transfer-note">
                Transfer the exact amount above, then click "Review Order".
                Send proof of payment via WhatsApp.
              </p>
            </div>

            <div className="checkout__nav-btns">
              <button className="btn-outline-dark" onClick={() => setStep(0)}>Back</button>
              <button className="btn-gold checkout__next-btn" onClick={handleNext}>
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Review ─── */}
        {step === 2 && (
          <div className="checkout__form">
            <h2>Review Order</h2>

            <div className="review-block">
              <div className="review-block__header">
                <span>Delivery</span>
                <button className="review-edit" onClick={() => setStep(0)}>Edit</button>
              </div>
              <p className="review-block__line"><strong>{form.firstName} {form.lastName}</strong></p>
              <p className="review-block__line">{form.address}, {form.city}, {form.state}</p>
              <p className="review-block__line">{form.email}</p>
              <p className="review-block__line">{form.phone}</p>
            </div>

            <div className="review-block">
              <div className="review-block__header">
                <span>Payment</span>
                <button className="review-edit" onClick={() => setStep(1)}>Edit</button>
              </div>
              <p className="review-block__line">Bank Transfer</p>
              <p className="review-block__line review-block__line--muted">
                United Bank of Africa · 1030052894
              </p>
            </div>

            <div className="checkout__totals">
              <div className="checkout__total-row">
                <span>Subtotal</span><span>{fmt(total)}</span>
              </div>
              <div className="checkout__total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
              </div>
              {shipping === 0 && (
                <p className="checkout__free-note">
                  <FiCheckCircle size={12} />
                  Free shipping on orders over NGN 30,000
                </p>
              )}
              <div className="checkout__total-row checkout__total-row--grand">
                <span>Total</span><span>{fmt(grandTotal)}</span>
              </div>
            </div>

            {sendError && (
              <div className="checkout__send-error">
                <FiAlertCircle size={14} /> {sendError}
              </div>
            )}

            <button
              className={`btn-gold checkout__next-btn checkout__place-btn ${sending ? 'checkout__place-btn--sending' : ''}`}
              onClick={handlePlace}
              disabled={sending}
            >
              {sending ? (
                <><span className="checkout__spinner" /> Sending Order…</>
              ) : (
                <><FiLock size={14} /> Place Order</>
              )}
            </button>

            <button
              className="btn-outline-dark checkout__back-btn"
              onClick={() => setStep(1)}
              disabled={sending}
            >
              Back
            </button>
          </div>
        )}
      </div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div className="checkout__right">
        <h3>Order Summary</h3>
        <div className="checkout__items">
          {items.map((item) => (
            <div key={item.key} className="checkout__item">
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={item.image} alt={item.name} className="checkout__item-img" />
                <span className="checkout__item-qty">{item.qty}</span>
              </div>
              <div className="checkout__item-info">
                <span className="checkout__item-name">{item.name}</span>
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
