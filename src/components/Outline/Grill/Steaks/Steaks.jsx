import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Steaks.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Steaks = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteaks = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "steaks"));
        if (snapshot.exists()) {
          const steaksData = snapshot.val();
          const steaksArray = Object.keys(steaksData).map(key => ({
            id: key,
            ...steaksData[key],
          }));
          console.log("Fetched steaks data:", steaksArray);
          setCards(steaksArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching steaks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteaks();
  }, []);

  const handleCardClick = (card) => {
    navigate('/steaksIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.steaks}>
      <TopBar text={"Стейки"} />
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
          <div className={s.noSteaks}>No available steaks</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Steaks;
