import React, { useState, useEffect } from 'react';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../carddeffault/Carddeffault';
import s from './mainscreen.module.css';

const Mainscreen = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const cards = [
    "Завтраки", 
    "Барная карта", 
    "Гриль & Мангал", 
    "Бургеры",
    "Горячие блюда", 
    "Горячие закуски", 
    "Супы", 
    "Салаты",
    "Тесто", 
    "Холодные закуски", 
    "Гарниры", 
    "Мороженное", 
    "Соусы"
  ];


  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Проверка, достиг ли пользователь низа страницы
    if (scrollTop + windowHeight >= documentHeight - 20) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        {cards.map((text, index) => (
          <Carddeffault key={index} text={text} />
        ))}
      </div>
        <div className={s.buttonarea}>
          <button className={s.cartbutton}>
                
                    В корзину               
            
          </button> 
      </div>
    </div>
  );
};

export default Mainscreen;
