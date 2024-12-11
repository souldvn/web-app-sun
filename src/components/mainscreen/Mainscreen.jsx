import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Contextes/CartContext';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';

const Mainscreen = () => {
  const { selectedOption, setOption } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOption = localStorage.getItem('activeButton') || 'host';
    setOption(savedOption);
  }, [setOption]);

  const handleButtonClick = (option) => {
    setOption(option);
  };

  const handleCardClick = (cardName) => {
    const routes = {
      "Завтраки": "/breakfast",
      "Барная карта": "/bar",
      "Гриль & Мангал": "/grill",
      "Бургеры": "/burgers",
      "Горячие блюда": "/hot",
      "Горячие закуски": "/hotSnacks",
      "Супы": "/soups",
      "Салаты": "/salads",
      "Тесто": "/dough",
      "Холодные закуски": "/coldSnacks",
      "Гарниры": "/garnishes",
      "Мороженное": "/icecreams",
      "Соусы": "/souses",
    };

    if (routes[cardName]) {
      navigate(routes[cardName]);
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
    "Соусы",
  ];

  const filteredCards = selectedOption === 'delivery'
    ? cards.filter((card) => card !== "Завтраки")
    : cards;

  return (
    <div className={s.mainscreen}>
      <div className={s.functionpanel}>
        <button className={s.balls}>
          <img src={balls} alt="balls" />
        </button>
      </div>
      <div className={s.variants}>
        <button
          className={`${s.buttonhost} ${selectedOption === 'host' ? s.active : ''}`}
          onClick={() => handleButtonClick('host')}
        >
          В ресторане
        </button>
        <button
          className={`${s.buttondelivery} ${selectedOption === 'delivery' ? s.active : ''}`}
          onClick={() => handleButtonClick('delivery')}
        >
          Доставка
        </button>
      </div>

      <div className={s.cardsContainer}>
        {filteredCards.map((text, index) => (
          <Carddeffault key={index} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Mainscreen;
