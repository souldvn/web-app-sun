import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecDough.module.css';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../Complite/CartButton/CartButton';

const cards = [
    { text: "Американо", price: "220 ₽", weight: "250 мл", time:"10-15 минут", description:"Лёгкий и бодрящий напиток для тех, кто любит наслаждаться чистым вкусом кофе, но в более мягком и менее крепком исполнении" },
    { text: "Эспрессо", price: "160 ₽", weight: "250 мл", time:"10-15 минут", description:"Насыщенная, крепкая основа с плотным вкусом, квинтессенция кофе для настоящих ценителей" },
    { text: "Флэт Уайт", price: "250 ₽", weight: "250 мл", time:"10-15 минут", description:"Гармония эспрессо и воздушной молочной пены. Чуть более кофейный, чем латте, но с такой же мягкостью" },
    { text: "Капучино", price: "200 ₽", weight: "250 мл", time:"10-15 минут", description:"Классический напиток с богатой молочной пеной, который сочетается с крепким эспрессо, создавая идеальный баланс вкуса" },
    { text: "Латте", price: "250 ₽", weight: "250 мл", time:"10-15 минут", description:"Нежная молочная текстура с лёгким оттенком кофе, идеальный выбор для тех, кто любит мягкие кофейные напитки" },
    { text: "Айс Латте", price: "350 ₽", weight: "250 мл", time:"10-15 минут", description:"Освежающая версия латте с кубиками льда для тех, кто ищет прохладу и нежный кофейный вкус в одном стакане" },
    { text: "Раф классический", price: "300 ₽", weight: "250 мл", time:"10-15 минут", description:"Нежный кофейный напиток на основе эспрессо и сливок, идеально сбалансированный по вкусу, для тех, кто ценит насыщенность и уют в каждой чашке." },
  ];

const RecDough = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/doughIn', { state: { dish: card, fromRecomendations: true } });
  };

  return (
    <div className={s.drinks}>
        <p className={s.rec}>Дополнительно рекомендуем</p>
      <div className={s.cardsContainer}>
        
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card)}>
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
  );
};

export default RecDough;