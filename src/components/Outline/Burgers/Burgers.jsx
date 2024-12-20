import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Burgers.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Burgers = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "burgers"));
        if (snapshot.exists()) {
          const burgersData = snapshot.val();
          const burgersArray = Object.keys(burgersData).map(key => ({
            id: key,
            ...burgersData[key],
          }));
          console.log("Fetched burgers data:", burgersArray);
          setCards(burgersArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching burgers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  const handleCardClick = (card) => {
    navigate('/burgersIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.burgers}>
      <TopBar text={"Бургеры"} />
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
          <div className={s.noBurgers}>No available burgers</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Burgers;
