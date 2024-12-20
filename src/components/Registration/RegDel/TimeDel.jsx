import React from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './TimeDel.module.css';
import next from '../../../assets/icons/next.svg'
import { useNavigate, useLocation } from 'react-router-dom';

const TimeDel = () => {
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
        <div className={s.time} onClick={() => handleClick('/daydel')}>
          <p>День</p>
          <img src={next} alt="next" />
        </div>
        <div className={s.time}  onClick={() => handleClick('/eveningdel')}>
          <p>Вечер</p>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default TimeDel;
