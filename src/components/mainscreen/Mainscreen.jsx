import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Contextes/CartContext';
import balls from '../../assets/icons/balls.svg';
import Carddeffault from '../Complite/carddeffault/Carddeffault';
import s from './mainscreen.module.css';
import CartButton from '../Complite/CartButton/CartButton';
import info from '../../assets/icons/info.svg';
import dostavka from '../../assets/icons/dostavka.svg';

const Mainscreen = () => {
  const { selectedOption, setOption } = useContext(CartContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // состояние для модального окна
  const [modalContent, setModalContent] = useState(''); // содержимое модального окна

  useEffect(() => {
    const savedOption = localStorage.getItem('activeButton') || 'host';
    setOption(savedOption);
  }, [setOption]);

  const handleButtonClick = (option) => {
    setOption(option);
  };

  const handleDelInfoOpen = () => {
    navigate('/deliveryinfo');
  }

  const handleContactsClick = () => {
    navigate('/contacts');
  }

  const handleCardClick = (cardName) => {
    const routes = {
      "Завтраки": "/breakfast",
      "Барная карта": "/bar",
      "Гриль & Мангал": "/grill",
      "Бургеры": "/burgers",
      "Горячие блюда": "/hot",
      "Горячие закуски": "/hotSnacks",
      "Супы": "/soups",
      "Салаты": "/salads",
      "Тесто": "/dough",
      "Холодные закуски": "/coldSnacks",
      "Гарниры": "/garnishes",
      "Мороженое": "/icecreams",
      "Соусы": "/souses",
    };

    if (routes[cardName]) {
      navigate(routes[cardName]);
    }
  };

  // Массив объектов с текстом и изображениями
  const cards = [
    {
      text: "Завтраки",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Zavtraki.jpg",
    },
    {
      text: "Барная карта",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Barnaya%20karta.jpg",
    },
    {
      text: "Гриль & Мангал",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Gril%20i%20Mangal.jpg",
    },
    {
      text: "Бургеры",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Burgeri.jpg",
    },
    {
      text: "Горячие блюда",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Goryachie%20bluda.jpg",
    },
    {
      text: "Горячие закуски",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Goryachie%20zakuski.jpg",
    },
    {
      text: "Супы",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Supi.jpg",
    },
    {
      text: "Салаты",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Salati.jpg",
    },
    {
      text: "Тесто",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Testo.jpg",
    },
    {
      text: "Холодные закуски",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Xolodnie%20zakuski.jpg",
    },
    {
      text: "Гарниры",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Garniri.jpg",
    },
    {
      text: "Мороженое",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Morojenoe.jpg",
    },
    {
      text: "Соусы",
      img: "https://raw.githubusercontent.com/souldvn/SunVillImg/main/Обложки%20новые/Sousi.jpg",
    }
  ];
  

  const filteredCards = selectedOption === 'delivery'
    ? cards.filter((card) => card.text !== "Завтраки")
    : cards;

  // Функция для открытия модального окна в зависимости от выбранного режима
  const openModal = (mode) => {
    setIsModalOpen(true);
    setModalContent(mode);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <div className={s.mainscreen}>
      <div onClick={handleContactsClick} className={s.functionpanel}>
        <button className={s.balls}>
          <img src={balls} alt="balls" />
        </button>
      </div>

      <div className={s.variants}>
        <button
          className={`${s.buttonhost} ${selectedOption === 'host' ? s.active : ''}`}
          onClick={() => {
            handleButtonClick('host');
            openModal('Продажа основного меню с 11:00 по мск. Завтраки с 9:00 до 11:00'); // Открываем модальное окно для режима host
          }}
        >
          В ресторане
        </button>
        <button
  className={`${s.buttondelivery} ${selectedOption === 'delivery' ? s.active : ''}`}
  onClick={() => {
    handleButtonClick('delivery');
    openModal(
       
      <div onClick={handleDelInfoOpen} className={s.deli}>
        <div className={s.content}>     
          <img src={dostavka} alt="Delivery Time" /> 
              <div className={s.info}>
                <p className={s.titleinfo}>Доставка ресторана SUN VILL REST</p>
                <p className={s.titletext}>Ознакомиться с условиями</p>
              </div>

              {/* Доставка временно недоступна */}
        </div>
      </div>
    );
  }}
>
  Доставка
</button>

      </div>

      {/* Отображение карточек */}
      <div className={s.cardsContainer}>
        {filteredCards.map((card, index) => (
          <Carddeffault
            key={index}
            text={card.text}
            img={card.img}
            onClick={() => handleCardClick(card.text)}
          />
        ))}
      </div>

      <CartButton />

      {/* Модальное окно */}
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
    </div>
  );
};

export default Mainscreen;
