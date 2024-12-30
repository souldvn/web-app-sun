import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecomHot.module.css';
import CardPrice from '../../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../../Complite/CartButton/CartButton';
import { ref, get, child } from "firebase/database";
import { database } from '../../../../../firebaseConfig';

const RecomHot = ({isAddButtonDisabled}) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "hotsnacks")); // Замените "hotDishes" на правильный путь в вашей базе данных
        if (snapshot.exists()) {
          const recommendationsData = snapshot.val();
          const recommendationsArray = Object.keys(recommendationsData).map(key => ({
            id: key,
            ...recommendationsData[key],
          }));
          console.log("Fetched recommendations data:", recommendationsArray);
          setCards(recommendationsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Ошибка при получении рекомендаций:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleCardClick = (card) => {
    navigate('/barhot', { state: { dish: card, fromRecomendations: true, isAddButtonDisabled } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  return (
    <div className={s.drinks}>
      <p className={s.rec}>Дополнительно рекомендуем</p>
      <div className={s.cardsContainer}>
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card)}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
              img={card.img} // Убедитесь, что поле img есть в базе данных
            />
          </div>
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default RecomHot;
