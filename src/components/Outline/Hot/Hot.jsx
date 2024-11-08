import React from 'react'
import s from './Hot.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Медальоны из телятины в сливочно-горчичном соусе", price: "770₽", weight: "220г" },
  { text: "Семга в сливочно-икорном соусе", price: "850₽", weight: "180/150г" },
  { text: "Томленные говяжьи щечки под соусом Демиглас", price: "650₽", weight: "350/150г" },
  { text: "Соте из морепродуктов", price: "750₽", weight: "350г" },
  { text: "Жаркое с курицей", price: "400₽", weight: "320г" },
  { text: "Жаркое с бараниной", price: "500₽", weight: "340г" },
  { text: "Жаркое с говядиной", price: "550₽",  weight: "330г" }

];

const Hot = () => {
  return (
    <div className={s.hot}>
        <TopBar text={"Горячие блюда"} />
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

export default Hot