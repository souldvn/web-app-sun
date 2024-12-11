import React, { useState } from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './Day.module.css';
import { useNavigate } from 'react-router-dom';

const Day = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const times = [
    '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30',
    '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15',
    '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00',
  ];

  const handleCheckboxChange = (index) => {
    setActiveIndex(index);
    setIsActive(index !== null);
  };

  const handleApplyClick = () => {
    if (isActive) {
      navigate('/regrest', { state: { time: times[activeIndex] } });
    }
  };

  return (
    <div className={s.day}>
      <TopBar text="День" />
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

export default Day;
