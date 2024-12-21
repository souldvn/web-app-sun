import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Recomendations.module.css';
import CardPrice from '../../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../../Complite/CartButton/CartButton';

const cards = [
  {id:1, text: "Молоко", price: "100", weight: "250 мл", description:"Полезный и освежающий напиток, который идеально подходит для завтрака на природе. Оно прекрасно дополняет каши, создавая атмосферу уюта и комфорта в горном окружении.", time:"15-25 минут" },
  {id:2, text: "Айран", price: "150", weight: "250 мл", description: "Отличное дополнение к завтраку на природе. Его лёгкая кислинка прекрасно освежает и утоляет жажду, создавая атмосферу комфорта и удовольствия во время отдыха в горах.", time:"15-25 минут" },
  {id:3, text: "Кефир", price: "150", weight: "250 мл", description:"Бодрящий кисломолочный напиток с лёгкой текстурой, который прекрасно подойдёт для утра на свежем воздухе. Его освежающий вкус и полезные свойства делают его отличным спутником в вашем горном отдыхе.", time:"15-25 минут" },

];



const Recomendations = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/inline', { state: { dish: card, fromRecomendations: true } });
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

export default Recomendations;
