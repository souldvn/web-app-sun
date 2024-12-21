import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Salads.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const Salads = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "salads"));
        if (snapshot.exists()) {
          const saladsData = snapshot.val();
          const saladsArray = Object.keys(saladsData).map(key => ({
            id: key,
            ...saladsData[key],
          }));
          console.log("Fetched salads data:", saladsArray);
          setCards(saladsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching salads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalads();
  }, []);

  const handleCardClick = (card) => {
    navigate('/saladsIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.salads}>
      <TopBar text={"Салаты"} />
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
          <div className={s.noSalads}>No available salads</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Salads;
