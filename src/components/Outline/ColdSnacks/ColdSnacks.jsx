import React from 'react'
import s from './ColdSnacks.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Плато «Кавказ»", price: "950 ₽", weight: "530 г" },
  { text: "Мясное ассорти", price: "550 ₽", weight: "225 г" },
  { text: "Сырное ассорти", price: "500 ₽", weight: "250 г" },
  { text: "Ассорти солений", price: "450 ₽", weight: "350 г" },
  { text: "Овощное ассорти", price: "450 ₽", weight: "395 г" },
  { text: "Филе сельди с картофелем от шефа", price: "500 ₽", weight: "150/200 г" },
  { text: "Сёмга слабосоленая", price: "700 ₽", weight: "150/50 г" },
  { text: "Лимон", price: "100 ₽", weight: "50 г" },
  { text: "Королевские маслины & оливки", price: "220 ₽", weight: "90 г" },
  
];
const ColdSnacks = () => {
  return (
    <div className={s.coldSnacks}>
        <TopBar text={"Холодные закуски"} />
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

export default ColdSnacks