import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restrictedItems, setRestrictedItems] = useState([
    'Айран', 'Молоко', 'Кефир', 'Русский завтрак', 'Английский завтрак',
    'Шакшука с гренкой', 'Яичница глазунья из двух яиц', 'Яйцо отварное',
    'Сэндвич с сёмгой', 'Сэндвич с курицей', 'Сэндвич с ветчиной', 'Каша в ассортименте'
  ]);
  const [selectedOption, setSelectedOption] = useState('host');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.count), 0);
  };

  useEffect(() => {
    if (selectedOption === 'delivery') {
      setCartItems((prevItems) =>
        prevItems.filter((item) => !restrictedItems.includes(item.text))
      );
    }
  }, [selectedOption, restrictedItems]);

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
        if (item.text === 'Капучино') {
          setSyrupSelection((prevSyrups) => {
            return { ...prevSyrups, [item.text]: true };
          });
        }

        if (gift && (item.text === 'Русский завтрак' || item.text === 'Английский завтрак')) {
          setGiftSelection((prevGifts) => {
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

        return updatedItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const setOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem('activeButton', option);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        selectedOption,
        setOption,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
