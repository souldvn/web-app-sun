import React, { createContext, useState, useContext } from 'react';

const DeliveryContext = createContext();

export const useDeliveryContext = () => useContext(DeliveryContext);

export const DeliveryProvider = ({ children }) => {
  const [deliveryData, setDeliveryData] = useState({
    time: null,
    flat: null,
  });

  return (
    <DeliveryContext.Provider value={{ deliveryData, setDeliveryData }}>
      {children}
    </DeliveryContext.Provider>
  );
};
