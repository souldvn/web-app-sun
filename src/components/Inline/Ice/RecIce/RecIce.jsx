import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecIce.module.css';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../Complite/CartButton/CartButton';

const cards = [
    {id:1, text: "Вода газ стекло", price: "270 ₽", weight: "0,5 л", description:"Свежесть с игрой пузырьков, которые бодрят и освежают с первого глотка. Лёгкий газированный вкус для тех, кто ценит простое удовольствие с небольшим шипучим акцентом.", time:"10-15 минут" },
    {id:2, text: "Вода б/г стекло", price: "230 ₽", weight: "0,5 л", description: "Вода без газа — чистый глоток природы, ничего лишнего, только свежесть и естественность. Идеальна, когда нужно простое, но настоящее утоление жажды.", time:"10-15 минут" },
    {id:3, text: "Кола стекло", price: "300 ₽", weight: "0,25 л", description:"Легендарный вкус, который всегда к месту! Холодная, бодрящая и шипучая, она приносит мгновенное освежение с яркой ноткой сладости и лёгкой кислинкой. Этот напиток — больше, чем просто газировка, это настоящая классика, которая никогда не подведёт.", time:"10-15 минут" },
    {id:4, text: "Спрайт стекло", price: "300 ₽", weight: "0,25 л", description:"Лимонно-лаймовый вкус и мягкие пузырьки создают взрыв бодрости в каждом глотке. Холодный и освежающий, он всегда приносит ощущение прохлады, особенно в стеклянной бутылке.", time:"10-15 минут" },
    {id:5, text: "Фанта стекло", price: "300 ₽", weight: "0,25 л", description:"Солнечный заряд с ярким вкусом спелого апельсина. Лёгкая сладость и бодрящие пузырьки мгновенно освежают, оставляя за собой приятное цитрусовое послевкусие. В стеклянной бутылке она особенно освежающая и искрящаяся, как настоящий глоток лета.", time:"10-15 минут" },
    {id:6, text: "Натахтари в ассортименте", price: "250 ₽", weight: "0,5 л", description:"Лёгкий, освежающий и насыщенный фруктовыми нотками, он идеально подходит для тех, кто ищет что‑то яркое и бодрящее. Независимо от вкуса, будь то тархун, барбарис, груша или экзотический фейхоа, Натахтари всегда удивляет своей свежестью и гармонией ароматов.", time:"10-15 минут" },
    {id:7, text: "Сок в ассортименте", price: "660 ₽", weight: "1 л", description:"Соки для отличного настроения! В нашем ассортименте — только самое лучшее, чтобы утолить жажду и зарядить энергией.", time:"10-15 минут" },
    {id:8, text: "Сок в ассортименте", price: "200 ₽", weight: "0,25 л", description:"Соки для отличного настроения! В нашем ассортименте — только самое лучшее, чтобы утолить жажду и зарядить энергией.", time:"10-15 минут" },
  ];

const RecIce = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/iceIn', { state: { dish: card, fromRecomendations: true } });
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

export default RecIce;