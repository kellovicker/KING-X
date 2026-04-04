import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const fmt = (n) => `₦${n.toLocaleString()}`;

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'drawer-overlay--open' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <div>
            <span className="section-tag">Your Cart</span>
            {count > 0 && <span className="cart-drawer__count">{count} item{count !== 1 ? 's' : ''}</span>}
          </div>
          <button onClick={() => setIsOpen(false)} className="cart-drawer__close"><FiX size={20} /></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty.</p>
            <button className="btn-gold" onClick={() => setIsOpen(false)}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map(item => (
                <div key={item.key} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__meta">Size: {item.size} · {item.category}</div>
                    <div className="cart-item__price">{fmt(item.price)}</div>
                    <div className="cart-item__actions">
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.key, item.qty - 1)}><FiMinus size={12} /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)}><FiPlus size={12} /></button>
                      </div>
                      <button className="cart-item__remove" onClick={() => removeItem(item.key)}><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <span className="cart-drawer__total-amount">{fmt(total)}</span>
              </div>
              <p className="cart-drawer__note">Shipping calculated at checkout</p>
              <Link to="/checkout" className="btn-gold cart-drawer__checkout" onClick={() => setIsOpen(false)}>
                Proceed to Checkout
              </Link>
              <button className="cart-drawer__continue" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
