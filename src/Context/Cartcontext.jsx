import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const addToCart = useCallback(async (item) => {
        setIsLoading(true);
        try {
            const response = await fetch('/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (!response.ok) throw new Error('Failed to add item to cart');

            const result = await response.json();

            // Optimistically update local cart state
            setCartItems(prev => {
                // Check if same product+options combo exists
                const existingIdx = prev.findIndex(
                    c =>
                        c.productId === item.productId &&
                        c.size === item.size &&
                        c.sides === item.sides &&
                        c.lamination === item.lamination &&
                        c.delivery === item.delivery
                );
                if (existingIdx !== -1) {
                    const updated = [...prev];
                    updated[existingIdx] = {
                        ...updated[existingIdx],
                        quantity: updated[existingIdx].quantity + item.quantity,
                    };
                    return updated;
                }
                return [...prev, { ...item, _id: result.insertedId }];
            });

            showNotification(`"${item.title}" added to cart!`, 'success');
        } catch (err) {
            console.error(err);
            showNotification('Could not add to cart. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeFromCart = useCallback((cartItemId) => {
        setCartItems(prev => prev.filter(c => c._id !== cartItemId));
    }, []);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, isLoading, notification }}>
            {children}

            {/* ── Global Cart Toast ── */}
            <style>{`
        @keyframes slideInRight {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(110%); opacity: 0; }
        }
        .cart-toast {
          position: fixed; bottom: 28px; right: 24px; z-index: 99999;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px; border-radius: 16px; max-width: 340px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          animation: slideInRight 0.38s cubic-bezier(0.22,1,0.36,1) forwards;
          font-family: 'DM Sans', 'Segoe UI', sans-serif; font-size: 0.88rem; font-weight: 600;
        }
        .cart-toast.success { background: #1a1128; color: #fff; border-left: 4px solid #5A33B4; }
        .cart-toast.error   { background: #1a1128; color: #fff; border-left: 4px solid #ef4444; }
        .cart-toast-icon { font-size: 1.2rem; flex-shrink: 0; }
      `}</style>

            {notification && (
                <div className={`cart-toast ${notification.type}`} key={notification.message}>
                    <span className="cart-toast-icon">
                        {notification.type === 'success' ? '🛒' : '⚠️'}
                    </span>
                    {notification.message}
                </div>
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};