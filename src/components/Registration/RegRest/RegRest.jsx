import React, { useState, useEffect, useContext } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TimeContext } from '../../Contextes/TimeContext';

const RegRest = ({ chatId }) => {
  useEffect(() => {

    localStorage.removeItem('guestCount');
  }, []);

  const location = useLocation();
  const { state } = location;
  const totalPrice = state?.totalPrice || 0;
  const time = state?.time || '';
  const cartItems = state?.cartItems || [];

  const navigate = useNavigate();
  const moscowTime = useContext(TimeContext); 

  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem('phoneNumber') || '';
  });
  const [guestCount, setGuestCount] = useState(() => {
    return localStorage.getItem('guestCount') || '';
  });
  const [comment, setComment] = useState(() => {
    return localStorage.getItem('comment') || '';
  });
  const [isPickup, setIsPickup] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const [phoneError, setPhoneError] = useState(false);
  const [guestCountError, setGuestCountError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleValidation = () => {
    const phoneValid = phoneNumber && /^\+?\d{10,15}$/.test(phoneNumber);
    const guestCountValid = guestCount && guestCount > 0;

    setPhoneError(!phoneValid);
    setGuestCountError(!guestCountValid);

    // Убедитесь, что все поля валидны
    setIsValid(
      phoneValid &&
      guestCountValid &&
      time &&
      !isTimeRestricted() &&
      isPolicyAccepted
    );
  };

  const isTimeRestricted = () => {
    const currentHour = moscowTime.getHours();
    return currentHour >= 22 || currentHour < 9;
  };

  useEffect(() => {
    handleValidation();
  }, [phoneNumber, guestCount, time, moscowTime, isPolicyAccepted]);

  useEffect(() => {
    localStorage.setItem('phoneNumber', phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    localStorage.setItem('guestCount', guestCount);
  }, [guestCount]);

  useEffect(() => {
    localStorage.setItem('comment', comment);
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
        orderType: 'В ресторане',
        comment: comment || 'Комментарий к заказу',
        phoneNumber,
        guestCount: Number(guestCount),
        orderTime: time,
        cartItems: cartItemsShort,
        flat: isPickup ? 'Самовывоз из ресторана' : 'В ресторане',
        telegramChatId: chatId,
      };

      const response = await fetch(
        'https://sunvillrest.netlify.app/.netlify/functions/payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': idempotenceKey,
          },
          body: JSON.stringify(requestData),
          mode: 'cors',
        }
      );

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
    <div className={s.rest}>
      <TopBar text="Оформление в ресторане" />
      <div className={s.chatId} />
      <div className={s.restform}>
        <input
          onClick={() => handleClick('/time')}
          className={`${s.input} ${time ? '' : s.errorInput}`}
          type="text"
          placeholder="Выберите время"
          value={time || ''}
          readOnly
        />
        <input
          className={`${s.input} ${guestCountError ? s.errorInput : ''}`}
          type="number"
          placeholder="Укажите количество гостей"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
        <input
          className={`${s.input} ${phoneError ? s.errorInput : ''}`}
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
      <div className={s.option}>
        <p>Самовывоз</p>
        <input
          type="checkbox"
          id="checkbox"
          checked={isPickup}
          onChange={(e) => setIsPickup(e.target.checked)}
        />
      </div>
      <div className={s.price}>
        <p>Итоговая цена</p>
        <p>{totalPrice || 0} ₽</p>
      </div>
      <div className={s.policy}>
        <input
          className={s.checkbox}
          type="checkbox"
          id="checkbox_policy"
          checked={isPolicyAccepted}
          onChange={(e) => setIsPolicyAccepted(e.target.checked)}
        />
        <p className={s.linkpolicy}>
          Я даю согласие на{' '}
          <a onClick={() => handleClick('/policy')} className={s.link}>
            обработку персональных данных
          </a>
        </p>
      </div>
      <div className={s.remark}>
        <p className={s.remarktext}>
          Уважаемые гости! Пожалуйста, обращайте внимание на время приготовления,
          указанное на карточках блюд. Учитывайте его при бронировании столика
          или заказе доставки.
        </p>
      </div>
      <div className={s.result}>
        <p>{totalPrice || 0} ₽</p>
        <button
          className={isValid ? s.payValid : s.pay}
          onClick={handlePayment}
          disabled={!isValid || isTimeRestricted()}
        >
          {isTimeRestricted() ? 'Оплата недоступна в это время' : 'Оплатить'}
        </button>
      </div>
    </div>
  );
};

export default RegRest;
