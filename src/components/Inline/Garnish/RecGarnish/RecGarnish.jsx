import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecGarnish.module.css';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../Complite/CartButton/CartButton';
import { ref, get, child } from "firebase/database";
import { database } from '../../../../firebaseConfig';
import { useState, useEffect } from 'react';



const RecGarnish = ({isAddButtonDisabled}) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "recfgarnish")); // Измените путь на "recomendations"
        if (snapshot.exists()) {
          const recomendationsData = snapshot.val();
          const recomendationsArray = Object.keys(recomendationsData).map(key => ({
            id: key,
            ...recomendationsData[key],
          }));
          console.log("Fetched recomendations data:", recomendationsArray);
          setCards(recomendationsArray);
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

    fetchRecomendations();
  }, []);

  const handleCardClick = (card) => {
    navigate('/garnishIn', { state: { dish: card, fromRecomendations: true, isAddButtonDisabled } });
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
              img={card.img}
            />
          </div>
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default RecGarnish;