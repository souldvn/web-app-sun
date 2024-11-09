import React from 'react'
import s from './Dishes.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Русский завтрак", price: "750 ₽", weight: "880 г" },
  { text: "Английский завтрак", price: "750 ₽", weight: "680 г" },
  { text: "Шакшука с гренкой", price: "450 ₽", weight: "590 г" },
  { text: "Яичница глазунья из двух яиц", price: "250 ₽", weight: "150г" },
  { text: "Яйцо отварное", price: "60 ₽", weight: "1 шт" },
  { text: "Сэндвич с сёмгой", price: "400 ₽", weight: "280 г" },
  { text: "Каша в ассортименте", price: "250 ₽", weight: "300 г" },
];
const Dishes = () => {
  return (
    <div className={s.dishes}>
        <TopBar text={"Блюда"} />
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

export default Dishes