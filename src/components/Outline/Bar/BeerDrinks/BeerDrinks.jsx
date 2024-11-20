import React from 'react'
import s from './BeerDrinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Сидр в ассортименте", price: "1 400 ₽", weight: "0,75 л", time:"10-15 минут", description:"Откройте мир разнообразия с нашим ассортиментом сидров! Идеально подходят для дружеских встреч, пикников или расслабляющих вечеров." },
];
const BeerDrinks = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barhot', { state: { dish: card, fromRecomendations: false } });
  };
  return (
    <div className={s.drinks}>
      <TopBar text={"Пивные напитки"} />
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

export default BeerDrinks