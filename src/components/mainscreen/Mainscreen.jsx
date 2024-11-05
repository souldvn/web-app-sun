import React, { useState } from 'react';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../carddeffault/Carddeffault';
import s from './mainscreen.module.css';

const Mainscreen = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className={s.mainscreen}>
      <div className={s.functionpanel}>
        <button className={s.balls}>
          <img src={balls} alt="balls" />
        </button>
      </div>
      <div className={s.variants}>
        <button
          className={`${s.buttonhost} ${activeButton === 'host' ? s.active : ''}`}
          onClick={() => handleButtonClick('host')}
        >
          В ресторане
        </button>
        <button
          className={`${s.buttondelivery} ${activeButton === 'delivery' ? s.active : ''}`}
          onClick={() => handleButtonClick('delivery')}
        >
          Доставка
        </button>
      </div>
      <div className={s.cardsContainer}>
        <div className={s.block}>
            <Carddeffault text="Завтраки" />
        <Carddeffault text="Барная карта" />
        </div>
        <div className={s.block}>
            <Carddeffault text="Гриль & Мангал" />
        <Carddeffault text="Бургеры" />
        </div>
        <div className={s.block}>
            <Carddeffault text="Горячие блюда" />
        <Carddeffault text="Горячие закуски" />
        </div>
        <div className={s.block}>
        <Carddeffault text="Супы" />
        <Carddeffault text="Тесто" />    
        </div>
        <div className={s.block}>
        <Carddeffault text="Холодные закуски" />
        <Carddeffault text="Гарниры" />    
        </div>
        <div className={s.block}>
          <Carddeffault text="Мороженное" />
        <Carddeffault text="Соусы" />  
        </div>
        
      </div>
    </div>
  );
};

export default Mainscreen;