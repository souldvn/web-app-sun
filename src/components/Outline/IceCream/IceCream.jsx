import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './IceCream.module.css';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { database } from '../../../firebaseConfig'; // Import database from firebaseConfig

const IceCream = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIceCreams = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "icecreams"));
        if (snapshot.exists()) {
          const iceCreamsData = snapshot.val();
          const iceCreamsArray = Object.keys(iceCreamsData).map(key => ({
            id: key,
            ...iceCreamsData[key],
          }));
          console.log("Fetched ice creams data:", iceCreamsArray);
          setCards(iceCreamsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching ice creams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIceCreams();
  }, []);

  const handleCardClick = (card) => {
    navigate('/iceIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.iceCreams}>
      <TopBar text={"Мороженое"} />
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
          <div className={s.noIceCreams}>No available ice creams</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default IceCream;
