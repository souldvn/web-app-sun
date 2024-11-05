
import React from 'react';
import splashImg from '../../assets/img/splash.svg';
import s from './splash.module.css';

const Splash = () => {
  return (
    <div className={s.splashContainer}>
      <img className={s.splash} src={splashImg} alt="splash" />
    </div>
  );
}

export default Splash;