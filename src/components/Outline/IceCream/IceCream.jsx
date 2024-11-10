import React from 'react'
import s from './IceCream.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Мороженное в ассортименте", price: "300 ₽", weight: "150 г" },
];
const IceCream = () => {
  return (
    <div className={s.iceCream}>
        <TopBar text={"Мороженное"} />
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

export default IceCream