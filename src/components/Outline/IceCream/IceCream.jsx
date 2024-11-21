import React from 'react'
import s from './IceCream.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Мороженое в ассортименте", price: "300 ₽", weight: "150 г", time:"10-15 минут", description:"Наслаждение для любителей сладостей! Нежная текстура и яркие цвета делают его идеальным десертом. Это восхитительное угощение подарит удовольствие в любое время года!" },
];

const IceCream = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/iceIn', { state: { dish: card, fromRecomendations: false } });
  };
  return (
    <div className={s.steaks}>
      <TopBar text={"Мороженое"} />
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

export default IceCream