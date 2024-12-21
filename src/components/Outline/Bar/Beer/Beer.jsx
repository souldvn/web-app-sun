import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Beer.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Beer = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "beers"));
        if (snapshot.exists()) {
          const beersData = snapshot.val();
          const beersArray = Object.keys(beersData).map(key => ({
            id: key,
            ...beersData[key],
          }));
          console.log("Fetched beers data:", beersArray);
          setCards(beersArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching beers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const handleCardClick = (card) => {
    navigate('/barhot', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.drinks}>
      <TopBar text={"Пиво"} />
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
          <div className={s.noDrinks}>No available beers</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Beer;
