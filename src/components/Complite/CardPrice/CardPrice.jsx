import React from 'react'
import plus from '../../../assets/icons/plus.svg'
import s from './CardPrice.module.css'

const CardPrice = ({price, text, weight, onClick}) => {
  return (
    <div className={s.cardprice}>
        <div className={s.foto}></div>
        <div className={s.infosmall}>
            <p className={s.price}>{price}</p>
            <p className={s.text}>{text}</p>
            <p className={s.weight}>{weight}</p>

      <button className={s.button}>
            <img src={plus} alt="plus" />
            <p>Добавить</p>
        </button>      
        </div>
        
        
    </div>
  )
}

export default CardPrice