import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight
      );

      if (existingItem) {
        if (existingItem.count > 1) {
          return prevItems.map((cartItem) =>
            cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight
              ? { ...cartItem, count: cartItem.count - 1 }
              : cartItem
          );
        } else {
          return prevItems.filter(
            (cartItem) => !(cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight)
          );
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
