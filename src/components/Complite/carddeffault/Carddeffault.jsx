import React from 'react';
import s from './carddeffault.module.css';

const Carddeffault = ({ text, onClick, img }) => {
  return (
    <div
      className={s.carddeffault}
      onClick={onClick}
      style={{ backgroundImage: `url(${img})` }}
    >
      <p className={s.text}>{text}</p>
    </div>
  );
};

export default Carddeffault;
