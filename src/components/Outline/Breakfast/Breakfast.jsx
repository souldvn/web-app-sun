import React from 'react';
import Carddeffault from '../../Complite/carddeffault/Carddeffault';
import s from './Breakfast.module.css';
import { useNavigate } from 'react-router-dom';
import CartButton from '../../Complite/CartButton/CartButton';
import TopBar from '../../Complite/TopBar/TopBar';

const cards = [
  {
    text: "Блюда",
    img: "https://github.com/souldvn/SunVillImg/blob/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Bluda.jpg?raw=true",
  },
  {
    text: "Напитки",
    img: "https://github.com/souldvn/SunVillImg/blob/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Napitki.jpg?raw=true",
  },
];

const Breakfast = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    if (cardName === 'Блюда') {
      navigate('/dishes');
    }
    if (cardName === 'Напитки') {
      navigate('/drinks');
    }
  };

  return (
    <div className={s.breakfast}>
      <TopBar text="Завтраки" />
      <div className={s.cardsContainer}>
        {cards.map(({ text, img }, index) => (
          <Carddeffault
            key={index}
            text={text}
            img={img}
            onClick={() => handleCardClick(text)}
          />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Breakfast;
