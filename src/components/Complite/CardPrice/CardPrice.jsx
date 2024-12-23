import React, { useContext } from 'react';
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';
import { useNavigate } from 'react-router-dom';

const CardPrice = ({ price, text, weight, description, time, compound, img }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  const itemCount = item ? item.count : 0;

  const handleAddClick = (event) => {
    event.stopPropagation(); // Останавливаем всплытие события

    // Проверяем название карточки
    
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
          <button className={s.button} onClick={handleAddClick}>
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPrice;