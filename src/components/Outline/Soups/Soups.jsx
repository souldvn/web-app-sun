import React from 'react'
import s from './Soups.module.css'
import TopBar from '../../Complite/TopBar/TopBar'
import CartButton from '../../Complite/CartButton/CartButton'
import CardPrice from '../../Complite/CardPrice/CardPrice'


const cards = [
    { text: "Том-ям из морепродуктов", price: "600 ₽", weight: "470 г" },
    { text: "Суп-лапша куриная", price: "350 ₽", weight: "380 г" },
    { text: "Шурпа", price: "450 ₽", weight: "355г" },
    { text: "Крем-суп с белыми грибами", price: "400 ₽", weight: "320 г" },
    { text: "Тыквенный крем-суп с креветками", price: "500 ₽", weight: "350 г" },
    { text: "Минестроне", price: "350 ₽", weight: "380 г" }
    
  
    
  
  ];
const Soups = () => {
  return (
    <div className={s.soups}>
        <TopBar text={"Супы"} />
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

export default Soups