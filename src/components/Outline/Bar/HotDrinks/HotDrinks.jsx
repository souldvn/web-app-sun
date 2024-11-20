import React from 'react'
import s from './HotDrinks.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';
const cards = [
  { text: "Глинтвейн", price: "520 ₽", weight: "0,25 л", time:"10-15 минут", description:"Его аромат сочетает нотки корицы, гвоздики и цитрусовых, создавая атмосферу уюта и тепла. Глинтвейн идеально подходит для холодных вечеров, согревая и поднимая настроение в компании друзей." },
  { text: "Имбирно-лимонный", price: "580 ₽", weight: "1 л", time:"10-15 минут", description:"Согревающий напиток, который сочетает пряный вкус свежего имбиря и яркую кислинку лимона. Горячий и ароматный, он дарит уют и расслабление, идеально подходя для холодных вечеров. Такой напиток не только радует своим вкусом, но и укрепляет иммунитет, наполняя энергией и свежестью." },
  { text: "Облепиховый", price: "580 ₽", weight: "1 л", time:"10-15 минут", description:"Приготовленный из свежих ягод облепихи, он не только согревает, но и насыщает организм витаминами. Этот ароматный напиток станет отличным выбором для холодных дней, придавая силы и поднимая настроение." },
  { text: "Горный с ягодами", price: "520 ₽", weight: "1 л", time:"10-15 минут", description:"Сочетает свежесть горных трав и насыщенный вкус лесных ягод. Согревает, придавая силы и наполняя бодростью в любое время дня. Отличный выбор для тех, кто хочет насладиться природной гармонией и получить заряд витаминов." },
  { text: "Пряные горы", price: "500 ₽", weight: "1 л", time:"10-15 минут", description:"Переносит вас в высокие горы с их свежим воздухом и умиротворяющей природой. Идеален для согревающих вечеров, он дарит уют и помогает расслабиться, наполняя тело энергией и теплом." },
];
const HotDrinks = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };

  return (
    <div className={s.drinks}>
      <TopBar text={"Горячие напитки"} />
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

export default HotDrinks