import React from 'react'
import s from './BeerDrinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Сидр в ассортименте", price: "1 400 ₽", weight: "0,75 л" },
];
const BeerDrinks = () => {
  return (
    <div className={s.beerDrinks}>
        <TopBar text={"Пивные напитки"} />
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

export default BeerDrinks