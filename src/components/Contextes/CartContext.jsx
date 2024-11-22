import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [giftSelection, setGiftSelection] = useState({}); // Хранит выбранные подарки для блюд
  const [syrupSelection, setSyrupSelection] = useState({}); // Хранит данные о сиропах

  const addToCart = (item, gift = null) => {
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
        if (gift && (item.text === 'Русский завтрак' || item.text === 'Английский завтрак')) {
          setGiftSelection((prevGifts) => ({ ...prevGifts, [item.text]: gift }));
        }
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
            (cartItem) =>
              !(cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight)
          );
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setGiftSelection({});
    setSyrupSelection({}); // Очищаем также выбранные сиропы
  };

  const setSelectedGift = (gift, itemName) => {
    setGiftSelection((prevGifts) => ({
      ...prevGifts,
      [itemName]: gift,
    }));
  };

  const setSyrupForItem = (itemName, hasSyrup) => {
    setSyrupSelection((prevSyrups) => ({
      ...prevSyrups,
      [itemName]: hasSyrup,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        giftSelection,
        setSelectedGift,
        syrupSelection,
        setSyrupForItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
