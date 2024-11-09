import React from 'react'
import s from './Tea.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Чёрный Ассам", price: "380 ₽", weight: "1 л" },
  { text: "Зелёный Сенча", price: "400 ₽", weight: "1 л" },
  { text: "Эрл Грей", price: "400 ₽", weight: "1 л" },
  { text: "Чёрный с чабрецом", price: "450 ₽", weight: "1 л" },
  { text: "Молочный улун", price: "480 ₽", weight: "1 л" },
  { text: "Горный чай", price: "400 ₽", weight: "1 л" },
  { text: "Гречишный чай", price: "480 ₽", weight: "1 л" },


];
const Tea = () => {
  return (
    <div className={s.tea}>
        <TopBar text={"Чай классический"} />
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

export default Tea