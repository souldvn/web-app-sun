import React from 'react'
import s from './TopBar.module.css'
import arrowback from '../../../assets/icons/arrowback.svg'
import { useNavigate } from 'react-router-dom';

const TopBar = ({text}) => {

    const navigate = useNavigate();


  return (
    <div className={s.top}>
          <button className={s.arrowback} onClick={() => navigate(-1)}>
             <img src={arrowback} alt="arrowback" />
          </button>
         <p>{text}</p>
        </div>
  )
}

export default TopBar