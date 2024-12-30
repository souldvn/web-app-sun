import React, { useContext, useEffect, useMemo, useState } from 'react';
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';

const CardPrice = ({ price, text, weight, img, onDisableStatusChange }) => {
  const { cartItems, addToCart, removeFromCart, selectedOption } = useContext(CartContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  const itemCount = item ? item.count : 0;

  // Функция получения текущего часа по московскому времени
  const getMoscowHour = () => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const moscowHour = (utcHour + 3) % 24; // UTC+3 для Москвы
    return moscowHour;
  };

  // Функция проверки доступности кнопки
  const checkButtonStatus = () => {
    const currentHour = getMoscowHour();

    const isRestaurantClosed =
      selectedOption === 'host' && (currentHour >= 21 || currentHour < 9);

    const isDeliveryUnavailable =
      selectedOption === 'delivery' &&
      !(currentHour >= 9 && currentHour < 15 || currentHour >= 19 && currentHour < 21);

    const buttonDisabled = selectedOption === 'delivery'
      ? isDeliveryUnavailable
      : isRestaurantClosed;

    setIsButtonDisabled(buttonDisabled);

    // Уведомляем родительский компонент, если нужно
    if (typeof onDisableStatusChange === 'function') {
      onDisableStatusChange(buttonDisabled);
    }
  };

  // Устанавливаем интервал для проверки времени
  useEffect(() => {
    checkButtonStatus(); // Проверяем сразу при загрузке
    const interval = setInterval(checkButtonStatus, 1000 * 60); // Проверяем каждую минуту

    return () => clearInterval(interval); // Убираем интервал при размонтировании
  }, [selectedOption]);

  const handleAddClick = (event) => {
    event.stopPropagation();
    addToCart({ price, text, weight, img });
  };

  return (
    <div className={s.cardprice}>
      <div className={s.foto}>
        <img src={img} alt={text} className={s.image} />
      </div>
      <div className={s.infosmall}>
        <p className={s.price}>{price} ₽</p>
        <p className={s.text}>{text}</p>
        <p className={s.weight}>{weight}</p>

        {itemCount > 0 ? (
          <button
            className={`${s.button} ${s.buttonModified}`}
            onClick={(event) => {
              event.stopPropagation();
              removeFromCart({ price, text, weight });
            }}
          >
            <img
              className={s.icon}
              src={minus}
              alt="minus"
            />
            <p className={s.itemCount}>{itemCount}</p>
            <img
              className={s.icon}
              src={plusdark}
              alt="plus"
              onClick={(event) => {
                event.stopPropagation();
                addToCart({ price, text, weight });
              }}
            />
          </button>
        ) : (
          <button
            className={s.button}
            onClick={handleAddClick}
            disabled={isButtonDisabled}
          >
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPrice;
