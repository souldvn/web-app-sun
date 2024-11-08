import React from 'react'
import s from './carddeffault.module.css'

const Carddeffault = ({text, onClick}) => {
  return (
    <div className={s.carddeffault} onClick={onClick}>
    <p className={s.text}>{text}</p>
    </div>
  )
}

export default Carddeffault