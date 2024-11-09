import React from 'react'
import s from './Fish.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Сёмга филе", price: "620 ₽", weight: "100 г" },
  { text: "Форель", price: "420 ₽", weight: "100 г" },
  { text: "Дорадо", price: "300 ₽", weight: "100 г" },
  { text: "Креветки на гриле", price: "600 ₽", weight: "100 г" },
  { text: "Кальмар на гриле", price: "700 ₽", weight: "100 г" },
];
const Fish = () => {
  return (
    <div className={s.fish}>
        <TopBar text={"Гриль & Мангал"} />
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
  )
}

export default Fish