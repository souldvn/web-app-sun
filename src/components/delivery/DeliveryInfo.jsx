import React from 'react'
import s from './delivery.module.css'
import dostavka from '../../assets/icons/dostavka.svg'
import location from '../../assets/icons/location.svg'
import hotels from '../../assets/icons/hotels.svg'
import breakfast from '../../assets/icons/breakfast.svg'
import deldrinks from '../../assets/icons/deldrinks.svg'
import timedel from '../../assets/icons/timedel.svg'
import TopBar from '../Complite/TopBar/TopBar'

const DeliveryInfo = () => {
  return (
    <div className={s.delivery}>
      <TopBar text="Условия доставки"/>
      <div className={s.cards}>
        <div className={s.card}>
          <img className={s.img} src={dostavka} alt="dostavka" />
          <div className={s.content}>
            <p className={s.title}>Рабочее время доставки</p>
            <p className={s.text}>11:00–21:00 в рабочие часы ресторана</p>
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={location} alt="location" />
          <div className={s.content}>
            <p className={s.title}>Локации доставки</p>
            <p className={s.text}>Доставка на территории Sun Village Arkhyz и в другие отели</p>
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={hotels} alt="hotels" />
          <div className={s.content}>
            <p className={s.title}>Отели с доставкой</p>
            <p className={s.remark}>От 1 500 ₽</p>
            <p className={s.text}>При минимальной сумме заказа из ресторана от 1 500 ₽ в парк-отеле Sun Village Arkhyz доставка 700 ₽</p>
            <p className={s.remark}>От 3 000 ₽</p>
            <p className={s.text}>При минимальной сумме заказа из ресторана от 3 000 ₽ в другие отели доставка 700 ₽ </p>
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={timedel} alt="time" />
          <div className={s.content}>
          <p className={s.title}>Время доставки</p>

            <p className={s.remark}>На территории Sun Village Arkhyz</p>
            <p className={s.text}>10 минут + время приготовления</p>
            <p className={s.remark}>За пределами Sun Village Arkhyz</p>
            <p className={s.text}>От 30 до 60 минут + время приготовления</p>
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={breakfast} alt="breakfast" />
          <div className={s.content}>
            <p className={s.title}>Доставка завтраков</p>
            <p className={s.text}>Завтраки без доставки, только при личном посещении ресторана</p>
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={deldrinks} alt="deldrinks" />
          <div className={s.content}>
            <p className={s.title}>Доставка напитков</p>
            <p className={s.text}>Доставляем кофе, соки, пиво и пивные напитки в бутылках: кола, фанта, спрайт, вода б/г, вода с газом, лимонады натахтари, пиво и сидры. Чай в чайниках, горячие напитки и домашние лимонады можно приобрести, забронировав столик в ресторане</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryInfo