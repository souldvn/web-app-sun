import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecColdSnaks.module.css';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../Complite/CartButton/CartButton';

const cards = [
    {id:1, text: "Paulaner Weissbier", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Идеально сочетается с хрустящими луковыми колечками. Погрузитесь в мир баварского уюта, наслаждаясь каждым глотком!" },
    {id:2, text: "Paulaner 0,5 Original", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Классическое немецкое светлое пиво с насыщенным вкусом и хмелёвым ароматом. Прекрасно сочетается с лёгкими закусками. Каждое сочетание приносит удовольствие и создаёт атмосферу настоящего немецкого пивного праздника!" },
    {id:3, text: "Будвайзер", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Классическое светлое пиво с чистым и освежающим вкусом. Оно идеально сочетается с крылышками и бургерами, добавляя яркие эмоции к любому застолью." },
    {id:4, text: "Гиннес", price: "650 ₽", weight: "0,5 л", time:"10-15 минут", description:"Это не просто пиво, а целый ирландский сюрприз. Его тёмный цвет и плотная кремовая пена создают атмосферу отдыха. С нотками кофе и шоколада, это пиво заставляет ваши вкусовые рецепторы играть в унисон." },
    {id:5, text: "Corona Extra «0%»", price: "500 ₽", weight: "0,35 л", time:"10-15 минут", description:"Безалкогольная версия классического мексиканского пива, сохранившая свой освежающий и лёгкий вкус. С нотками цитрусовых и хмеля, этот напиток идеально подходит для дружеских встреч." },
    {id:6, text: "Сидр в ассортименте", price: "1 400 ₽", weight: "0,75 л", time:"10-15 минут", description:"Откройте мир разнообразия с нашим ассортиментом сидров! Идеально подходят для дружеских встреч, пикников или расслабляющих вечеров." }
  ];

const RecColdSnacks = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/coldsnacksIn', { state: { dish: card, fromRecomendations: true } });
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

export default RecColdSnacks;