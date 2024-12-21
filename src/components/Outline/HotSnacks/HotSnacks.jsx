import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './HotSnacks.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const HotSnacks = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotSnacks = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "hotsnacks"));
        if (snapshot.exists()) {
          const hotSnacksData = snapshot.val();
          const hotSnacksArray = Object.keys(hotSnacksData).map(key => ({
            id: key,
            ...hotSnacksData[key],
          }));
          console.log("Fetched hot snacks data:", hotSnacksArray);
          setCards(hotSnacksArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching hot snacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotSnacks();
  }, []);

  const handleCardClick = (card) => {
    navigate('/hotsnacksIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.hotSnacks}>
      <TopBar text={"Горячие закуски"} />
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
          <div className={s.noHotSnacks}>No available hot snacks</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default HotSnacks;
