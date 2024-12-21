import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Soups.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Soups = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoups = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "soups"));
        if (snapshot.exists()) {
          const soupsData = snapshot.val();
          const soupsArray = Object.keys(soupsData).map(key => ({
            id: key,
            ...soupsData[key],
          }));
          console.log("Fetched soups data:", soupsArray);
          setCards(soupsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching soups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoups();
  }, []);

  const handleCardClick = (card) => {
    navigate('/soupsIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.soups}>
      <TopBar text={"Супы"} />
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
          <div className={s.noSoups}>No available soups</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Soups;
