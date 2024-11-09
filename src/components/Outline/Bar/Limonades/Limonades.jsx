import React from 'react'
import s from './Limonades.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Цитрусовый микс", price: "660 ₽", weight: "1 л" },
  { text: "Цитрусовый микс", price: "250 ₽", weight: "0,25 л" },
  { text: "Ягодный", price: "660 ₽", weight: "1 л" },
  { text: "Ягодный", price: "250 ₽", weight: "0,25 л" },
  { text: "Манго-маракуйя", price: "660 ₽", weight: "1 л" },
  { text: "Манго-маракуйя", price: "250 ₽", weight: "0,25 л" },
  { text: "Огурец-яблоко", price: "660 ₽", weight: "1 л" },
  { text: "Огурец-яблоко", price: "250 ₽", weight: "0,25 л" },
  { text: "Лаванда-маракуйя", price: "660 ₽", weight: "1 л" },
  { text: "Лаванда-маракуйя", price: "250 ₽", weight: "0,25 л" },
  { text: "Малина-маракуйя", price: "660 ₽", weight: "1 л" },
  { text: "Малина-маракуйя", price: "250 ₽", weight: "0,25 л" },
  { text: "Мохито б/а", price: "660 ₽", weight: "1 л" },
  { text: "Мохито б/а", price: "250 ₽", weight: "0,25 л" },
];
const Limonades = () => {
  return (
    <div className={s.limonades}>
        <TopBar text={"Лимонады"} />
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

export default Limonades