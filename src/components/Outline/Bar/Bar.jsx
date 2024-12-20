import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contextes/CartContext'; // Подключаем контекст
import s from './Bar.module.css';
import Carddeffault from '../../Complite/carddeffault/Carddeffault';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';

const cards = [
  "Холодные напитки", 
  "Лимонады",
  "Кофе",
  "Чай классический",
  "Фирменные чаи",
  "Горячие напитки",
  "Пиво",
  "Пивные напитки"
];

const Bar = () => {
  const { selectedOption } = useContext(CartContext); // Получаем текущий режим (доставка/в ресторане)
  const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    const routes = {
      'Холодные напитки': '/colddrinks',
      'Лимонады': '/limonades',
      'Кофе': '/coffee',
      'Чай классический': '/tea',
      'Фирменные чаи': '/comtea',
      'Горячие напитки': '/hotdrinks',
      'Пиво': '/beer',
      'Пивные напитки': '/beerdrinks',
    };

    if (routes[cardName]) {
      navigate(routes[cardName]);
    }
  };

  // Фильтруем карточки в зависимости от режима
  const excludedCards = ["Лимонады", "Фирменные чаи", "Горячие напитки", "Чай классический"];
  const filteredCards = selectedOption === 'delivery'
    ? cards.filter((card) => !excludedCards.includes(card))
    : cards;

  return (
    <div className={s.bar}>
      <TopBar text={"Барная карта"} />
      <div className={s.cardsContainer}>
        {filteredCards.map((text, index) => (
          <Carddeffault key={index} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Bar;
