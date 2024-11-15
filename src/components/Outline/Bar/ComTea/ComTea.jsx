import React from 'react'
import s from './ComTea.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Облепиха мята улун", price: "580 ₽", weight: "1 л" },
  { text: "Малина Эрл Грей", price: "520 ₽", weight: "1 л" },
  { text: "Гречишный чай с манго", price: "580 ₽", weight: "1 л" },

];
const ComTea = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };
  
  return (
    <div className={s.drinks}>
      <TopBar text={"Фирменные чаи"} />
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

export default ComTea