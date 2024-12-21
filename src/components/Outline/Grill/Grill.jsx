import React from 'react'
import { useNavigate } from 'react-router-dom';
import s from './Grill.module.css'
import Carddeffault from '../../Complite/carddeffault/Carddeffault'
import TopBar from '../../Complite/TopBar/TopBar'
import CartButton from '../../Complite/CartButton/CartButton'



const cards = [
 {
    text: "Шашлыки",
    img: "https://github.com/souldvn/SunVillImg/blob/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Shashliki.jpg?raw=true",
  },
  {
    text: "Стейки",
    img: "https://github.com/souldvn/SunVillImg/blob/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Steiki.jpg?raw=true",
  },
  {
    text: "Рыба & морепродукты",
    img: "https://github.com/souldvn/SunVillImg/blob/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Riba%20i%20moreprodukti.jpg?raw=true",
  }
]


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
        {cards.map(({text, img}, index ) => (
          <Carddeffault key={index} img={img} text={text} onClick={() => handleCardClick(text)} />
        ))}
      </div>
      <CartButton/>
    </div>
  )
}

export default Grill