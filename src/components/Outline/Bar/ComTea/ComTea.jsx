import React from 'react'
import s from './ComTea.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Облепиха мята улун", price: "580 ₽", weight: "1 л" },
  { text: "Малина Эрл Грей", price: "520 ₽", weight: "1 л" },
  { text: "Гречишный чай с манго", price: "580 ₽", weight: "1 л" },

];
const ComTea = () => {
  return (
    <div className={s.comTea}>
        <TopBar text={"Фирменные чаи"} />
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

export default ComTea