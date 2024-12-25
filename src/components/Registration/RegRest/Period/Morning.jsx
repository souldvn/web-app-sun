import React, { useState } from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './Morning.module.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




const Morning = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { totalPrice, cartItems } = location.state || { totalPrice: 0, cartItems: [] }; // Получаем cartItems

  const times = [
    '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00'
  ];
  const handleCheckboxChange = (index) => {
    setActiveIndex(index);
    setIsActive(index !== null);
  };

  const handleApplyClick = () => {
    if (isActive) {
      navigate('/regrest', { state: { time: times[activeIndex], totalPrice, cartItems } }); // Передаем cartItems
    }
  };
  

  return (
    <div className={s.day}>
      <TopBar text="Утро" />
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

export default Morning;
