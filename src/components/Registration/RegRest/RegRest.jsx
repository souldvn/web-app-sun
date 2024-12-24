import React from 'react';
import TopBar from '../../Complite/TopBar/TopBar';
import s from './RegRest.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



const RegRest = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { time } = state;
    const totalPrice = state.totalPrice;

    const handlePayment = async () => {
      console.log('Функция handlePayment вызвана');
      const idempotenceKey = uuidv4(); // Генерация уникального Idempotence Key
      console.log('Idempotence Key:', idempotenceKey); // Логируем сгенерированный ключ
    
      try {
        const response = await fetch('https://sunvillrest.netlify.app/.netlify/functions/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': idempotenceKey, // Передаем ключ идемпотентности
          },
          body: JSON.stringify({
            totalPrice, // Передаем сумму
            orderType: 'delivery', // Тип заказа
            comment: 'Комментарий к заказу', // Если нужно
          }),
          mode: 'cors', // Убедитесь, что режим CORS включен

        });
    
        const data = await response.json();
        console.log('Ответ от сервера:', data);
    
        if (response.ok) {
          const confirmationUrl = data.confirmationUrl; // Получаем URL для перенаправления
          window.location.href = confirmationUrl; // Перенаправляем пользователя на страницу оплаты Юкассы
        } else {
          alert(`Ошибка: ${data.message}`);
        }
      } catch (error) {
        console.error('Ошибка оплаты:', error);
        alert('Произошла ошибка при создании платежа. Попробуйте снова.');
      }
    };
    
    
    
    
    
    


    const handleClick = (path) => {
      navigate(path, { state: { time, totalPrice } });
    };

    return (
      <div className={s.rest}>
        <TopBar text="Оформление" />
        <div className={s.restform}>
          <input onClick={() => handleClick('/time')} className={s.input} type="text" placeholder='Выберите время' value={time || ''} readOnly />
          <input className={s.input} type="number" placeholder='Укажите количество гостей' />
          <input className={s.input} type="tel" placeholder='Номер телефона для связи' />
          <input className={s.input} type="text" placeholder='Комментарий к заказу' />
        </div>
        <div className={s.option}> 
          <p>Самовывоз</p>
          <input type="checkbox" id="checkbox" />
        </div>
        <div className={s.price}>
          <p>Итоговая цена</p>
          <p>{totalPrice || 0} ₽</p>
        </div>
        <div className={s.result}>
          <p>{totalPrice || 0} ₽</p>
          <button className={s.pay} onClick={handlePayment}>Оплатить</button>
        </div>
      </div>
    );
};

export default RegRest;
