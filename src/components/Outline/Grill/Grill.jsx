import React from 'react'
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    if (cardName === 'Шашлыки') {
      navigate('/kebabs');
    }
    if (cardName === 'Стейки') {
        navigate('/steaks');
      }
    if (cardName === 'Рыба & морепродукты') {
        navigate('/fish');
      }
  }



  return (
    <div className={s.grill}>
        <TopBar text={"Гриль & Мангал"}/>
        <div className={s.cardsContainer}>
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Grill