import React from 'react';
import s from './TopBar.module.css';
import arrowback from '../../../assets/icons/arrowback.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const TopBar = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    // Проверяем текущий путь
    if (location.pathname === '/basket') {
      // Если мы находимся на странице корзины, возвращаемся в оформление
      navigate('/'); // Замените '/regrest' на путь, с которого пришли на страницу оформления
    } else if (text === 'Оформление') {
      // Если текст == "Оформление", то переходим в корзину
      navigate('/basket');
    } else {
      // В других случаях, просто возвращаемся назад в историю
      navigate(-1);
    }
  };

  return (
    <div className={s.top}>
      <button className={s.arrowback} onClick={handleBackClick}>
        <img src={arrowback} alt="arrowback" />
      </button>
      <p>{text}</p>
    </div>
  );
};

export default TopBar;
