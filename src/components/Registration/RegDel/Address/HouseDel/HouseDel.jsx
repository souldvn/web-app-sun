import React, { useState } from 'react';
import TopBar from '../../../../Complite/TopBar/TopBar';
import s from './HouseDel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeliveryContext } from '../../../../Contextes/RegContext';

const HouseDel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { deliveryData, setDeliveryData } = useDeliveryContext();

  const location = useLocation();
  const { totalPrice, cartItems } = location.state || { totalPrice: 0, cartItems: [] }; // Получаем cartItems

    const flats = [
        'Дом Suite № 1', 'Дом Suite № 2', 'Дом Suite № 3', 'Дом Suite № 4', 'Дом Duplex № 5', 'Дом Duplex № 6', 'Дом Duplex № 7', 'Дом Duplex № 8', 'Дом Duplex № 9', 'Дом Duplex № 10', 'Сруб № 1', 'Сруб № 2', 'Баня по белому'
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
      <TopBar text="Доставка в дом" />
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

export default HouseDel;
