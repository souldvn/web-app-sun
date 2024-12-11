import React from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RegRest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { time } = location.state || {};

  const handleClick = () => {
    navigate('/time');
  };

  return (
    <div className={s.rest}>
      <TopBar text="Оформление" />
      <div className={s.restform}>
        <input onClick={handleClick} className={s.input} type="text" placeholder='Выберите время' value={time || ''} readOnly />
        <input className={s.input} type="number" placeholder='Укажите количество гостей' />
        <input className={s.input} type="tel" placeholder='Номер телефона для связи' />
        <input className={s.input} type="text" placeholder='Комментарий к заказу' />
      </div>
      <div className={s.option}> 
        <p>Самовывоз</p>
        <input type="checkbox" id="checkbox" />
      </div>
      <div className={s.price}>
        <p>Итоговая цена</p>
        <p>750 ₽</p>
      </div>
      <div className={s.result}>
        <p>750 ₽</p>
        <button className={s.pay}>Оплатить</button>
      </div>
    </div>
  );
};

export default RegRest;
