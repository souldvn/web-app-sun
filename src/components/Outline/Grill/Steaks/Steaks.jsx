import React from 'react'
import s from './Steaks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Рибай", price: "750 ₽", weight: "100 г" },
  { text: "Стриплойн", price: "650 ₽", weight: "100 г" },
  { text: "Филе миньон", price: "610 ₽", weight: "100 г" },
];
const Steaks = () => {
  return (
    <div className={s.steaks}>
        <TopBar text={"Стейки"} />
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

export default Steaks