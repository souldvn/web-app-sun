import React, { useContext } from 'react';
import s from './ButtonBasket.module.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contextes/CartContext';

const ButtonBasket = ({ isEmpty }) => {
  const { selectedOption } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBasketClick = () => {
    if (selectedOption === 'host') {
      navigate('/regrest'); // Навигация для варианта "В ресторане"
    } else if (selectedOption === 'delivery') {
      navigate('/regdel'); // Навигация для варианта "Доставка"
    }
  };

  return (
    <div className={s.buttonarea}>
      <button
        onClick={handleBasketClick}
        className={`${s.cartbutton} ${isEmpty ? s.empty : ''}`}
      >
        Перейти к оформлению
      </button>
    </div>
  );
};

export default ButtonBasket;
