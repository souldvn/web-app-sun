import React from 'react'
import s from './Drinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Молоко", price: "100 ₽", weight: "250 мл" },
  { text: "Айран", price: "150 ₽", weight: "250 мл" },
  { text: "Кефир", price: "150 ₽", weight: "250 мл" },

];
const Drinks = () => {
  return (
    <div className={s.drinks}>
        <TopBar text={"Напитки"} />
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

export default Drinks