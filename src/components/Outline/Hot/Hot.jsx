import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Hot.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Hot = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotDishes = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "hot"));
        if (snapshot.exists()) {
          const hotDishesData = snapshot.val();
          const hotDishesArray = Object.keys(hotDishesData).map(key => ({
            id: key,
            ...hotDishesData[key],
          }));
          console.log("Fetched hot dishes data:", hotDishesArray);
          setCards(hotDishesArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching hot dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotDishes();
  }, []);

  const handleCardClick = (card) => {
    navigate('/hotbIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.hot}>
      <TopBar text={"Горячие блюда"} />
      <div className={s.cardsContainer}>
        {cards.length > 0 ? cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)} className={s.cardItem}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
              description={card.description} 
              time={card.time} 
            />
          </div>
        )) : (
          <div className={s.noHotDishes}>No available hot dishes</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Hot;
