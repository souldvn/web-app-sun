import React, { useContext, useEffect, useState } from 'react';
import { TimeContext } from '../../Contextes/TimeContext'; // Импорт контекста времени
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';

const CardPrice = ({ price, text, weight, img, onDisableStatusChange, type }) => {
  const { cartItems, addToCart, removeFromCart, selectedOption } = useContext(CartContext);
  const moscowTime = useContext(TimeContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  const itemCount = item ? item.count : 0;

  const checkButtonStatus = () => {
    const currentHour = moscowTime.getHours();
  
    // Общие условия
    const isRestaurantClosed =
      selectedOption === 'host' && (currentHour >= 21 || currentHour < 4);
  
    const isDeliveryUnavailable =
      selectedOption === 'delivery' &&
      !(currentHour >= 6 && currentHour < 15 || currentHour >= 15 && currentHour < 23);
  
    let buttonDisabled;
  
    if (type === 'dish' || type === 'drinks') {
      // Специальное условие для блюд
      buttonDisabled = !(currentHour >= 10 && currentHour < 11);
    } else {
      // Обычные условия
      buttonDisabled = selectedOption === 'delivery'
        ? isDeliveryUnavailable
        : isRestaurantClosed;
    }
  
    setIsButtonDisabled(buttonDisabled);
  
    if (typeof onDisableStatusChange === 'function') {
      onDisableStatusChange(buttonDisabled);
    }
  };
  

  useEffect(() => {
    checkButtonStatus();
  }, [moscowTime, selectedOption]);

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
            <img className={s.icon} src={minus} alt="minus" />
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
