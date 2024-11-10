import React from 'react'
import s from './HotSnacks.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';

const cards = [
  { text: "Жаренная моцарелла с малиновым пюре", price: "550 ₽", weight: "200 г" },
  { text: "Мидии Блю чиз", price: "700 ₽", weight: "310г" },
  { text: "Мидии в томатном соусе", price: "650₽", weight: "310 г" },
  { text: "Глазированные тигровые креветки Свит Чили/BBQ/Терияки", price: "750 ₽", weight: "350 г" },
  { text: "Жаренные пивные креветки", price: "900 ₽", weight: "300г" },
  { text: "Луковые колечки & соус в ассортименте", price: "500 ₽", weight: "250 г" },
  { text: "Сырные палочки & соус в ассортименте", price: "300 ₽",  weight: "250 г" },
  { text: "Рыбные палочки & соус в ассортименте", price: "300 ₽",  weight: "250 г" },
  { text: "Нагетсы куринные & соус в ассортименте", price: "270 ₽",  weight: "250 г" },
  { text: "Куриные крылья BBQ/Свит Чили/Острые/Терияки", price: "400 ₽",  weight: "260 г" },
  { text: "Чесночные гренки с пармезаном", price: "250 ₽",  weight: "240 г" },
  

  

];
const HotSnacks = () => {
  return (
    <div className={s.hotSnacks}>
        <TopBar text={"Горячие блюда"} />
      <div className={s.cardsContainer}>
        {cards.map((card, index) => (
          <CardPrice 
            key={index} 
            text={card.text} 
            price={card.price} 
            weight={card.weight} 
          />
        ))}
      </div>
      <CartButton />
    </div>
  )
}

export default HotSnacks