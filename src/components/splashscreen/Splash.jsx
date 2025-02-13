
import React from 'react';
import splashImg from '../../assets/img/splash.svg';
import s from './splash.module.css';

const Splash = () => {
  return (
    <div className={s.splashContainer}>
      <img className={s.splash} src={splashImg} alt="splash" />
      <a className={s.link} href="https://t.me/redigitalapps">Разработано <b>RE DIGITAL</b></a>
    </div>
  );
}

export default Splash;