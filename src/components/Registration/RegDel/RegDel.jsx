import React, { useState, useEffect } from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegDel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDeliveryContext } from '../../Contextes/RegContext';
import infored from '../../../assets/icons/infored.svg';

const DELIVERY_LOCATIONS = [
  'Deluxe № 1', 'Deluxe № 2', 'Deluxe № 3', 'Deluxe № 4', 'Deluxe № 5',
  'Standard № 7', 'Standard № 8', 'Standard № 9', 'Standard № 10', 'Standard № 11',
  'Дом Suite № 1', 'Дом Suite № 2', 'Дом Suite № 3', 'Дом Suite № 4',
  'Дом Duplex № 5', 'Дом Duplex № 6', 'Дом Duplex № 7', 'Дом Duplex № 8', 'Дом Duplex № 9', 'Дом Duplex № 10',
  'Сруб № 1', 'Сруб № 2', 'Баня по белому', 'Турбаза Таулу', 'Solu Chalet', 'Шервуд', 'Azimuth House', 'Eco Shalet'
];

const HIGH_MINIMUM_LOCATIONS = [
  'Daut Resort', 'Leopard Hotel', 'La Vida', 'Горная Жемчужина', 'Гостевой дом Шишка'
];

const DELIVERY_COST = 700;
const MINIMUM_ORDER_STANDARD = 1500;
const MINIMUM_ORDER_HIGH = 3500;

const RegDel = ({ chatId }) => {
  const { deliveryData, setDeliveryData } = useDeliveryContext();

  const location = useLocation();
  const { state } = location;
  const totalPrice = state?.totalPrice || 0;
  const cartItems = state?.cartItems || [];

  const navigate = useNavigate();

  // State initialization
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('phoneNumberDel') || '');
  const [guestCount, setGuestCount] = useState(() => localStorage.getItem('guestCountDel') || '');
  const [comment, setComment] = useState(() => localStorage.getItem('commentDel') || '');

  const [deliveryCost, setDeliveryCost] = useState(DELIVERY_COST);
  const [minimumOrderError, setMinimumOrderError] = useState(false);

  // Sync deliveryData.flat with localStorage
  useEffect(() => {
    const savedFlat = localStorage.getItem('flatDel');
    if (savedFlat && setDeliveryData) {
      setDeliveryData((prev) => ({ ...prev, flat: savedFlat }));
    }
  }, [setDeliveryData]);

  useEffect(() => {
    if (!deliveryData.flat) return;

    const isStandardLocation = DELIVERY_LOCATIONS.includes(deliveryData.flat);
    const isHighMinimumLocation = HIGH_MINIMUM_LOCATIONS.includes(deliveryData.flat);

    if (isStandardLocation || isHighMinimumLocation) {
      setDeliveryCost(DELIVERY_COST);
    } else {
      setDeliveryCost(0);
    }

    const minimumOrder = isHighMinimumLocation ? MINIMUM_ORDER_HIGH : MINIMUM_ORDER_STANDARD;
    setMinimumOrderError(totalPrice < minimumOrder);
  }, [deliveryData.flat, totalPrice]);

  const [phoneError, setPhoneError] = useState(false);
  const [guestCountError, setGuestCountError] = useState(false);
  const [flatError, setFlatError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validation logic
  const handleValidation = () => {
    const phoneValid = phoneNumber && /^\+?\d{10,15}$/.test(phoneNumber);
    const guestCountValid = guestCount && guestCount > 0;
    const flatValid = deliveryData.flat && deliveryData.flat.trim() !== '';
    const timeValid = deliveryData.time && deliveryData.time.trim() !== '';

    setPhoneError(!phoneValid);
    setGuestCountError(!guestCountValid);
    setFlatError(!flatValid);
    setIsValid(phoneValid && guestCountValid && flatValid && timeValid && !minimumOrderError);
  };

  useEffect(() => {
    handleValidation();
  }, [phoneNumber, guestCount, deliveryData.flat, deliveryData.time, minimumOrderError]);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('phoneNumberDel', phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    localStorage.setItem('guestCountDel', guestCount);
  }, [guestCount]);

  useEffect(() => {
    localStorage.setItem('commentDel', comment);
  }, [comment]);

  useEffect(() => {
    if (deliveryData.flat) {
      localStorage.setItem('flatDel', deliveryData.flat);
    }
  }, [deliveryData.flat]);

  const handlePayment = async () => {
    const idempotenceKey = uuidv4();
    const orderId = uuidv4();

    const cartItemsShort = cartItems.map((item) => ({
      text: item.text,
      count: item.count,
    }));

    const requestData = {
      orderId,
      totalPrice: Number(totalPrice + deliveryCost),
      orderType: 'Самовывоз',
      telegramChatId: chatId,
      comment,
      phoneNumber,
      guestCount: Number(guestCount),
      orderTime: deliveryData.time,
      cartItems: cartItemsShort,
      flat: deliveryData.flat,
    };

    console.log('Request Data:', requestData);

    try {
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
        window.location.href = data.confirmationUrl;
      } else {
        alert(`Ошибка: ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      alert('Произошла ошибка при создании платежа. Попробуйте снова.');
    }
  };

  const handleClick = (path) => {
    navigate(path, { state: { time: deliveryData.time, flat: deliveryData.flat, totalPrice, cartItems } });
  };

  return (
    <div className={s.del}>
      <TopBar text="Оформление" />
      <div className={s.chatId}>
      </div>
      <div className={s.delform}>
        <input
          onClick={() => handleClick('/timedel')}
          className={`${s.input} ${deliveryData.time ? '' : s.errorInput}`}
          type="text"
          placeholder="Выберите время"
          value={deliveryData.time || ''}
          readOnly
        />
        <input
  className={`${s.input} ${flatError ? s.errorInput : ''}`}
  type="text"
  onClick={() => handleClick('/address')}

  placeholder="Выберите место доставки"
  value={deliveryData.flat || ''}
  onChange={(e) =>
    setDeliveryData((prev) => ({ ...prev, flat: e.target.value }))
  }
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
        {minimumOrderError && (
          <div className={s.errorText}>
            <img src={infored} alt="info" />
            <p className={s.warninginfo}>Минимальная сумма доставки {DELIVERY_LOCATIONS.includes(deliveryData.flat) ? MINIMUM_ORDER_STANDARD : MINIMUM_ORDER_HIGH} ₽ Дополните заказ дляя продолжения</p>
          </div>
        )}
      </div>

      <div className={s.price}>
        <p>Итоговая цена</p>
        <p>{totalPrice + deliveryCost} ₽</p>
      </div>

      <div className={s.pricing}>
        <div className={s.order}>
          <p>Заказ</p>
          <p>{totalPrice} ₽</p>
        </div>
        <div className={s.delivery}>
          <p>Доставка</p>
          <p>{deliveryCost} ₽</p>
        </div>
      </div>

      <div className={s.result}>
        <p>{totalPrice + deliveryCost} ₽</p>
        <button
  className={isValid ? s.payValid : s.pay}
  onClick={handlePayment}
  disabled={!isValid}
>
  Оплатить
</button>


      </div>
    </div>
  );
};

export default RegDel;
