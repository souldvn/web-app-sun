import React from 'react'
import s from './Bar.module.css'
import Carddeffault from '../../Complite/carddeffault/Carddeffault'
import TopBar from '../../Complite/TopBar/TopBar'
import CartButton from '../../Complite/CartButton/CartButton'



const cards = [
    "Холодные напитки", 
    "Лимонады",
    "Кофе",
    "Чай классический" ,
    "Фирменные чаи & горячие напитки",
    "Пиво & пивные напитки" 
  ];

const Bar = () => {
  return (
    <div className={s.bar}>
        <TopBar text={"Барная карта"}/>
        <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Bar