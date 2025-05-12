import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contextes/CartContext'; // Подключаем контекст
import s from './Bar.module.css';
import Carddeffault from '../../Complite/carddeffault/Carddeffault';
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';

const cards = [
  {
    text: "Холодные напитки",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Xolodnie%20napitki.jpg",
  },
  {
    text: "Лимонады домашние",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Limonadi.jpg",
  },
  {
    text: "Кофе",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Kofe.jpg",
  },
  {
    text: "Чай классический",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Chai%20klassicheskiy.jpg",
  },
  {
    text: "Фирменные чаи",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Firmennii%20chai.jpg",
  },
  {
    text: "Горячие напитки",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Goryachie%20napitki.jpg",
  },
  {
    text: "Пиво",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Pivo.jpg",
  },
  {
    text: "Пивные напитки",
    img: "https://github.com/souldvn/SunVillImg/raw/main/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5/Pivnie%20napitki.jpg",
  }
];


const Bar = () => {
  const { selectedOption } = useContext(CartContext); // Получаем текущий режим (доставка/в ресторане)
  const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    const routes = {
      'Холодные напитки': '/colddrinks',
      'Лимонады домашние': '/limonades',
      'Кофе': '/coffee',
      'Чай классический': '/tea',
      'Фирменные чаи': '/comtea',
      'Горячие напитки': '/hotdrinks',
      'Пиво': '/beer',
      'Пивные напитки': '/beerdrinks',
    };

    if (routes[cardName]) {
      navigate(routes[cardName]);
    }
  };

  // Фильтруем карточки в зависимости от режима
  const excludedCards = ["Лимонады", "Фирменные чаи", "Горячие напитки", "Чай классический"];
  const filteredCards = selectedOption === 'delivery'
  ? cards.filter((card) => !excludedCards.includes(card.text)) // Используем card.text
  : cards;


  return (
    <div className={s.bar}>
      <TopBar text={"Барная карта"} />
      <div className={s.cardsContainer}>
  {filteredCards.map(({ text, img }, index) => (
    <Carddeffault key={index} text={text} img={img} onClick={() => handleCardClick(text)} />
  ))}
</div>

      <CartButton />
    </div>
  );
};

export default Bar;
