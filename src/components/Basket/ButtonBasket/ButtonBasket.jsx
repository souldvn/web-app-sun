import React, { useContext } from 'react';
import s from './ButtonBasket.module.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contextes/CartContext';

const ButtonBasket = ({ isEmpty }) => {
  const { selectedOption, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Вычисляем общую стоимость
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.count, 0);

  const handleBasketClick = () => {
    const totalPrice = getTotalPrice(); // Получаем текущую общую стоимость

    if (selectedOption === 'host') {
      navigate('/regrest', { state: { totalPrice, cartItems } }); // Передаем товары и цену
    } else if (selectedOption === 'delivery') {
      navigate('/regdel', { state: { totalPrice, cartItems } });
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
