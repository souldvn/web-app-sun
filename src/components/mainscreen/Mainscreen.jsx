import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Contextes/CartContext';
import { database, ref, get, child } from '../../firebaseConfig'; 
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';

const Mainscreen = () => {
  const { selectedOption, setOption } = useContext(CartContext);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOption = localStorage.getItem('activeButton') || 'host';
    setOption(savedOption);

    // Получение данных из ветки 'cards' в Realtime Database
    const fetchCards = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'cards')); // Чтение данных из ветки 'cards'
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Преобразование объектов Firebase в массив без сортировки
          const formattedCards = Object.entries(data).map(([name, details]) => ({
            name,
            ...details,
          }));
          // Фильтрация карты по порядку из JSON
          const orderedCards = formattedCards.sort((a, b) => {
            const order = ['Завтраки', 'Барная карта', 'Гриль & Мангал', 'Бургеры', 'Горячие блюда', 'Горячие закуски', 'Супы', 'Салаты', 'Тесто', 'Холодные закуски', 'Гарниры', 'Мороженное', 'Соусы'];
            return order.indexOf(a.name) - order.indexOf(b.name);
          });
          setCards(orderedCards);
        } else {
          console.log('No data available in the cards node.');
        }
      } catch (error) {
        console.error('Error fetching cards from database:', error);
      }
    };

    fetchCards();
  }, [setOption]);

  const handleButtonClick = (option) => {
    setOption(option);
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  const filteredCards = selectedOption === 'delivery'
    ? cards.filter((card) => card.name !== 'Завтраки') // Фильтруем "Завтраки" в режиме доставки
    : cards;

  return (
    <div className={s.mainscreen}>
      <div className={s.functionpanel}>
        <button className={s.balls}>
          <img src={balls} alt="balls" />
        </button>
      </div>
      <div className={s.variants}>
        <button
          className={`${s.buttonhost} ${selectedOption === 'host' ? s.active : ''}`}
          onClick={() => handleButtonClick('host')}
        >
          В ресторане
        </button>
        <button
          className={`${s.buttondelivery} ${selectedOption === 'delivery' ? s.active : ''}`}
          onClick={() => handleButtonClick('delivery')}
        >
          Доставка
        </button>
      </div>

      <div className={s.cardsContainer}>
        {filteredCards.map((card, index) => (
          <Carddeffault key={index} text={card.name} onClick={() => handleCardClick(card.route)} />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Mainscreen;
