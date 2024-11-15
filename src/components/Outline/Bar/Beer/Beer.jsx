import React from 'react'
import s from './Beer.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  {id:1, text: "Paulaner Weissbier", price: "480 ₽", weight: "0,5 л" },
  {id:2, text: "Paulaner 0,5 Original", price: "480 ₽", weight: "0,5 л" },
  {id:3, text: "Будвайзер", price: "480 ₽", weight: "0,5 л" },
  {id:4, text: "Гиннес", price: "650 ₽", weight: "0,5 л" },
  {id:5, text: "Corona Extra «0%»", price: "500 ₽", weight: "0,35 л" },
];
const Beer = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barhot', { state: { dish: card, fromRecomendations: false } });
  };
  return (
    <div className={s.drinks}>
      <TopBar text={"Пиво"} />
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

export default Beer