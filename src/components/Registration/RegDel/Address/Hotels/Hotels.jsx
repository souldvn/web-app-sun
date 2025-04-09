import React, { useState } from 'react';
import TopBar from '../../../../Complite/TopBar/TopBar';
import s from './Hotels.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeliveryContext } from '../../../../Contextes/RegContext';

const Hotels = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [isCustomActive, setIsCustomActive] = useState(false);
  const navigate = useNavigate();
  const { deliveryData, setDeliveryData } = useDeliveryContext();

  const location = useLocation();
  const { totalPrice, cartItems } = location.state || { totalPrice: 0, cartItems: [] };

  const flats = [
    'Шервуд', 'KayaSity', 'Sunshine', 'Solu Chalet', 'Azimuth House', 'Eco Shalet', 'Daut Resort', 'Турбаза Таулу', 'Leopard Hotel'
  ];

  const handleCheckboxChange = (index) => {
    setActiveIndex(index);
    setIsActive(true);
    setIsCustomActive(false);
    setCustomLocation('');
  };

  const handleCustomInputChange = (e) => {
    setCustomLocation(e.target.value);
    setIsCustomActive(true);
    setActiveIndex(null);
    setIsActive(true);
  };

  const handleApplyClick = () => {
    if (isCustomActive && customLocation) {
      setDeliveryData((prev) => ({ ...prev, flat: customLocation }));
      navigate('/regdel', { state: { flat: customLocation, totalPrice, cartItems } });
    } else if (activeIndex !== null) {
      setDeliveryData((prev) => ({ ...prev, flat: flats[activeIndex] }));
      navigate('/regdel', { state: { flat: flats[activeIndex], totalPrice, cartItems } });
    }
  };

  return (
    <div className={s.day}>
      <TopBar text="Доставка в дом" />
      <div className={s.timecontainer}>
        {/* Custom location input */}
        <div className={`${s.customInput} ${isCustomActive ? s.active : ''}`}>
          <input
            type="text"
            placeholder="Введите свой адрес доставки"
            value={customLocation}
            onChange={handleCustomInputChange}
            className={s.textInput}
          />
          <input
            type="checkbox"
            checked={isCustomActive}
            onChange={() => {}}
          />
        </div>

        {/* Existing hotel options */}
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
        <button 
          className={`${s.button} ${isActive ? s.buttonActive : ''}`} 
          onClick={handleApplyClick}
          disabled={!isActive || (isCustomActive && !customLocation.trim())}
        >
          <span style={{ color: isActive ? '#ffffff' : '#93949c' }}>Применить</span>
        </button>
      </div>
    </div>
  );
};

export default Hotels;