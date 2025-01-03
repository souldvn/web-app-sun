import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from "firebase/database";
import s from './Kebabs.module.css';
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { database } from '../../../../firebaseConfig';

const Kebabs = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
  const [modalContent, setModalContent] = useState(''); // Текст модального окна

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "kebabs"));
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

    // Открываем модальное окно при монтировании компонента
    setModalContent('Внимание! Цена указана за 100г продукта');
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (card) => {
    navigate('/kebabIn', { state: { dish: card } });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  return (
    <div className={s.dishes}>
      <TopBar text={"Шашлыки"} />
      <div className={s.cardsContainer}>
        {cards.length > 0 ? cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)} className={s.cardItem}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
              img={card.img}
              description={card.description}
            />
          </div>
        )) : (
          <div className={s.noDishes}>Нет доступных блюд</div>
        )}
      </div>
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <span className={s.closeButton} onClick={closeModal}>×</span>
            <div className={s.info}>
              <p className={s.modalText}>{modalContent}</p>
            </div>
          </div>
        </div>
      )}
      <CartButton />
    </div>
  );
};

export default Kebabs;
