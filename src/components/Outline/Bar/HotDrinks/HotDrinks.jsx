import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './HotDrinks.module.css'; // Corrected CSS import path
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const HotDrinks = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotDrinks = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "hotdrinks")); // Changed path to "hotdrinks"
        if (snapshot.exists()) {
          const hotDrinksData = snapshot.val();
          const hotDrinksArray = Object.keys(hotDrinksData).map(key => ({
            id: key,
            ...hotDrinksData[key],
          }));
          console.log("Fetched hot drinks data:", hotDrinksArray);
          setCards(hotDrinksArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching hot drinks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotDrinks();
  }, []);

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.drinks}>
      <TopBar text={"Горячие напитки"} />
      <div className={s.cardsContainer}>
        {cards.length > 0 ? cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)} className={s.cardItem}>
            <CardPrice 
              img={card.img}
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
              description={card.description} 
              time={card.time} 
            />
          </div>
        )) : (
          <div className={s.noDrinks}>No available hot drinks</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default HotDrinks;
