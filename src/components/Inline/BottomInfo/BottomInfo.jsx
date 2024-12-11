import React, { useContext } from 'react';
import { CartContext } from '../../Contextes/CartContext';
import s from './BottomInfo.module.css';
import minus from '../../../assets/icons/minus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import plus from '../../../assets/icons/plus.svg';

const BottomInfo = ({ price, text, weight, specialButton, extraPrice = 0 }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // Находим конкретный элемент в корзине по itemId
  const item = cartItems.find((item) => item.id);
  const itemCount = item ? item.count : 0;

  // Явное приведение значений к числовому типу перед сложением
  const totalPrice = (Number(price) + Number(extraPrice)).toFixed(0);  // Применяем extraPrice, если есть


  return (
    <div className={s.buttonarea}>
      <div className={s.info}>
        <p className={s.price}>{totalPrice} ₽</p>  {/* Выводим цену с валютой */}
        <p className={s.weight}>{weight}</p>
      </div>
      {specialButton ? (
        itemCount > 0 ? (
          <button
            className={`${s.button} ${s.buttonModified}`}
            onClick={(event) => {
              event.stopPropagation(); 
              removeFromCart({price, text, weight });
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
                addToCart({price, text, weight });
              }}
            />
          </button>
        ) : (
          <button
            className={s.button}
            onClick={(event) => {
              event.stopPropagation(); 
              addToCart({price, text, weight });
            }}
          >
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </button>
        )
      ) : (
        itemCount > 0 ? (
          <button
            className={`${s.button} ${s.buttonModified}`}
            onClick={(event) => {
              event.stopPropagation(); 
              removeFromCart({price, text, weight });
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
            onClick={(event) => {
              event.stopPropagation(); 
              addToCart({ price, text, weight });
            }}
          >
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </button>
        )
      )}
    </div>
  );
};



export default BottomInfo;
