import React from 'react'
import { useNavigate } from 'react-router-dom';
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



  const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    if (cardName === 'Холодные напитки') {
      navigate('/colddrinks');
    }
    if (cardName === 'Лимонады') {
      navigate('/limonades');
    }
    if (cardName === 'Кофе') {
      navigate('/coffee');
    }
    if (cardName === 'Чай классический') {
      navigate('/tea');
    }
    if (cardName === 'Фирменные чаи & горячие напитки') {
      navigate('/comtea');
    }
    if (cardName === 'Пиво & пивные напитки') {
      navigate('/beer');
    }
  }

  return (
    <div className={s.bar}>
        <TopBar text={"Барная карта"}/>
        <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Bar