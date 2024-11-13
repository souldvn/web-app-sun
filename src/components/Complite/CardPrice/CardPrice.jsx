import React, { useContext } from 'react';
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';
import { useNavigate } from 'react-router-dom';

const CardPrice = ({ price, text, weight, description }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Ищем товар в корзине и получаем его количество
  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  const itemCount = item ? item.count : 0; // Если товар найден, берем его количество, иначе 0

  const handleCardClick = () => {
    navigate('/inline', { state: { dish: { price, text, weight, description } } });
  };

  return (
    <div className={s.cardprice} onClick={handleCardClick}>
      <div className={s.foto}></div>
      <div className={s.infosmall}>
        <p className={s.price}>{price}</p>
        <p className={s.text}>{text}</p>
        <p className={s.weight}>{weight}</p>

        {itemCount > 0 ? (
          <button
            className={`${s.button} ${s.buttonModified}`}
            onClick={(event) => {
              event.stopPropagation(); // Останавливаем всплытие события
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
                event.stopPropagation(); // Останавливаем всплытие события
                addToCart({ price, text, weight });
              }}
            />
          </button>
        ) : (
          <button
            className={s.button}
            onClick={(event) => {
              event.stopPropagation(); // Останавливаем всплытие события
              addToCart({ price, text, weight });
            }}
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









