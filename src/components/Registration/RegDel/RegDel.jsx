import React from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegDel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeliveryContext } from '../../Contextes/RegContext';

const RegDel = () => {
  const { deliveryData } = useDeliveryContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || {};

  const { state } = useLocation();
  const { time } = state;

  const handleClick = (path) => {
    navigate(path, { state: { time, totalPrice } });

  };

  return (
    <div className={s.del}>
      <TopBar text="Оформление" />
      <div className={s.delform}>
        <input
          onClick={() => handleClick('/timedel')}
          className={s.input}
          type="text"
          placeholder="Выберите время"
          value={deliveryData.time || ''}
          readOnly
        />
        <input
          onClick={() => handleClick('/address')}
          className={s.input}
          type="text"
          placeholder="Выберите место доставки"
          value={deliveryData.flat || ''}
          readOnly
        />
        <input className={s.input} type="number" placeholder="Укажите количество гостей" />
        <input className={s.input} type="tel" placeholder="Номер телефона для связи" />
        <input className={s.input} type="text" placeholder="Комментарий к заказу" />
      </div>
      <div className={s.option}>
        <p>Самовывоз</p>
        <input type="checkbox" id="checkbox" />
      </div>
      <div className={s.price}>
        <p>Итоговая цена</p>
        <p>{totalPrice || 0} ₽</p> {/* Используем общую стоимость */}
      </div>
      <div className={s.result}>
        <p>{totalPrice || 0} ₽</p> {/* Используем общую стоимость */}
        <button className={s.pay}>Оплатить</button>
      </div>
    </div>
  );
};

export default RegDel;
