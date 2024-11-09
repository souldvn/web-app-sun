import React from 'react'
import s from './Kebabs.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Баранина мякоть", price: "500 ₽", weight: "100 г" },
  { text: "Говядина мякоть", price: "600 ₽", weight: "100 г" },
  { text: "Бок ягнёнка", price: "550 ₽", weight: "100 г" },
  { text: "Куриное бедро б/к", price: "350 ₽", weight: "100 г" },  
  { text: "Куриное филе б/к", price: "370 ₽", weight: "100 г" },
  { text: "Люля-кебаб курица", price: "400 ₽", weight: "100 г" },
  { text: "Люля-кебаб баранина", price: "450 ₽", weight: "100 г" },
  { text: "Овощи гриль", price: "500 ₽", weight: "420 гр" },
  { text: "Шампиньоны на мангале", price: "200 ₽", weight: "100 г" },
  { text: "Картофель на мангале", price: "150 ₽", weight: "100 г" },
  { text: "Куриные крылья на мангале", price: "220 ₽", weight: "100 г" },

];
const Kebabs = () => {
  return (
    <div className={s.kebabs}>
        <TopBar text={"Шашлыки"} />
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

export default Kebabs