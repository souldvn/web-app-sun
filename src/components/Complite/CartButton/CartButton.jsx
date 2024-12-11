import React, { useContext } from 'react';
import basket from '../../../assets/icons/basketpng.png';  
import s from './CartButton.module.css';
import { CartContext } from '../../Contextes/CartContext';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems, selectedOption } = useContext(CartContext);

  // Вычисление общего количества товаров в корзине
  const cartCount = cartItems.reduce((total, item) => {
    if (selectedOption === 'delivery' && ['Айран', 'Молоко', 'Кефир', 'Русский завтрак', 'Английский завтрак'].includes(item.text)) {
      return total;
    }
    return total + item.count;
  }, 0);

  const handleCardClick = () => {
    if (cartCount > 0) {
      navigate('/basket');
    } else {
      alert('Ваша корзина пуста!');
    }
  };

  return (
    <div className={s.buttonarea}>
      <button 
        className={`${s.cartbutton} ${cartCount > 0 ? s.filled : ''}`} 
        onClick={handleCardClick}
        // disabled={selectedOption === 'delivery'}
      >
        Перейти в корзину
        {cartCount > 0 && (
          <div className={s.bas}>
            <img className={s.basket} src={basket} alt="basket" />
            <div className={s.number}>{cartCount}</div>
          </div>
        )}
      </button>
    </div>
  );
}; 

export default CartButton;
