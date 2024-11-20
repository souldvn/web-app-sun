import React from 'react'
import s from './Steaks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  {id:1, text: "Рибай", price: "750 ₽", weight: "100 г", time:"30-60 минут", description:"Если твой аппетит разгулялся на полную катушку, выбери Рибай и скажи гуд бай голоду! Сочный толстый край стейка, с гриль томатами и маринованным красным луком, в обрамлении свежей зелени — это тот самый ужин, который восстановит силы и заставит твоё сердце петь от счастья.", compound:"Толстый край б/к чойс, томат на гриле, лук красный маринованный, зелень" },
  {id:2, text: "Стриплойн", price: "650 ₽", weight: "100 г", time:"30-60 минут", description:"Стриплойн — просто идеальное сочетание: толстый край б/к чойс с гриль-томатом, маринованным красным луком и свежей зеленью. Прямо к делу, без лишних слов.", compound:"Толстый край б/к чойс, томат на гриле, лук красный маринованный, зелень" },
  {id:3, text: "Филе миньон", price: "610 ₽", weight: "100 г", time:"30-60 минут", description:"Филе миньон — как скульптура из мрамора, но вместо камня — сочнейшая говяжья вырезка, созданная нашим шефом. Каждое кусочек — это мастерски приготовленный шедевр, идеально сочетающийся с гриль-тематами томатами, маринованным красным луком и свежей зеленью.", compound:"Мраморная говяжья вырезка, томат на гриле, лук красный маринованный, зелень" },
];
const Steaks = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/steaksIn', { state: { dish: card, fromRecomendations: false } });
  };


  return (
    <div className={s.steaks}>
      <TopBar text={"Стейки"} />
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

export default Steaks