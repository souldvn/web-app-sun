import React from 'react'
import s from './Coffe.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Американо", price: "220 ₽", weight: "250 мл" },
  { text: "Эспрессо", price: "160 ₽", weight: "250 мл" },
  { text: "Флэт Уайт", price: "250 ₽", weight: "250 мл" },
  { text: "Капучино", price: "200 ₽", weight: "250 мл" },
  { text: "Латте", price: "250 ₽", weight: "250 мл" },
  { text: "Айс Латте", price: "350 ₽", weight: "250 мл" },
  { text: "Раф классический", price: "300 ₽", weight: "250 мл" },
];
const Coffe = () => {
  return (
    <div className={s.coffe}>
        <TopBar text={"Кофе"} />
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

export default Coffe