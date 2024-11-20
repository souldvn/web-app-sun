import React from 'react'
import s from './ComTea.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Облепиха мята улун", price: "580 ₽", weight: "1 л", time:"10-15 минут", description:"Сладость облепихи и свежесть мяты с нежным вкусом улуна. Ароматная смесь наполняет энергией и дарит приятное чувство лёгкости. Идеален для расслабляющего чаепития, он отлично согревает и поддерживает бодрость в холодные дни." },
  { text: "Малина Эрл Грей", price: "520 ₽", weight: "1 л", time:"10-15 минут", description:"Настолько вкусный, что сочетает нежный вкус чёрного чая Эрл Грей с яркой сладостью малины. Он точно танет отличным компаньоном для приятного общения или расслабляющего вечера, даря наслаждение и заряд бодрости." },
  { text: "Гречишный чай с манго", price: "580 ₽", weight: "1 л", time:"10-15 минут", description:"Ореховый вкус гречишных семян переплетается с сладостью сочного манго. Его нежный аромат и лёгкая сладость создают гармоничное сочетание, наполняя уютом и теплом." },

];
const ComTea = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/barin', { state: { dish: card, fromRecomendations: false } });
  };
  
  return (
    <div className={s.drinks}>
      <TopBar text={"Фирменные чаи"} />
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

export default ComTea