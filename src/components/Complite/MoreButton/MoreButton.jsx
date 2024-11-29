import React, { useState, useEffect } from 'react';
import s from './MoreButton.module.css';
import minus from '../../../assets/icons/minuscart.svg';
import plus from '../../../assets/icons/pluscart.svg';
import basket from '../../../assets/icons/basketpng.png';

const MoreButton = ({ onClose}) => {
  const [items, setItems] = useState([
    { id: 1, title: 'Сыр Чеддер', price: 50, weight: '50 г', count: 0 },
    { id: 2, title: 'Ветчина из индейки', price: 50, weight: '50 г', count: 0 },
    { id: 3, title: 'Сосиски из индейки', price: 50, weight: '60 г', count: 0 },
    { id: 4, title: 'Помидор свежий', price: 50, weight: '50 г', count: 0 },
    { id: 5, title: 'Огурец свежий', price: 50, weight: '50 г', count: 0 },
    { id: 6, title: 'Хлеб «Harrys»', price: 20, weight: '40 г', count: 0 },
  ]);



  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(s.overlay)) {
      onClose();
    }
  };

  const updateCount = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );
  };

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const isActive = totalCount > 0;

  

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.giftModal}>
        <div className={s.giftContent}>
          <div className={s.topbar}>
            <p>Дополнительно к завтраку</p>
          </div>
          <div className={s.dops}>
            {items.map((item) => (
              <div className={s.dop} key={item.id}>
                <div className={s.dopInfo}>
                  <div className={s.dopspace}>
                    <p className={s.title}>{item.title}</p>
                    <p className={s.price}>+ {item.price} руб</p>
                  </div>
                  <p className={s.weight}>{item.weight}</p>
                </div>
                <div className={s.lenght}>
                  <button
                    className={s.button}
                    onClick={() => updateCount(item.id, -1)}
                  >
                    <img className={s.icon} src={minus} alt="minus" />
                  </button>
                  <p className={s.itemCount}>{item.count}</p>
                  <button
                    className={s.button}
                    onClick={() => updateCount(item.id, 1)}
                  >
                    <img className={s.icon} src={plus} alt="plus" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${s.buttonContainer} ${isActive ? s.active : ''}`}
            disabled={!isActive}
            
          >
            <p>Добавить к заказу</p>
            {isActive && (
              <div className={s.basketWrapper}>
                <img className={s.basketIcon} src={basket} alt="basket" />
                <div className={s.badge}>{totalCount}</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreButton;
