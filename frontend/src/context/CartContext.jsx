import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (medicine, quantity = 1) => {
    const existingItem = cartItems.find(item => item._id === medicine._id);

    if (existingItem) {
      if (existingItem.quantity + quantity > medicine.stock) {
        toast.error('Cannot add more than available stock');
        return;
      }
      setCartItems(cartItems.map(item =>
        item._id === medicine._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      toast.success('Cart updated');
    } else {
      if (quantity > medicine.stock) {
        toast.error('Cannot add more than available stock');
        return;
      }
      setCartItems([...cartItems, { ...medicine, quantity }]);
      toast.success('Added to cart');
    }
  };

  const removeFromCart = (medicineId) => {
    setCartItems(cartItems.filter(item => item._id !== medicineId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (medicineId, quantity) => {
    if (quantity < 1) return;
    
    const item = cartItems.find(item => item._id === medicineId);
    if (quantity > item.stock) {
      toast.error('Cannot add more than available stock');
      return;
    }

    setCartItems(cartItems.map(item =>
      item._id === medicineId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};