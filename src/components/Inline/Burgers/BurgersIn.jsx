import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contextes/CartContext';
import s from './BurgersIn.module.css';
import arrowback from '../../../assets/icons/arrowback.svg';
import basket from '../../../assets/icons/basketbig.svg';
import BottomInfo from '../BottomInfo/BottomInfo';
import RecBurgers from './RecBurgers/RecBurgers';

const BurgersIn = () => {
  const { cartItems, addToCart } = useContext(CartContext);

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDish } = useContext(CartContext);
  const { dish, fromRecomendations, isAddButtonDisabled } = location.state || {
    dish: null,
    fromRecomendations: false,
    isAddButtonDisabled: false,
  };

  if (!dish) {
    return <div>Блюдо не найдено</div>;
  }

  const handleBackClick = () => {
    navigate(-1); // Вернуться на предыдущую страницу
  };

  const handleCardClick = () => {
    if (cartItems.length > 0) {
      navigate('/basket');
    }
  };

  // const handleAddClick = () => {
  //   if (dish) {
  //     addToCart({
  //       price: dish.price,
  //       text: dish.text,
  //       weight: dish.weight,
  //       img: dish.img,  // Add the image property here
  //     });
  //   }
  // };

  return (
    <div className={s.Inline}>
      <div
        className={s.public}
        style={{
          backgroundImage: `url(${dish.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={s.buttons}>
          <button className={s.arrow} onClick={handleBackClick}>
            <img src={arrowback} alt="arrowback" />
          </button>
          <button onClick={handleCardClick} className={s.basket}>
            <img src={basket} alt="basket" />
            {cartItems.length > 0 && (
              <div className={s.number}>{cartItems.reduce((total, item) => total + item.count, 0)}</div>
            )}
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
      {!fromRecomendations && <RecBurgers isAddButtonDisabled={isAddButtonDisabled} />}
      <BottomInfo
        price={dish.price}
        text={dish.text}
        weight={dish.weight}
        disabled={isAddButtonDisabled}
        img={dish.img}
        // onAddClick={handleAddClick}
      />
    </div>
  );
};

export default BurgersIn;
