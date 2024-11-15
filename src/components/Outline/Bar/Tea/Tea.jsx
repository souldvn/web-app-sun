import React from 'react'
import s from './Tea.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };
  
  return (
    <div className={s.drinks}>
      <TopBar text={"Чай классический"} />
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

export default Tea