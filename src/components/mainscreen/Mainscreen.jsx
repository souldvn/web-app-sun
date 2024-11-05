import React from 'react'
import balls from '../../assets/icons/balls.svg'
import Carddeffault from '../carddeffault/Carddeffault'


import s from './mainscreen.module.css'

const Mainscreen = () => {
  return (
    <div className={s.mainscreen}>
        <div className={s.functionpanel}>
            <button className={s.balls}>
                <img src={balls} alt="balls" />
            </button>
        </div>
        <div className={s.variants}>
            <button className={s.buttonhost}>В ресторане</button>
            <button className={s.buttondelivery}>Доставка</button>
        </div>
        <div className={s.cardsContainer}>
            
            <Carddeffault text="Завтраки" />
            <Carddeffault text="Барная карта" />
            <Carddeffault text="Гриль & Мангал" />
            <Carddeffault text="Бургеры" />
            <Carddeffault text="Горячие блюда" />
            <Carddeffault text="Горячие закуски" />
            <Carddeffault text="Супы" />
            <Carddeffault text="Тесто" />
            <Carddeffault text="Холодные закуски" />
            <Carddeffault text="Гарниры" />
            <Carddeffault text="Мороженное" />
            <Carddeffault text="Соусы" />
            
        </div>
    </div>
  )
}

export default Mainscreen