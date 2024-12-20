import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Dough.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Dough = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDough = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "dough"));
        if (snapshot.exists()) {
          const doughData = snapshot.val();
          const doughArray = Object.keys(doughData).map(key => ({
            id: key,
            ...doughData[key],
          }));
          console.log("Fetched dough data:", doughArray);
          setCards(doughArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching dough:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDough();
  }, []);

  const handleCardClick = (card) => {
    navigate('/doughIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.dough}>
      <TopBar text={"Тесто"} />
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
          <div className={s.noDough}>No available dough</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Dough;
