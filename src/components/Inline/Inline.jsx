import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Inline.module.css';
import arrowback from '../../assets/icons/arrowback.svg';
import basket from '../../assets/icons/basketbig.svg';

const Inline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dish } = location.state || {};

  if (!dish) {
    return <div>Блюдо не найдено</div>;
  }

  const handleBackClick = () => {
    navigate(-2); // Вернуться на предыдущую страницу
  };

  return (
    <div className={s.Inline}>
      <div className={s.public}>
        <div className={s.buttons}>
           <button className={s.arrow} onClick={handleBackClick}>
          <img src={arrowback} alt="arrowback" />
        </button>
        <button className={s.basket}>
          <img src={basket} alt="basket" />
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
    </div>
  );
};

export default Inline;







        // <p className={s.price}>{dish.price}</p>
        // <p className={s.weight}>{dish.weight}</p>