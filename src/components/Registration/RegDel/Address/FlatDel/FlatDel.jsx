import React, { useState } from 'react';
import TopBar from '../../../../Complite/TopBar/TopBar';
import s from './FlatDel.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeliveryContext } from '../../../../Contextes/RegContext';

const FlatDel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { deliveryData, setDeliveryData } = useDeliveryContext();

  const location = useLocation();
  const { totalPrice, cartItems } = location.state || { totalPrice: 0, cartItems: [] }; // Получаем cartItems

  const flats = [
    'Deluxe № 1', 'Deluxe № 2', 'Deluxe № 3', 'Deluxe № 4', 'Deluxe № 5',  'Deluxe № 6', 'Standard № 7', 'Standard № 8', 'Standard № 9', 'Standard № 10', 'Standard № 11'
  ];

  const handleCheckboxChange = (index) => {
    setActiveIndex(index);
    setIsActive(index !== null);
  };

  const handleApplyClick = () => {
    if (activeIndex !== null) {
      setDeliveryData((prev) => ({ ...prev, flat: flats[activeIndex] }));
      navigate('/regdel', { state: { flat: flats[activeIndex], totalPrice, cartItems } });
    }
  };

  return (
    <div className={s.day}>
      <TopBar text="Доставка в номер" />
      <div className={s.timecontainer}>
        {flats.map((flat, index) => (
          <label
            key={index}
            className={`${s.time} ${activeIndex === index ? s.active : ''}`}
            onClick={() => handleCheckboxChange(index)}
          >
            <p>{flat}</p>
            <input
              type="checkbox"
              checked={activeIndex === index}
              onChange={() => handleCheckboxChange(index)}
            />
          </label>
        ))}
      </div>
      <div className={s.buttonarea}>
        <button className={`${s.button} ${isActive ? s.buttonActive : ''}`} onClick={handleApplyClick}>
          <span style={{ color: isActive ? '#ffffff' : '#93949c' }}>Применить</span>
        </button>
      </div>
    </div>
  );
};

export default FlatDel;
