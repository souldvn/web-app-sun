import React, { useState } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './EveningDel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeliveryContext } from '../../Contextes/RegContext';

const EveningDel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { deliveryData, setDeliveryData } = useDeliveryContext();

    const location = useLocation();
    const { totalPrice, cartItems } = location.state || { totalPrice: 0, cartItems: [] }; // Получаем cartItems

  const times = [
    '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00'
  ];

  const handleCheckboxChange = (index) => {
    setActiveIndex(index);
    setIsActive(index !== null);
  };

  const handleApplyClick = () => {
    if (activeIndex !== null) {
      setDeliveryData((prev) => ({ ...prev, time: times[activeIndex] }));
      navigate('/regdel', { state: { time: times[activeIndex], totalPrice, cartItems } });
    }
  };

  return (
    <div className={s.day}>
      <TopBar text="Вечер" />
      <div className={s.timecontainer}>
        {times.map((time, index) => (
          <label
            key={index}
            className={`${s.time} ${activeIndex === index ? s.active : ''}`}
            onClick={() => handleCheckboxChange(index)}
          >
            <p>{time}</p>
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

export default EveningDel;
