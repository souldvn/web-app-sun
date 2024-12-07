import React from 'react'
import s from './Kebabs.module.css'
import TopBar from '../../../Complite/TopBar/TopBar';
import CartButton from '../../../Complite/CartButton/CartButton';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  { text: "Баранина мякоть", price: "500 ₽", weight: "100 г", time:"30-60 минут", description:"Говорят, что пастухи древних гор Кавказа могли неделями выживать на одном глотке родниковой воды и дыхании ветра. Но зачем тебе эти древние легенды, когда перед тобой сочная баранина?", compound:"Шашлык из баранины, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Говядина мякоть", price: "600 ₽", weight: "100 г", time:"30-60 минут", description:"Быстрая поездка на Кавказ без чемоданов и виз! Заказываешь сочную говядину в лаваше с маринованным красным луком, зеленью и щепоткой сумаха — и ты уже в сердце гор. Пикник среди природы и богатых традиций у тебя на тарелке.", compound:"Говяжья вырезка, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Бок ягнёнка", price: "550 ₽", weight: "100 г", time:"30-60 минут", description:"Баю-баюшки, баю, не ложись ты на краю, придёт серенький волчок, но не укусит, а попросит добавки сочного бока ягнёнка! Тает во рту, с мягким лавашом и маринованным красным луком и зеленью, посыпанный ярким сумахом — этот бок заслуживает своей колыбельной.", compound:"Бок ягнёнка, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Куриное бедро б/к", price: "350 ₽", weight: "100 г", time:"30-60 минут", description:"«Когда сочное всегда вкуснее» — шашлык из куриного бедра, который тает во рту. Подхватит вкус маринованный красный лук с лёгкой кислинкой, свежая зелень добавит хрусткости, а мягкий лаваш соберёт всё вместе, чтобы каждый кусочек был как маленький праздник.", compound:"Шашлык из куриного бедра, лаваш, лук красный маринованный, зелень, сумах" },  
  { text: "Куриное филе б/к", price: "370 ₽", weight: "100 г", time:"30-60 минут", description:"Да кто это тут на куриный шашлык замахнулся? Прямо в лаваш завернули и с сумахом подали, чтобы острее да повкуснее! Отличное сопровождение для душевных бесед на свежем воздухе.", compound:"Шашлык из куриной грудки, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Люля-кебаб курица", price: "400 ₽", weight: "100 г", time:"30-60 минут", description:"Люля-кебаб из курицы в вашем меню! Встречайте: сочное бедро куриное, заботливо приправленное специями и завёрнутое в нежный лаваш. В компании — маринованный красный лук с сумахом и свежая зелень. Всё это — взрыв вкуса с первого укуса!", compond:"Бедро куриное, лук, специи, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Люля-кебаб баранина", price: "450 ₽", weight: "100 г", time:"30-60 минут", description:"Если нужно по‑настоящему отдохнуть и насладиться, выбери Люля-кебаб из баранины. Нежная баранина с луком и специями, завёрнутая в лаваш, в компании с маринованным красным луком и зеленью. Сумах добавит изюминку и насыщенность вкуса. Погрузись в атмосферу полного удовольствия и кулинарного кайфа!", compound:"Мякоть баранина, лук, специи, лаваш, лук красный маринованный, зелень, сумах" },
  { text: "Овощи гриль", price: "500 ₽", weight: "420 гр", time:"30-60 минут", description:"Кабачок, баклажан, помидор, перец болгарский, кукуруза, шампиньоны и зелень, посмотрев фильм «Ирония судьбы, или с лёгким паром!», решили отдохнуть в бане Sun Village Arkhyz. Сюжет получился интересный, только без романтической линии в Ленинграде, так как они оказались в меню ресторана Sun Баран.", compound:"Кабачок, баклажан, помидор, перец болгарский, кукуруза, шампиньоны, зелень" },
  { text: "Шампиньоны на мангале", price: "200 ₽", weight: "100 г", time:"30-60 минут", description:"Сидят шампиньоны на мангале, а один из них говорит: «Смотрите, как я могу!» — и начинает вертеться, насаживаясь на шампур. Кругом специи сумаха и зелень. Это не просто еда, а кулинарное представление!", compound:"Шампиньоны, сумах, зелень" },
  { text: "Картофель на мангале", price: "150 ₽", weight: "100 г", time:"30-60 минут", description:"Когда хочется по‑настоящему расслабиться, картофель на мангале — идеальный выбор. Сочный картофель, запечённый с ароматным курдюком, обсыпается сумахом и свежей зеленью. Просто представьте себе вечер, полный уютного вкуса и отдыха.", compound:"Картофель, курдюк бараний, сумах, зелень" },
  { text: "Куриные крылья на мангале", price: "220 ₽", weight: "100 г", time:"30-60 минут", description:"Когда в министерстве вкусных блюд собралось экстренное совещание, чтобы создать идеальный рецепт курицы, они выбрали «Куриные крылья на мангале» как новинку года. Лаваш, красный маринованный лук и свежая зелень стали отличными союзниками, а сумах добавил завершающий штрих в этот кулинарный шедевр.", compond:"Маринованные куриные крылья, лаваш, лук красный маринованный, зелень, сумах" },

];
const Kebabs = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/kebabIn', { state: { dish: card, fromRecomendations: false } });
  };


  return (
    <div className={s.kebabs}>
      <TopBar text={"Шашлыки"} />
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

export default Kebabs