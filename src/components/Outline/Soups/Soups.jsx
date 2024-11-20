import React from 'react'
import s from './Soups.module.css'
import TopBar from '../../Complite/TopBar/TopBar'
import CartButton from '../../Complite/CartButton/CartButton'
import CardPrice from '../../Complite/CardPrice/CardPrice'
import { useNavigate } from 'react-router-dom'

const cards = [
  {id:1, text: "Том-ям из морепродуктов", price: "600 ₽", weight: "470 г", time:"15-25 минут", description:"Дымится на плите, а аромат уже заполнил всю кухню — словно в те дни, когда в горы Архыза приезжали гости издалека. Слушаешь их рассказы о тропических землях, и вот, перед тобой глубокая миска с Том-ям. Нежные морепродукты, острота специй и свежесть лайма — будто привезли кусочек тропической сказки прямо в эти величественные горы.", compound:"Бульон рыбный, бульон биск, креветки, кальмары, мидии киви, шампиньоны, лайм, перец чили, рис отварной, кокосовое молоко, зелень" },
  {id:2, text: "Суп-лапша куриная", price: "350 ₽", weight: "380 г", time:"15-25 минут", description:"На кухне запах детства, знакомый с первых шагов — это мама варит суп-лапшу. В большой кастрюле кипит прозрачный бульон, в который с любовью добавлены кусочки нежного куриного филе, золотистая домашняя лапша, лук, яйцо, морковь и зелень", compound:"Бульон куриный, филе куриное, лапша домашняя, яйцо куриное, лук, морковь, зелень" },
  {id:3, text: "Шурпа", price: "450 ₽", weight: "355г", time:"15-25 минут", description:"Шурпа — это как уютный вечер у бабушки на даче, когда за окном начинает темнеть, а на плите медленно варится ароматный суп. Представь, как в большом кастрюле бульон из баранины насыщается вкусом сочного мяса, картофеля и моркови, а нежные помидоры черри и сладкий перец придают ему яркий цвет.", compound:"Бульон бараний, баранина отварная, картофель, морковь, перец болгарский, помидор черри, зелень" },
  {id:4, text: "Крем-суп с белыми грибами", price: "400 ₽", weight: "320 г", time:"15-25 минут", description:"Крем-суп с белыми грибами — это как прогулка в сосновому бору, где каждый ложка раскрывает богатство ароматов. Густая сливочная основа с шампиньонами и картофелем напоминает лесные полянки, а хрустящие сухарики и пармезан — это как неожиданная находка среди зелени.", compound:"Белые грибы, шампиньоны, картофель, лук, чеснок, сливки, сыр пармезан, сухарики, красное масло" },
  {id:5, text: "Тыквенный крем-суп с креветками", price: "500 ₽", weight: "350 г", time:"15-25 минут", description:"Когда‑то тыква мечтала стать каретой, но судьба распорядилась иначе: она превратилась в нежнейший крем-суп с кокосовым молоком и тигровыми креветками. Гренки и тыквенные семечки здесь как сказочные феи, добавляющие хрустящих штрихов. Как у Золушки, финал истории — поистине счастливый!", compound:"Тыква, кокосовое молоко, тигровые креветки, гренки, тыквенные семечки, мёд, специи" },
  {id:6, text: "Минестроне", price: "350 ₽", weight: "380 г", time:"15-25 минут", description:"Похоже на солнечный день в Италии, где каждый овощ — яркий штрих на картине вкусов. Кабачок спешит на сиенскую площадь, болгарский перец ведёт за собой танцы под тосканским небом, а морковь с сельдереем обсуждают рецепты бабушки. Шампиньон прячет загадки, пока ароматное масло завершает эту итальянскую симфонию.", compound:"Овощной бульон, картофель, кабачок, болгарский перец, шампиньон, морковь, сельдерей, ароматное масло" }
];
const Soups = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/soupsIn', { state: { dish: card, fromRecomendations: false } });
  };

  return (
<div className={s.soups}>
      <TopBar text={"Супы"} />
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

export default Soups