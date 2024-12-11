import React, { useContext } from 'react';
import plus from '../../../assets/icons/plus.svg';
import plusdark from '../../../assets/icons/plusdark.svg';
import minus from '../../../assets/icons/minus.svg';
import s from './CardPrice.module.css';
import { CartContext } from '../../Contextes/CartContext';
import { useNavigate } from 'react-router-dom';

const CardPrice = ({ price, text, weight, description, time, compound, extrasPrice = 0 }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formattedPrice = parseInt(price.replace(/\D/g, ""));
  const item = cartItems.find(
    (cartItem) =>
      cartItem.price === formattedPrice &&
      cartItem.text.trim() === text.trim() &&
      cartItem.weight.trim() === weight.trim()
  );
  const itemCount = item ? item.count : 0;



  const totalPrice = formattedPrice + extrasPrice;

  const handleAddClick = (event) => {
    event.stopPropagation();
    if (text === "Русский завтрак" || text === "Английский завтрак") {
      navigate("/inline", {
        state: {
          dish: { text, price, weight, description, time, compound },
          fromRecomendations: false,
        },
      });
    } else {
      addToCart({ price: totalPrice, text, weight });
    }
  };

  return (
    <div className={s.cardprice}>
      <div className={s.foto}></div>
      <div className={s.infosmall}>
        <p className={s.price}>{totalPrice} ₽</p>
        <p className={s.text}>{text}</p>
        <p className={s.weight}>{weight}</p>

        {itemCount > 0 ? (
          <button
            className={`${s.button} ${s.buttonModified}`}
            onClick={(event) => {
              event.stopPropagation();
              removeFromCart({ price: totalPrice, text, weight });
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
                addToCart({ price: totalPrice, text, weight });
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


