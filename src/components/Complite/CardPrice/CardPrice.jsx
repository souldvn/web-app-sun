import React, { useContext } from 'react';
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';

const CardPrice = ({ price, text, weight }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // Ищем товар в корзине и получаем его количество
  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  
  const itemCount = item ? item.count : 0; // Если товар найден, берем его количество, иначе 0

  return (
    <div className={s.cardprice}>
      <div className={s.foto}></div>
      <div className={s.infosmall}>
        <p className={s.price}>{price}</p>
        <p className={s.text}>{text}</p>
        <p className={s.weight}>{weight}</p>

        {itemCount > 0 ? (
          <button className={`${s.button} ${s.buttonModified}`}>
            <img
              className={s.icon}
              src={minus}
              alt="minus"
              onClick={() => removeFromCart({ price, text, weight })}
            />
            <p className={s.itemCount}>{itemCount}</p>
            <img
              className={s.icon}
              src={plusdark}
              alt="plus"
              onClick={() => addToCart({ price, text, weight })}
            />
          </button>
        ) : (
          <button className={s.button} onClick={() => addToCart({ price, text, weight })}>
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPrice;

