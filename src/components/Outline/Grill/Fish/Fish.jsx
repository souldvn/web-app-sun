import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Fish.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Fish = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "fish"));
        if (snapshot.exists()) {
          const fishData = snapshot.val();
          const fishArray = Object.keys(fishData).map(key => ({
            id: key,
            ...fishData[key],
          }));
          console.log("Fetched fish data:", fishArray);
          setCards(fishArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching fish:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFishData();
  }, []);

  const handleCardClick = (card) => {
    navigate('/fishIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.kebabs}>
      <TopBar text={"Рыба & морепродукты"} />
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
              compound={card.compound}
            />
          </div>
        )) : (
          <div className={s.noFish}>No available fish dishes</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Fish;
