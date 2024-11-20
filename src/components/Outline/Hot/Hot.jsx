import React from 'react'
import s from './Hot.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Медальоны из телятины в сливочно-горчичном соусе", price: "770 ₽", weight: "220 г", time:"30-60 минут", description:"Это не просто блюдо, а целый набор наград! Медаль за нежность телятины, медаль за бархатистую сливочность, медаль за пикантную горчицу и мёд — за сладкую победу вкуса. Аромат специй и свежая зелень завершают это торжество, достойное кулинарного пьедестала. Медаль за медаль, и каждая — заслуженная!", compound:"Говяжья вырезка, сливки, горчица зернистая, мёд, специи, зелень" },
  { text: "Семга в сливочно-икорном соусе", price: "850 ₽", weight: "180/150 г", time:"30-60 минут", description:"Сёмге филе надоело просто так лежать на гриле, и она решила повысить свою кулинарную квалификацию — окунуться в сливочно-икорный соус! Сопровождают её мягкое картофельное пюре и аромат специй. Теперь у сёмги — не просто жизнь, а настоящая карьерная вершина на тарелке.", compound:"Филе сёмги, сливки, икра форелевая, картофельное пюре, сливки, специи, зелень" },
  { text: "Томленные говяжьи щечки под соусом Демиглас", price: "650 ₽", weight: "350/150 г", time:"30-60 минут", description:"Щёчки коровки настолько утомились жевать травку, что решили отдохнуть на тарелочке. После долгих дней пастбища, они нашли уют в картофельном пюре, нежно окутанном соусом Демиглас, с морковью и специями. С этим блюдом отдыха будет достаточно, чтобы насладиться уютом и вкусом без лишних забот.", compound:"Говяжьи щёчки, картофельное пюре, соус Демиглас, морковь, специи, зелень" },
  { text: "Соте из морепродуктов", price: "750 ₽", weight: "350 г", time:"30-60 минут", description:"Морепродукты заглянули в горы Архыза. Кальмары, креветки и мидии в сливочном соусе со специями. Сочные кусочки лосося и кабачка дополняются хрустящей гренкой и свежей зеленью. Морская симфония от нашего шефа.", compound:"Кальмар, креветки, мидии, лосось, кабачок, чеснок, специи, сливки, гренка из домашнего хлеба, зелень" },
  { text: "Жаркое с курицей", price: "400 ₽", weight: "320 г", time:"30-60 минут", description:"Cочные куриные бедра c картофелем и томатами черри под пряным ароматом специй и домашней аджики. Финальный аккорд — свежая зелень, добавляющая яркий вкус. Блюдо, в котором каждый ингредиент раскрывается по‑новому.", compound:"Куриное бедро, картофель мини, томаты черри, лук, чеснок, специи, зелень, аджика домашняя" },
  { text: "Жаркое с бараниной", price: "500 ₽", weight: "340 г", time:"30-60 минут", description:"Кулинарный уют, где нежное мясо баранины встречается с картофелем и томатами черри, а также домашней аджикой. Лук и чеснок создают богатый аромат, а свежая зелень завершает это гармоничное блюдо.", compound:"Баранина мякоть, картофель мини, томаты черри, лук, чеснок, специи, зелень, аджика домашняя" },
  { text: "Жаркое с говядиной", price: "550 ₽",  weight: "330 г", time:"30-60 минут", description:"Нежная говяжья вырезка в обьятиях картофеля мини и томатов черри в обрамлении ароматных специй. Лук и чеснок заботливо подчёркивают вкус, а домашняя аджика добавляет пикантности и тепла вместе со свежей зеленью", compound:"Говяжья вырезка, картофель мини, томаты черри, лук, чеснок, специи, зелень, аджика домашняя" }

];

const Hot = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/hotbIn', { state: { dish: card, fromRecomendations: false } });
  };

  return (
    <div className={s.hot}>
      <TopBar text={"Горячие блюда"} />
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

export default Hot