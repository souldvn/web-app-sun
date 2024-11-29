import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import s from './Inline.module.css';
import arrowback from '../../../../assets/icons/arrowback.svg';
import basket from '../../../../assets/icons/basketbig.svg';
import BottomInfo from '../../BottomInfo/BottomInfo';
import { CartContext } from '../../../Contextes/CartContext';
import Recomendations from './Recomendations/Recomendations';
import more from '../../../../assets/icons/more.svg';
import PresentButton from '../../../Complite/PresentButton/PresentButton';
import MoreButton from '../../../Complite/MoreButton/MoreButton';

const Inline = () => {
  const { cartItems } = useContext(CartContext);

  // Состояние для отображения шторки
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);


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
    } else {
      alert('Ваша корзина пуста!');
    }
  };

  const openGiftModal = () => setIsGiftModalOpen(true);
  const closeGiftModal = () => setIsGiftModalOpen(false);

  const openMoreModal = () => setIsMoreModalOpen(true);
  const closeMoreModal = () => setIsMoreModalOpen(false);



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
      <div className={s.buttonsMore}>
        {(dish.text.includes('Русский завтрак') || dish.text.includes('Английский завтрак')) && (
          <>
            <button className={s.present} onClick={openGiftModal}>
              Подарок к завтраку
              <img src={more} alt="more" />
            </button>
            <button className={s.present} onClick={openMoreModal}>
              Дополнительно к завтраку
              <img src={more} alt="more" />
            </button>
          </>
        )}
      </div>

      {!fromRecomendations && <Recomendations />}
      <BottomInfo 
          price={dish.price} 
          text={dish.text} 
          weight={dish.weight} 
          specialButton={dish.text === "Русский завтрак" || dish.text === "Английский завтрак"} 
          
        />

      {isGiftModalOpen && <PresentButton onClose={closeGiftModal} itemName={dish.text} />}

      {isMoreModalOpen && <MoreButton onClose={closeMoreModal} itemName={dish.text} />}

      {/* Оверлей и шторка */}

    </div>
  );
};

export default Inline;
