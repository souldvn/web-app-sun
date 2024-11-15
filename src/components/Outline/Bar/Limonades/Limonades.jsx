import React from 'react'
import s from './Limonades.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };
  return (
    <div className={s.drinks}>
      <TopBar text={"Лимонады"} />
      <div className={s.cardsContainer}>
        {cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
            />
          </div>
        ))}
      </div>
      <CartButton />
    </div>
  )
}

export default Limonades