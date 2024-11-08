import React from 'react'
import s from './Grill.module.css'
import Carddeffault from '../../Complite/carddeffault/Carddeffault'
import TopBar from '../../Complite/TopBar/TopBar'
import CartButton from '../../Complite/CartButton/CartButton'



const cards = [
    "Шашлыки", 
    "Стейки",
    "Рыба & морепродукты"
  ];


const Grill = () => {
  return (
    <div className={s.grill}>
        <TopBar text={"Гриль & Мангал"}/>
        <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Grill