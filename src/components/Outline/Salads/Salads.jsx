import React from 'react'
import s from './Salads.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Цезарь с курицей", price: "500₽", weight: "230г" },
  { text: "Цезарь с креветками", price: "750₽", weight: "230г" },
  { text: "Цезарь с сёмгой", price: "850₽", weight: "230г" },
  { text: "Салат из свежих овощей", price: "400₽", weight: "275г" },
  { text: "Салат из томатов с сыром, луком и кинзой", price: "450₽", weight: "220г" },
  { text: "Хоровац", price: "550₽",  weight: "280г" },
  { text: "Тёплый салат с телятиной", price: "810₽",  weight: "350г" },
  { text: "Де — руккола с креветками", price: "780₽",  weight: "250г" },
  { text: "Салат с хрустящими баклажанами", price: "550₽",  weight: "310г" }

];
const Salads = () => {
  return (
    <div className={s.salads}>
        <TopBar text={"Салаты"} />
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

export default Salads