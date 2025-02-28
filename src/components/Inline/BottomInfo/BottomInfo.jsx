import React, { useContext } from 'react';
import { CartContext } from '../../Contextes/CartContext';
import s from './BottomInfo.module.css';
import minus from '../../../assets/icons/minus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import plus from '../../../assets/icons/plus.svg';
import plusdis from '../../../assets/icons/plusdis.svg';

const BottomInfo = ({ price, text, weight, disabled, img }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const item = cartItems.find(
    (item) => item.price === price && item.text === text && item.weight === weight
  );
  const itemCount = item ? item.count : 0;

  

  return (
    <div className={s.buttonarea}>
      <div className={s.info}>
        <p className={s.price}>{price} ₽</p>
        <p className={s.weight}>{weight}</p>
      </div>
      {itemCount > 0 ? (
        <button
          className={`${s.button} ${s.buttonModified}`}
          onClick={(event) => {
            if (disabled) return; // Блокируем клик
            event.stopPropagation();
            removeFromCart({ price, text, weight, img });
          }}
          disabled={disabled} // Добавляем состояние disabled
        >
          <img className={s.icon} src={minus} alt="minus" />
          <p className={s.itemCount}>{itemCount}</p>
          <img
            className={s.icon}
            src={plusdark}
            alt="plus"
            onClick={(event) => {
              if (disabled) return; // Блокируем клик
              event.stopPropagation();
              addToCart({ price, text, weight });
            }}
          />
        </button>
      ) : (
        <button
          className={s.button}
          onClick={(event) => {
            if (disabled) return; // Блокируем клик
            event.stopPropagation();
            addToCart({ price, text, weight, img });
          }}
          disabled={disabled} // Добавляем состояние disabled
        >
                        <img src={disabled ? plusdis : plus} alt={disabled ? "plusdis" : "plus"} />

          <p>Добавить</p>
        </button>
      )}
    </div>
  );
};

export default BottomInfo;

