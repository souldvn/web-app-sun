import React, { useState } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RegRest = () => {
  const location = useLocation();
  const { state } = location;
  const totalPrice = state?.totalPrice || 0;  // Проверяем наличие totalPrice
  const time = state?.time || '';
  const cartItems = state?.cartItems || []; // Получаем массив товаров



  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [comment, setComment] = useState('');

  const handlePayment = async () => {
    const idempotenceKey = uuidv4(); // Генерация уникального Idempotence Key
    const orderId = uuidv4(); // Генерация уникального номера заказа

    try {
      const requestData = {
        orderId,
        totalPrice: Number(totalPrice), // Убедитесь, что это число
        orderType: 'delivery',
        comment: comment || 'Комментарий к заказу',
        phoneNumber,
        guestCount: Number(guestCount), // Преобразуем в число
        orderTime: time,
              cartItems:[
                {text:item.text, count:item.count, price:item.price} 
              ]

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
        {/* Вывод списка товаров */}
    <div className={s.cartItems}>
      <h3>Ваш заказ:</h3>
      {cartItems.map((item, index) => (
        <div key={index} className={s.cartItem}>
          <p>{item.text} — {item.count} шт.</p>
        </div>
      ))}
    </div>
      <div className={s.restform}>
        <input
          onClick={() => handleClick('/time')}
          className={s.input}
          type="text"
          placeholder='Выберите время'
          value={time || ''} // Обновляем значение времени
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
