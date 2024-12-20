import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Garnish.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Garnish = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGarnishes = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "garnish"));
        if (snapshot.exists()) {
          const garnishesData = snapshot.val();
          const garnishesArray = Object.keys(garnishesData).map(key => ({
            id: key,
            ...garnishesData[key],
          }));
          console.log("Fetched garnishes data:", garnishesArray);
          setCards(garnishesArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching garnishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGarnishes();
  }, []);

  const handleCardClick = (card) => {
    navigate('/garnishIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.hot}>
      <TopBar text={"Гарниры"} />
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
          <div className={s.noGarnishes}>No available garnishes</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Garnish;
