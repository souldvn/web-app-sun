import React from 'react'
import s from './Limonades.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Цитрусовый микс", price: "660 ₽", weight: "1 л", description:"Освежающий напиток, пропитанный яркими цитрусовыми нотами, которые бодрят и наполняют энергией. Его лёгкая шипучесть и гармония сладости с кислинкой делают его идеальным для утоления жажды.", time:"10–15 минут" },
  { text: "Цитрусовый микс", price: "250 ₽", weight: "0,25 л", description:"Освежающий напиток, пропитанный яркими цитрусовыми нотами, которые бодрят и наполняют энергией. Его лёгкая шипучесть и гармония сладости с кислинкой делают его идеальным для утоления жажды.", time:"10–15 минут" },
  { text: "Ягодный", price: "660 ₽", weight: "1 л", description:"Каждый глоток наполняет вас сладостью спелых ягод, даря ощущение беззаботных летних дней. Его шипучесть придаёт напитку игривость, а насыщенный цвет радует глаз. Идеальный выбор, чтобы освежиться и насладиться мгновением!", time:"10-15 минут" },
  { text: "Ягодный", price: "250 ₽", weight: "0,25 л", description:"Каждый глоток наполняет вас сладостью спелых ягод, даря ощущение беззаботных летних дней. Его шипучесть придаёт напитку игривость, а насыщенный цвет радует глаз. Идеальный выбор, чтобы освежиться и насладиться мгновением!", time:"10-15 минут" },
  { text: "Манго-маракуйя", price: "660 ₽", weight: "1 л", description:"Напиток, который создаст атмосферу тропического рая! Если у вас манго-маракуйевое настроение, этот лимонад подарит вам взрыв ярких вкусов и сладкого настроения.", time:"10-15 минут" },
  { text: "Манго-маракуйя", price: "250 ₽", weight: "0,25 л", description:"Напиток, который создаст атмосферу тропического рая! Если у вас манго-маракуйевое настроение, этот лимонад подарит вам взрыв ярких вкусов и сладкого настроения.", time:"10-15 минут" },
  { text: "Огурец-яблоко", price: "660 ₽", weight: "1 л", description:"Освежающий напиток, который подарит вам настоящий глоток свежести! Этот лимонад — огуречно-яблочный эксперимент, который идеально подходит для тех, кто хочет порадовать себя чем‑то необычным и бодрящим, даря наслаждение в каждом глотке!", time:"10-15 минут" },
  { text: "Огурец-яблоко", price: "250 ₽", weight: "0,25 л", description:"Освежающий напиток, который подарит вам настоящий глоток свежести! Этот лимонад — огуречно-яблочный эксперимент, который идеально подходит для тех, кто хочет порадовать себя чем‑то необычным и бодрящим, даря наслаждение в каждом глотке!", time:"10-15 минут" },
  { text: "Лаванда-маракуйя", price: "660 ₽", weight: "1 л", description:"Нежные цветочные ноты лаванды переплетаются с экзотической сладостью маракуйи, создавая гармоничное и освежающее сочетание. Этот лимонад станет вашим идеальным решением, наполняя каждый глоток яркими эмоциями и уютом!", time:"10-15 минут" },
  { text: "Лаванда-маракуйя", price: "250 ₽", weight: "0,25 л", description:"Нежные цветочные ноты лаванды переплетаются с экзотической сладостью маракуйи, создавая гармоничное и освежающее сочетание. Этот лимонад станет вашим идеальным решением, наполняя каждый глоток яркими эмоциями и уютом!", time:"10-15 минут" },
  { text: "Малина-маракуйя", price: "660 ₽", weight: "1 л", description:"Освежающий напиток, который дарит вам уникальное сочетание сладости спелой малины и экзотической кислинки маракуйи. Каждый глоток наполняет свежестью и бодростью, идеально утоляя жажду.", time:"10-15 минут" },
  { text: "Малина-маракуйя", price: "250 ₽", weight: "0,25 л", description:"Освежающий напиток, который дарит вам уникальное сочетание сладости спелой малины и экзотической кислинки маракуйи. Каждый глоток наполняет свежестью и бодростью, идеально утоляя жажду.", time:"10-15 минут" },
  { text: "Мохито б/а", price: "660 ₽", weight: "1 л", description:"Настоящий праздник свежести! Нежные нотки мяты и кислота лайма создают гармоничное сочетание, которое моментально освежает. Наслаждайтесь им в компании друзей или просто в уединении — каждый глоток подарит вам заряд бодрости!", time:"10-15 минут" },
  { text: "Мохито б/а", price: "250 ₽", weight: "0,25 л", description:"Настоящий праздник свежести! Нежные нотки мяты и кислота лайма создают гармоничное сочетание, которое моментально освежает. Наслаждайтесь им в компании друзей или просто в уединении — каждый глоток подарит вам заряд бодрости!", time:"10-15 минут" },
];
const Limonades = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };
  return (
    <div className={s.drinks}>
      <TopBar text={"Лимонады"} />
      <div className={s.cardsContainer}>
        {cards.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card)}>
            <CardPrice 
              text={card.text} 
              price={card.price} 
              weight={card.weight} 
            />
          </div>
        ))}
      </div>
      <CartButton />
    </div>
  )
}

export default Limonades