import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Inline.module.css';
import arrowback from '../../../../assets/icons/arrowback.svg';
import basket from '../../../../assets/icons/basketbig.svg';
import BottomInfo from '../../BottomInfo/BottomInfo';
import { CartContext } from '../../../Contextes/CartContext';
import Recomendations from './Recomendations/Recomendations';

const Inline = () => {
  const { cartItems, extraItemsTotalPrice, setExtraItemsTotalPrice, addExtraItems } = useContext(CartContext);
  const [extras, setExtras] = useState({});

  const cartCount = cartItems.reduce((total, item) => total + item.count, 0);
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
    navigate(-1);
  };

  const handleCardClick = () => {
    if (cartCount > 0) {
      navigate('/basket');
    } else {
      alert('Ваша корзина пуста!');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem(`extras-${dish.id}`);
    const savedTotalPrice = localStorage.getItem(`totalPrice-${dish.id}`);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setExtras((prevExtras) => ({
        ...prevExtras,
        [dish.id]: { selectedExtras: parsedData, totalPrice: Number(savedTotalPrice) },
      }));
    }
  }, [dish.id]);

  const handleAddExtras = (extraData) => {
    const { extras: selectedExtras, totalPrice } = extraData;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [dish.id]: { selectedExtras, totalPrice },
    }));
    setExtraItemsTotalPrice(totalPrice);
    addExtraItems(selectedExtras, totalPrice); // Update cart context
  
    localStorage.setItem(`extras-${dish.id}`, JSON.stringify(selectedExtras));
    localStorage.setItem(`totalPrice-${dish.id}`, totalPrice);
  };

  return (
    <div className={s.Inline}>
      <div
        className={s.public}
        style={{
          backgroundImage: `url(${dish.img})`, // динамическое фоновое изображение
          backgroundSize: 'cover',
          // backgroundPosition: 'center center'
        }}
      >
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

      {!fromRecomendations && <Recomendations isAddButtonDisabled={isAddButtonDisabled} />}

      <BottomInfo
        itemId={dish.id}
        price={dish.price}
        text={dish.text}
        weight={dish.weight}
        specialButton={dish.text === "Русский завтрак" || dish.text === "Английский завтрак"}
        extraPrice={extras[dish.id]?.totalPrice || 0}
        onExtrasChange={(newExtras) => handleAddExtras({ extras: newExtras, totalPrice: extras[dish.id]?.totalPrice })}
        disabled={isAddButtonDisabled} // Передаем состояние disabled
        img={dish.img}

      />
    </div>
  );
};

export default Inline;
