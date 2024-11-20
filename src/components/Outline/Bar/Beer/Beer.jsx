import React from 'react'
import s from './Beer.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  {id:1, text: "Paulaner Weissbier", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Идеально сочетается с хрустящими луковыми колечками. Погрузитесь в мир баварского уюта, наслаждаясь каждым глотком!" },
  {id:2, text: "Paulaner 0,5 Original", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Классическое немецкое светлое пиво с насыщенным вкусом и хмелёвым ароматом. Прекрасно сочетается с лёгкими закусками. Каждое сочетание приносит удовольствие и создаёт атмосферу настоящего немецкого пивного праздника!" },
  {id:3, text: "Будвайзер", price: "480 ₽", weight: "0,5 л", time:"10-15 минут", description:"Классическое светлое пиво с чистым и освежающим вкусом. Оно идеально сочетается с крылышками и бургерами, добавляя яркие эмоции к любому застолью." },
  {id:4, text: "Гиннес", price: "650 ₽", weight: "0,5 л", time:"10-15 минут", description:"Это не просто пиво, а целый ирландский сюрприз. Его тёмный цвет и плотная кремовая пена создают атмосферу отдыха. С нотками кофе и шоколада, это пиво заставляет ваши вкусовые рецепторы играть в унисон." },
  {id:5, text: "Corona Extra «0%»", price: "500 ₽", weight: "0,35 л", time:"10-15 минут", description:"Безалкогольная версия классического мексиканского пива, сохранившая свой освежающий и лёгкий вкус. С нотками цитрусовых и хмеля, этот напиток идеально подходит для дружеских встреч." },
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