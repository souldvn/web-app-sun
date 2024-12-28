import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Contextes/CartContext';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';
import { useQuery } from '../utils/util';

const Mainscreen = ({ setChatId }) => { // Accept setChatId as a prop
  const query = useQuery();
  const chatId = query.get('chatId'); // Get chatId from the query
  const { selectedOption, setOption } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOption = localStorage.getItem('activeButton') || 'host';
    setOption(savedOption);
    // Set chatId in App.js state
    if (chatId) {
      setChatId(chatId);
    }
  }, [setOption, chatId, setChatId]); // Ensure setChatId is called when chatId changes

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
      "Мороженое": "/icecreams",
      "Соусы": "/souses",
    };

    if (routes[cardName]) {
      navigate(routes[cardName]);
    }
  };

  // Cards array (same as before)
  const cards = [
    // Your card objects here
  ];

  // Filter cards based on selected option
  const filteredCards = selectedOption === 'delivery'
    ? cards.filter((card) => card.text !== "Завтраки")
    : cards;

  return (
    <div className={s.mainscreen}>
      <p>Chat ID: {chatId}</p>
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
        {filteredCards.map((card, index) => (
          <Carddeffault
            key={index}
            text={card.text}
            img={card.img}
            onClick={() => handleCardClick(card.text)}
          />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Mainscreen;
