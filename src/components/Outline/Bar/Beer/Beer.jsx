import React from 'react'
import s from './Beer.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Paulaner Weissbier", price: "480 ₽", weight: "0,5 л" },
  { text: "Paulaner 0,5 Original", price: "480 ₽", weight: "0,5 л" },
  { text: "Будвайзер", price: "480 ₽", weight: "0,5 л" },
  { text: "Гиннес", price: "650 ₽", weight: "0,5 л" },
  { text: "Яблочный сидр", price: "1400 ₽", weight: "0,75 л" },
  { text: "Грушевый сидр", price: "1400 ₽", weight: "0,75 л" },
  { text: "Corona Extra «0%»", price: "500 ₽", weight: "0,35 л" },
];
const Beer = () => {
  return (
    <div className={s.beer}>
        <TopBar text={"Пиво & пивные напитки"} />
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

export default Beer