import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [giftSelection, setGiftSelection] = useState({}); // Хранит выбранные подарки для блюд
  const [syrupSelection, setSyrupSelection] = useState({}); // Хранит данные о сиропах

  const addToCart = (item, gift = null) => {
    console.log('Adding to cart', item, gift); // Add log here to check the arguments
  
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
        if (item.text === 'Капучино') {
          setSyrupSelection((prevSyrups) => {
            console.log('Updating syrup selection:', { ...prevSyrups, [item.text]: true }); // Add log here
            return { ...prevSyrups, [item.text]: true };
          });
        }
  
        if (gift && (item.text === 'Русский завтрак' || item.text === 'Английский завтрак')) {
          setGiftSelection((prevGifts) => {
            console.log('Updating gift selection:', { ...prevGifts, [item.text]: gift }); // Add log here
            return { ...prevGifts, [item.text]: gift };
          });
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
        // Удаляем товар из корзины
        const updatedItems = existingItem.count > 1
          ? prevItems.map((cartItem) =>
              cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight
                ? { ...cartItem, count: cartItem.count - 1 }
                : cartItem
            )
          : prevItems.filter(
              (cartItem) =>
                !(cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight)
            );
        
        // Сбрасываем выбранный подарок и сироп для этого товара
        const newGiftSelection = { ...giftSelection };
        const newSyrupSelection = { ...syrupSelection };
  
        delete newGiftSelection[item.text]; // Удаляем подарок для этого товара
        delete newSyrupSelection[item.text]; // Удаляем сироп для этого товара
  
        setGiftSelection(newGiftSelection);
        setSyrupSelection(newSyrupSelection);
  
        return updatedItems;
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
