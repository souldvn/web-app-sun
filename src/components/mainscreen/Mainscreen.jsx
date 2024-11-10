import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';

const Mainscreen = () => {
  const [activeButton, setActiveButton] = useState('host');
  const navigate = useNavigate();

  useEffect(() => {
    const savedButton = localStorage.getItem('activeButton');
    setActiveButton(savedButton || 'host');
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    localStorage.setItem('activeButton', button);
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
      if (cardName === 'Горячие блюда') {
        navigate('/hot');
      }
      if (cardName === 'Горячие закуски') {
        navigate('/hotSnacks');
      }if (cardName === 'Супы') {
        navigate('/soups');
      }
      if (cardName === 'Салаты') {
        navigate('/salads');
      }
      if (cardName === 'Тесто') {
        navigate('/dough');
      }
      if (cardName === 'Холодные закуски') {
        navigate('/coldSnacks');
      }
      if (cardName === 'Гарниры') {
        navigate('/garnishes');
      }
      if (cardName === 'Мороженное') {
        navigate('/icecreams');
      }
      if (cardName === 'Соусы') {
        navigate('/souses');
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

