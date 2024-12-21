import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Import ref, get, and child
import s from './Kebabs.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Import database from firebaseConfig

const Kebabs = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKebabs = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "kebabs"));
        if (snapshot.exists()) {
          const kebabsData = snapshot.val();
          const kebabsArray = Object.keys(kebabsData).map(key => ({
            id: key,
            ...kebabsData[key],
          }));
          console.log("Fetched kebabs data:", kebabsArray);
          setCards(kebabsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching kebabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKebabs();
  }, []);

  const handleCardClick = (card) => {
    navigate('/kebabIn', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.kebabs}>
      <TopBar text={"Шашлыки"} />
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
          <div className={s.noKebabs}>No available kebabs</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Kebabs;
