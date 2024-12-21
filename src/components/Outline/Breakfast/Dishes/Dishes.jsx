import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database"; // Импорт ref, get, и child
import s from './Dishes.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig'; // Импорт database из firebaseConfig

const Dishes = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [extras, setExtras] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "dishes"));
        if (snapshot.exists()) {
          const dishesData = snapshot.val();
          const dishesArray = Object.keys(dishesData).map(key => ({
            id: key,
            ...dishesData[key],
          }));
          console.log("Fetched dishes data:", dishesArray);
          setCards(dishesArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError(error);
        console.error("Ошибка при получении блюд:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleExtrasChange = (id, newExtras) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [id]: newExtras,
    }));
  };

  const handleCardClick = (card) => {
    navigate('/inline', { state: { dish: card, fromRecomendations: false } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  return (
    <div className={s.dishes}>
      <TopBar text={"Блюда"} />
      <div className={s.cardsContainer}>
        {cards.length > 0 ? cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)} className={s.cardItem}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
              img={card.img}
              description={card.description} 
              time={card.time} 
              compound={card.compound} 
              extraPrice={extras[card.id]?.totalPrice || 0}
              onExtrasChange={(newExtras) => handleExtrasChange(card.id, newExtras)}
            />
          </div>
        )) : (
          <div className={s.noDishes}>Нет доступных блюд</div>
        )}
      </div>
      <CartButton />
    </div>
  );
};

export default Dishes;
