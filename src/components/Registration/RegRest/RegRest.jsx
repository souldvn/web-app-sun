import React, { useState } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RegRest = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { time } = state;
  const totalPrice = state.totalPrice;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [comment, setComment] = useState('');

  const handlePayment = async () => {
    const idempotenceKey = uuidv4(); // Генерация уникального Idempotence Key
   

    
    try {
      const requestData = {
        totalPrice,
        orderType: 'delivery', // Тип заказа
        comment: comment || 'Комментарий к заказу', // Комментарий
        phoneNumber, // Номер телефона
        guestCount, // Количество гостей
        orderTime: time, // Время
      };

      const response = await fetch('https://sunvillrest.netlify.app/.netlify/functions/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': idempotenceKey, // Передаем ключ идемпотентности
        },
        body: JSON.stringify(requestData), // Передаем все необходимые данные
        mode: 'cors',
      });

      const data = await response.json();

      if (response.ok) {
        const confirmationUrl = data.confirmationUrl;
        window.location.href = confirmationUrl; // Перенаправляем на страницу оплаты Юкассы
      } else {
        alert(`Ошибка: ${data.message}`);
      }
    } catch (error) {
      alert('Произошла ошибка при создании платежа. Попробуйте снова.');
    }
  };

  const handleClick = (path) => {
    navigate(path, { state: { time, totalPrice } });
  };

  return (
    <div className={s.rest}>
      <TopBar text="Оформление" />
      <div className={s.restform}>
        <input
          onClick={() => handleClick('/time')}
          className={s.input}
          type="text"
          placeholder='Выберите время'
          value={time || ''}
          readOnly
        />
        <input
          className={s.input}
          type="number"
          placeholder='Укажите количество гостей'
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
        <input
          className={s.input}
          type="tel"
          placeholder='Номер телефона для связи'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className={s.input}
          type="text"
          placeholder='Комментарий к заказу'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
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
        <button className={s.pay} onClick={handlePayment}>Оплатить</button>
      </div>
    </div>
  );
};

export default RegRest;
