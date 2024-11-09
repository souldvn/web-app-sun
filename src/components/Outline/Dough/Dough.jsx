import React from 'react'
import s from './Dough.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Хачапури по аджарски", price: "500₽", weight: "390г" },
  { text: "Хачапури по мегрельски", price: "450₽", weight: "370г" },
  { text: "Пирог с сыром и зеленью", price: "400₽", weight: "310г" },
  { text: "Пирог с картофелем и сыром", price: "350₽", weight: "400г" },
  { text: "Пирог с бараниной", price: "650₽", weight: "440г" },
  { text: "Пирог с курицей", price: "450₽",  weight: "440г" },
  { text: "Хычин с сыром и зеленью", price: "400₽",  weight: "325/50г" },
  { text: "Хычин с картофелем и сыром", price: "370₽",  weight: "400/50г" },
  { text: "Хычин с мясом", price: "650₽",  weight: "395/50г" },
  { text: "Хлеб домашний", price: "200₽",  weight: "200г" }
];
const Dough = () => {
  return (
    <div className={s.dough}>
        <TopBar text={"Тесто"} />
      <div className={s.cardsContainer}>
        {cards.map((card, index) => (
          <CardPrice 
            key={index} 
            text={card.text} 
            price={card.price} 
            weight={card.weight} 
          />
        ))}
      </div>
      <CartButton />
    </div>
  )
}

export default Dough