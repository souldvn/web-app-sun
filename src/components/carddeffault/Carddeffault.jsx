import React from 'react'
import s from './carddeffault.module.css'

const Carddeffault = ({text}) => {
  return (
    <div className={s.carddeffault}>
    <p className={s.text}>{text}</p>
    </div>
  )
}

export default Carddeffault