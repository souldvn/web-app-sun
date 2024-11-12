import React from 'react'
import s from './HotDrinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Глинтвейн", price: "520 ₽", weight: "0,25 л" },
  { text: "Имбирно-лимонный", price: "580 ₽", weight: "1 л" },
  { text: "Облепиховый", price: "580 ₽", weight: "1 л" },
  { text: "Горный с ягодами", price: "520 ₽", weight: "1 л" },
  { text: "Пряные горы", price: "500 ₽", weight: "1 л" },
];
const HotDrinks = () => {
  return (
    <div className={s.hotDrinks}>
        <TopBar text={"Горячие напитки"} />
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

export default HotDrinks