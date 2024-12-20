import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Coffe.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Coffe = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffe = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "coffee"));
        if (snapshot.exists()) {
          const coffeData = snapshot.val();
          const coffeArray = Object.keys(coffeData).map(key => ({
            id: key,
            ...coffeData[key],
          }));
          console.log("Fetched coffe data:", coffeArray);
          setCards(coffeArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching coffe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffe();
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
      <TopBar text={"Кофе"} />
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
          <div className={s.noDrinks}>No available coffe</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Coffe;
