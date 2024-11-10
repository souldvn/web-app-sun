import React from 'react'
import s from './Souses.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Перечный", price: "150 ₽", weight: "50 г" },
  { text: "Аджика домашняя", price: "120 ₽", weight: "50 г" },
  { text: "Кетчуп", price: "100 ₽", weight: "50 г" },
  { text: "Сырный", price: "100 ₽", weight: "50 г" },
  { text: "Наршараб", price: "100 ₽", weight: "50 г" },
  { text: "BBQ", price: "100 ₽", weight: "50 г" },
  { text: "Чатни из манго", price: "120 ₽", weight: "50 г" },
  { text: "Цахтон", price: "120 ₽", weight: "50 г" },
  { text: "Шрирача", price: "150 ₽", weight: "50 г" },
  { text: "Сметана", price: "100 ₽", weight: "50 г" },
  { text: "Горчица", price: "100 ₽", weight: "50 г" },
  { text: "Мёд", price: "300 ₽", weight: "50 г" },
  { text: "Дор Блю", price: "150 ₽", weight: "50 г" },
];
const Souses = () => {
  return (
    <div className={s.souses}>
        <TopBar text={"Соусы"} />
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

export default Souses