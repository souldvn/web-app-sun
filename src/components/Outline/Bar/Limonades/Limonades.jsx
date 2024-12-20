import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Limonades.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Limonades = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLimonades = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "limonades")); // Adjust path to match your database structure
        if (snapshot.exists()) {
          const limonadesData = snapshot.val();
          const limonadesArray = Object.keys(limonadesData).map(key => ({
            id: key,
            ...limonadesData[key],
          }));
          console.log("Fetched limonades data:", limonadesArray);
          setCards(limonadesArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching limonades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLimonades();
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
      <TopBar text={"Лимонады"} />
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
          <div className={s.noDrinks}>No available limonades</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Limonades;
