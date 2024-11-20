import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import s from './Kebabin.module.css';
import arrowback from '../../../../assets/icons/arrowback.svg';
import basket from '../../../../assets/icons/basketbig.svg';
import BottomInfo from '../../BottomInfo/BottomInfo';
import { CartContext } from '../../../Contextes/CartContext';

import RecKebab from './RecKebab/RecKebab';



const KebabIn = () => {
  
  const { cartItems } = useContext(CartContext);

  // Вычисление общего количества товаров в корзине
  const cartCount = cartItems.reduce((total, item) => total + item.count, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDish } = useContext(CartContext);
  const { dish, fromRecomendations } = location.state || { dish: selectedDish, fromRecomendations: false };

    if (!dish) {
      return <div>Блюдо не найдено</div>;
    }

    const handleBackClick = () => {
      navigate(-1); // Вернуться на предыдущую страницу
    };
  const handleCardClick = () => {
    if (cartCount > 0) {
      navigate('/basket');
    }
  };

  return (
    <div className={s.Inline}>
      <div className={s.public}>
        <div className={s.buttons}>
          <button className={s.arrow} onClick={handleBackClick}>
            <img src={arrowback} alt="arrowback" />
          </button>
          <button onClick={handleCardClick} className={s.basket}>
            <img src={basket} alt="basket" />
            {cartCount > 0 && <div className={s.number}>{cartCount}</div>}
          </button>
        </div>
        <div className={s.time}>
          <p className={s.timeP}>Время приготовления {dish.time}</p>
        </div>
      </div>
      <div className={s.info}>
        <p className={s.title}>{dish.text}</p>
        <p className={s.text}>{dish.description}</p>
      </div>
      {dish.compound && (
        <div className={s.compoundCon}>
          <p className={s.compound}>Состав</p>
          <p className={s.text}>{dish.compound}</p>
        </div>
      )}
      {!fromRecomendations && <RecKebab />}
      <BottomInfo price={dish.price} text={dish.text} weight={dish.weight} />
    </div>
  );
  
};

export default KebabIn;