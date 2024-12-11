import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [giftSelection, setGiftSelection] = useState({});
  const [syrupSelection, setSyrupSelection] = useState({});
  const [extraItems, setExtraItems] = useState([]);
  const [extraItemsTotalPrice, setExtraItemsTotalPrice] = useState(0);
  const [additionalProducts, setAdditionalProducts] = useState({});
  const [selectedOption, setSelectedOption] = useState('host');
  const [restrictedItems, setRestrictedItems] = useState(['Айран', 'Молоко', 'Кефир', 'Русский завтрак', 'Английский завтрак']);

  useEffect(() => {
    // Очищаем корзину при изменении режима доставки, если продукт входит в список ограниченных
    if (selectedOption === 'delivery') {
      setCartItems(prevItems =>
        prevItems.filter(item => !restrictedItems.includes(item.text))
      );
    }
  }, [selectedOption, restrictedItems]);

  const addExtraItems = (items, totalPrice) => {
    setExtraItems(items);
    setExtraItemsTotalPrice(totalPrice);
  };

  const setOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem('activeButton', option);
  };

  const addToCart = (item, gift = null) => {
    if (selectedOption === 'delivery' && restrictedItems.includes(item.text)) {
      return;
    }

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

        const newGiftSelection = { ...giftSelection };
        const newSyrupSelection = { ...syrupSelection };

        delete newGiftSelection[item.text];
        delete newSyrupSelection[item.text];

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
    setSyrupSelection({});
    setAdditionalProducts({});
    setExtraItems([]);
    setExtraItemsTotalPrice(0);
  };

  const addExtraItemsToDish = (item, selectedExtras) => {
    setCartItems((prevItems) => {
      return prevItems.map((cartItem) => {
        if (cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight) {
          const newExtras = [...(cartItem.extras || []), ...selectedExtras];
          return { ...cartItem, extras: newExtras };
        }
        return cartItem;
      });
    });
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

  const addAdditionalProduct = (item, additionalProduct) => {
    setCartItems((prevItems) => {
      return prevItems.map((cartItem) => {
        if (cartItem.price === item.price && cartItem.text === item.text && cartItem.weight === item.weight) {
          const newExtras = [...(cartItem.extras || []), additionalProduct];
          return { ...cartItem, extras: newExtras };
        }
        return cartItem;
      });
    });
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
        extraItems,
        extraItemsTotalPrice,
        setExtraItemsTotalPrice,
        addExtraItems,
        addExtraItemsToDish,
        additionalProducts,
        addAdditionalProduct,
        selectedOption,
        setOption,
        restrictedItems // Передаем список ограниченных товаров
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
