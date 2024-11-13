import React from 'react';
import s from './ButtonBasket.module.css';

const ButtonBasket = ({ isEmpty }) => {
  return (
    <div className={s.buttonarea}>
      <button 
        className={`${s.cartbutton} ${isEmpty ? s.empty : ''}`} 
      >
        Перейти к оформлению
      </button>
    </div>
  );
};

export default ButtonBasket;
