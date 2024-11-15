import React from 'react'
import s from './Coffe.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';
const cards = [
  { text: "Американо", price: "220 ₽", weight: "250 мл" },
  { text: "Эспрессо", price: "160 ₽", weight: "250 мл" },
  { text: "Флэт Уайт", price: "250 ₽", weight: "250 мл" },
  { text: "Капучино", price: "200 ₽", weight: "250 мл" },
  { text: "Латте", price: "250 ₽", weight: "250 мл" },
  { text: "Айс Латте", price: "350 ₽", weight: "250 мл" },
  { text: "Раф классический", price: "300 ₽", weight: "250 мл" },
];
const Coffe = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };

  return (
    <div className={s.drinks}>
      <TopBar text={"Кофе"} />
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

export default Coffe