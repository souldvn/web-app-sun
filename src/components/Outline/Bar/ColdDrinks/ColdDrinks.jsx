import React from 'react'
import s from './ColdDrinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Вода б/г стекло", price: "230 ₽", weight: "0,5 л" },
  { text: "Вода газ стекло", price: "270 ₽", weight: "0,5 л" },
  { text: "Кола стекло", price: "300 ₽", weight: "0,25 л" },
  { text: "Спрайт стекло", price: "300 ₽", weight: "0,25 л" },
  { text: "Фанта стекло", price: "300 ₽", weight: "0,25 л" },
  { text: "Натахтари в ассортименте", price: "250 ₽", weight: "0,5 л" },
  { text: "Сок в ассортименте", price: "660 ₽", weight: "1 л" },
  { text: "Сок в ассортименте", price: "200 ₽", weight: "0,25 л" },
];

const ColdDrinks = () => {
  return (
    <div className={s.coldDrinks}>
        <TopBar text={"Холодные напитки"} />
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

export default ColdDrinks