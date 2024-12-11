import React from 'react';
import TopBar from '../../../Complite/TopBar/TopBar';
import s from './Time.module.css';
import next from '../../../../assets/icons/next.svg';
import { useNavigate } from 'react-router-dom';

const Time = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={s.day}>
      <TopBar text="Время бронирования" />
      <div className={s.timecontainer}>
        <div className={s.time} onClick={() => handleClick('/morning')}>
          <p>Утро</p>
          <img src={next} alt="next"  />
        </div>
        <div className={s.time} onClick={() => handleClick('/day')}>
          <p>День</p>
          <img src={next} alt="next" />
        </div>
        <div className={s.time}  onClick={() => handleClick('/evening')}>
          <p>Вечер</p>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default Time;
