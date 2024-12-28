import React, { createContext, useState, useContext } from 'react';

const DeliveryContext = createContext();

export const useDeliveryContext = () => useContext(DeliveryContext);

export const DeliveryProvider = ({ children }) => {
  const [deliveryData, setDeliveryData] = useState({
    time: null,
    flat: null,
    isPickup: false, // Добавляем состояние самовывоза
  });

  const togglePickup = () => {
    setDeliveryData((prev) => ({
      ...prev,
      isPickup: !prev.isPickup,
    }));
  };

  return (
    <DeliveryContext.Provider value={{ deliveryData, setDeliveryData, togglePickup }}>
      {children}
    </DeliveryContext.Provider>
  );
};
