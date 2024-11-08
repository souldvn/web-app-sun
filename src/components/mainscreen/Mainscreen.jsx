import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';

const Mainscreen = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleCardClick = (cardName) => {
    if (cardName === 'Завтраки') {
      navigate('/breakfast');
    }
    if (cardName === 'Барная карта') {
        navigate('/bar');
      }
      if (cardName === 'Гриль & Мангал') {
        navigate('/grill');
      }
      if (cardName === 'Бургеры') {
        navigate('/burgers');
      }
  };

  const cards = [
    "Завтраки",
    "Барная карта",
    "Гриль & Мангал",
    "Бургеры",
    "Горячие блюда",
    "Горячие закуски",
    "Супы",
    "Салаты",
    "Тесто",
    "Холодные закуски",
    "Гарниры",
    "Мороженное",
    "Соусы"
  ];

  return (
    <div className={s.mainscreen}>
      <div className={s.functionpanel}>
        <button className={s.balls}>
          <img src={balls} alt="balls" />
        </button>
      </div>
      <div className={s.variants}>
        <button
          className={`${s.buttonhost} ${activeButton === 'host' ? s.active : ''}`}
          onClick={() => handleButtonClick('host')}
        >
          В ресторане
        </button>
        <button
          className={`${s.buttondelivery} ${activeButton === 'delivery' ? s.active : ''}`}
          onClick={() => handleButtonClick('delivery')}
        >
          Доставка
        </button>
      </div>

      <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Mainscreen;

