import React from 'react'
import Carddeffault from '../../Complite/carddeffault/Carddeffault'
import s from './Breakfast.module.css'
import CartButton from '../../Complite/CartButton/CartButton';
import TopBar from '../../Complite/TopBar/TopBar';



const cards = [
    "Блюда", 
    "Напитки" 
  ];

const Breakfast = () => {

    

  return (
    <div className={s.breakfast}>
        
        <TopBar text={"Завтраки"}/>
        <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Breakfast