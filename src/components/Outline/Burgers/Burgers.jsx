import React from 'react';
import s from './Burgers.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Гамбургер", price: "550₽", weight: "325/150г" },
  { text: "Чикен бургер", price: "500₽", weight: "300/150г" },
  { text: "Чизбургер", price: "600₽", weight: "350/150г" },
  { text: "Чизбургер куринный", price: "550₽", weight: "350/150г" }
];

const Burgers = () => {
  return (
    <div className={s.burgers}>
      <TopBar text={"Бургеры"} />
      <div className={s.cardsContainer}>
        {cards.map((card, index) => (
          <CardPrice 
            key={index} 
            text={card.text} 
            price={card.price} 
            weight={card.weight} 
          />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Burgers;
