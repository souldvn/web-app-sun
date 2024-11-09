import React from 'react'
import s from './Garnish.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Картофель фри", price: "200₽", weight: "150г" },
  { text: "Картофель дольки", price: "200₽", weight: "150г" },
  { text: "Гречка отварная", price: "350₽", weight: "250г" },
  { text: "Пюре картофельное", price: "250₽", weight: "200г" },
  { text: "Соте из овощей", price: "400₽", weight: "250г" },
  { text: "Рис отварной", price: "200₽", weight: "250г" },
  { text: "Рис с овощами", price: "250₽", weight: "250г" },

];
const Garnish = () => {
  return (
    <div className={s.garnish}>
        <TopBar text={"Гарниры"} />
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

export default Garnish