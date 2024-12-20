import React from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';


const RegRest = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { time } = state;
    const totalPrice = state.totalPrice;
  

  const handleClick = (path) => {
    navigate(path, { state: { time, totalPrice } });

  };

  return (
    <div className={s.rest}>
      <TopBar text="Оформление" />
      <div className={s.restform}>
        <input onClick={() => handleClick('/time')} className={s.input} type="text" placeholder='Выберите время' value={time || ''} readOnly />
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
        <p>{totalPrice || 0} ₽</p>
      </div>
      <div className={s.result}>
        <p>{totalPrice || 0} ₽</p>
        <button className={s.pay}>Оплатить</button>
      </div>
    </div>
  );
};

export default RegRest;
