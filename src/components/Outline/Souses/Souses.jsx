import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database";
import s from './Souses.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Adjust path if necessary

const Souses = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSouses = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "souses"));
        if (snapshot.exists()) {
          const sousesData = snapshot.val();
          const sousesArray = Object.keys(sousesData).map(key => ({
            id: key,
            ...sousesData[key],
          }));
          console.log("Fetched souses data:", sousesArray);
          setCards(sousesArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching souses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSouses();
  }, []);

  const handleCardClick = (card) => {
    navigate('/sousesIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.steaks}>
      <TopBar text={"Соусы"} />
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
          <div className={s.noSouses}>No available souses</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Souses;
