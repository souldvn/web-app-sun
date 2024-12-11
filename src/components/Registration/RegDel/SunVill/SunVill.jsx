import React from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './SunVill.module.css';
import next from '../../../../assets/icons/next.svg';
import { useNavigate } from 'react-router-dom';

const SunVill = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={s.day}>
      <TopBar text="Sun Village Arkhyz" />
      <div className={s.timecontainer}>
        <div className={s.time} onClick={() => handleClick('/flatdel')}>
          <p>Доставка в номер</p>
          <img src={next} alt="next"  />
        </div>
        <div className={s.time} onClick={() => handleClick('/housedel')}>
          <p>Доставка в дом</p>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default SunVill;
