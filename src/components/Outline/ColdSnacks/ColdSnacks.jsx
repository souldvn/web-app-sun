import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './ColdSnacks.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const ColdSnacks = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColdSnacks = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "coldsnaks"));
        if (snapshot.exists()) {
          const coldSnacksData = snapshot.val();
          const coldSnacksArray = Object.keys(coldSnacksData).map(key => ({
            id: key,
            ...coldSnacksData[key],
          }));
          console.log("Fetched cold snacks data:", coldSnacksArray);
          setCards(coldSnacksArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching cold snacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColdSnacks();
  }, []);

  const handleCardClick = (card) => {
    navigate('/coldsnacksIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.hot}>
      <TopBar text={"Холодные закуски"} />
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
          <div className={s.noColdSnacks}>No available cold snacks</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default ColdSnacks;
