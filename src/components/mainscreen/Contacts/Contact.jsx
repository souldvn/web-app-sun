import React from 'react'
import TopBar from '../../Complite/TopBar/TopBar'
import s from './contacts.module.css'
const Contact = () => {
  return (
    <div className={s.contact}>
        <TopBar text={'Реквизиты и контактные данные'} />
        <div className={s.info}>
    <p>Индивидуальный Предприниматель Гришина Елена Владимировна</p>
    <p>Юридический адрес: Московская область, г.о. Клин, д. Афанасово, 3-я Солнечная дом 21</p>
    <p>Email: <a className={s.link} href="mailto:sunvillage.arkhyz@gmail.com">sunvillage.arkhyz@gmail.com</a></p>
    <p>Сайт: <a className={s.link} href="https://sunvillage-6aec8.web.app/" target="_blank" rel="noopener noreferrer">https://sunvillage-6aec8.web.app/</a></p>
    <p>ИНН/КПП: 773471886205/ -</p>
    <p>ОГРНИП: 321508100472467</p>
    <p>Банковские реквизиты:</p>
    <p>Расчётный счёт: 40802810840000128557</p>
    <p>БИК: 044525225</p>
    <p>Банк: СБЕРБАНК</p>
    <p>Корр. Счёт: 30101810400000000225</p>
</div>
    </div>
  )
}

export default Contact