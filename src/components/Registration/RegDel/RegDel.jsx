import React, { useState, useEffect } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegDel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDeliveryContext } from '../../Contextes/RegContext';


const RegDel = () => {

  const { deliveryData } = useDeliveryContext();

  const location = useLocation();
  const { state } = location;
  const totalPrice = state?.totalPrice || 0;
  const time = state?.time || '';
  const cartItems = state?.cartItems || [];

  const navigate = useNavigate();

  // Инициализация из localStorage
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem('phoneNumberDel') || '';
  });
  const [guestCount, setGuestCount] = useState(() => {
    return localStorage.getItem('guestCountDel') || '';
  });
  const [comment, setComment] = useState(() => {
    return localStorage.getItem('commentDel') || '';
  });

  // Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem('phoneNumberDel', phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    localStorage.setItem('guestCountDel', guestCount);
  }, [guestCount]);

  useEffect(() => {
    localStorage.setItem('commentDel', comment);
  }, [comment]);

  const handlePayment = async () => {
    const idempotenceKey = uuidv4();
    const orderId = uuidv4();

    const cartItemsShort = cartItems.map((item) => ({
      text: item.text,
      count: item.count,
    }));

    try {
      const requestData = {
        orderId,
        totalPrice: Number(totalPrice),
        orderType: 'Самовывоз',

        comment: comment,
        phoneNumber,
        guestCount: Number(guestCount),
        orderTime: deliveryData.time,
        cartItems: cartItemsShort,
        flat: deliveryData.flat,
      };
      console.log(requestData); // Логирование данных перед отправкой

      const response = await fetch('https://sunvillrest.netlify.app/.netlify/functions/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': idempotenceKey,
        },
        body: JSON.stringify(requestData),
        mode: 'cors',
      });

      const data = await response.json();

      if (response.ok) {
        const confirmationUrl = data.confirmationUrl;
        window.location.href = confirmationUrl;
      } else {
        alert(`Ошибка: ${data.message}`);
      }
    } catch (error) {
      alert('Произошла ошибка при создании платежа. Попробуйте снова.');
    }
  };

  const handleClick = (path) => {
    navigate(path, { state: { time, totalPrice, cartItems } });
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
        <input
          className={s.input}
          type="number"
          placeholder="Укажите количество гостей"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
        <input
          className={s.input}
          type="tel"
          placeholder="Номер телефона для связи"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className={s.input}
          type="text"
          placeholder="Комментарий к заказу"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className={s.price}>
        <p>Итоговая цена</p>
        <p>{totalPrice || 0} ₽</p>
      </div>
      <div className={s.result}>
        <p>{totalPrice || 0} ₽</p>
        <button className={s.pay} onClick={handlePayment}>
          Оплатить
        </button>
      </div>
    </div>
  );
};

export default RegDel;
