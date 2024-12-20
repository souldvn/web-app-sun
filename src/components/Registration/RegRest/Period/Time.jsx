import React from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './Time.module.css';
import next from '../../../../assets/icons/next.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const Time = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 }; // Получаем totalPrice
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { state: { totalPrice } }); // Передаем totalPrice дальше
  };

  return (
    <div className={s.day}>
      <TopBar text="Время бронирования" />
      <div className={s.timecontainer}>
        <div className={s.time} onClick={() => handleClick('/morning')}>
          <p>Утро</p>
          <img src={next} alt="next" />
        </div>
        <div className={s.time} onClick={() => handleClick('/day')}>
          <p>День</p>
          <img src={next} alt="next" />
        </div>
        <div className={s.time} onClick={() => handleClick('/evening')}>
          <p>Вечер</p>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default Time;
