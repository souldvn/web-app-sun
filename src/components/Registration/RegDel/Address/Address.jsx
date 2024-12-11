import React from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './Address.module.css';
import next from '../../../../assets/icons/next.svg';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={s.day}>
      <TopBar text="Адрес доставки" />
      <div className={s.timecontainer}>
        <div className={s.time} onClick={() => handleClick('/SunVill')}>
          <p>Sun Village Arkhyz</p>
          <img src={next} alt="next"  />
        </div>
        <div className={s.time} onClick={() => handleClick('/hotels')}>
          <p>Отели с доставкой</p>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default Address;
