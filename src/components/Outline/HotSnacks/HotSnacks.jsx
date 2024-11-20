import React from 'react'
import s from './HotSnacks.module.css'
import TopBar from '../../Complite/TopBar/TopBar';
import CartButton from '../../Complite/CartButton/CartButton';
import CardPrice from '../../Complite/CardPrice/CardPrice';
import { useNavigate } from 'react-router-dom';

const cards = [
  {id:1, text: "Жаренная моцарелла с малиновым пюре", price: "550 ₽", weight: "200 г", description:"Жареная моцарелла с малиновым пюре — хрустящая снаружи, тягучая внутри! Рисовая панировка надёжно удерживает всю нежность сыра, а малиновое пюре добавляет яркую нотку. Ну и куда же без сочной малины?", time:"10-25 минут" ,compound:"Моцарелла, рисовая панировка, малиновое пюре" },
  {id:2, text: "Мидии Блю чиз", price: "700 ₽", weight: "310г", description:"Скажите cheese, получите Мидии Блю чиз! Нежные мидии с сыром Дор Блю, где сливки и белое вино тонко дополняют друг друга. Лёгкий аромат лука и хрустящая гренка из свежевыпеченного хлеба — идеальное завершение. Это тот самый момент, когда вкус говорит за себя.", time:"10-25 минут" ,compound:"Мидии киви, сливки, сыр Дор Блю, белое вино, лук, гренка из белого хлеба собственной выпечки" },
  {id:3, text: "Мидии в томатном соусе", price: "650₽", weight: "310 г", description:"Без томата и жизнь плоховата, а с томатным соусом ещё лучше. Мидии киви расцветают в ароматном соусе с нотками красного вина. Лёгкий аккомпанемент лука и свежей зелени завершает это блюдо, а хрустящая гренка из белого хлеба собственной выпечки — идеальный спутник для такой компании.", time:"10-25 минут" ,compound:"Мидии киви, соус томатный, вино красное, лук, зелень, гренка из белого хлеба собственной выпечки" },
  {id:4, text: "Глазированные тигровые креветки Свит Чили/BBQ/Терияки", price: "750 ₽", weight: "150 г", description:"Любите тигровые креветки, а с соусом Свит Чили вас есть учили? А с BBQ или Терияки?Если нет, то самое время попробовать! Сочные креветки, глазированные с таким ассортиментом соусов, раскрывают всю силу вкуса.", time:"10-25 минут" ,compound:"Тигровые креветки, соус Свит чили, лайм, чили перец, кунжут, специи." },
  {id:5, text: "Жаренные пивные креветки", price: "900 ₽", weight: "300г" , description:"Ну что, по пивку? Жареные пивные креветки — это как весёлая вечеринка на вашем столе! Нежные креветки обжарены с лимоном и лаймом, а чеснок, кинза и тимьян добавляют им ярких акцентов. Пара капель соевого и Вустерского соусов делают это угощение по‑настоящему незабываемым.", time:"10-25 минут" ,compound:"Креветки, лимон, лайм, чеснок, кинза, тимьян, соевый соус, соус «Вустерский», специи"},
  {id:6, text: "Луковые колечки & соус в ассортименте", price: "250 ₽", weight: "250 г", description:"Уже поели и просто зашли почитать описания? Не знаем, не знаем… После дегустации этого блюда у вас откроется второе дыхание, и вы сможете парить, словно эти луковые колечки, а соус сделает трапезу ещё вкуснее", time:"10-25 минут" ,compound:"Луковые колечки, соус на выбор" },
  {id:7, text: "Сырные палочки & соус в ассортименте", price: "300 ₽",  weight: "250 г", description:"Сырные палочки — хруст снаружи, а внутри расплавленный сыр, который так и тянется! Один укус, и ты поймёшь, что остановиться невозможно. Идеальны для тех, кто любит не только вкус, но и эффект!", time:"10-25 минут" ,compound:"Сырные палочки, соус на выбор" },
  {id:8, text: "Рыбные палочки & соус в ассортименте", price: "300 ₽",  weight: "250 г" , description:"Рыбки хочется? Тогда рыбные палочки — это то, что нужно! С хрустящей корочкой снаружи и нежной рыбой внутри, они подарят лёгкий морской бриз каждому укусу.", time:"10-25 минут" ,compound:"Рыбные палочки, соус на выбор"},
  {id:9, text: "Нагетсы куринные & соус в ассортименте", price: "270 ₽",  weight: "250 г" , description:"Старые добрые куриные наггетсы — хрустящие снаружи, сочные внутри. Идеальны для быстрого перекуса или долгожданного удовольствия. С каждым кусочком возвращаешься к классике!", time:"10-25 минут" ,compound:"Наггетсы куриные, соус на выбор"},
  {id:10, text: "Куриные крылья BBQ/Свит Чили/Острые/Терияки", price: "400 ₽",  weight: "260 г", description:"С таким набором и отдыхать не скучно! Куриные крылья — это всегда удовольствие, но когда на выбор соусы BBQ, Свит Чили, Острый или Терияки — это уже настоящий праздник вкусов. Выбери свой соус и наслаждайся каждым крылышком!", time:"10-25 минут" ,compound:"Куриные крылышки, специи, соус BBQ/Свит чили/Шрирачи/Терияки, кунжут" },
  {id:11, text: "Чесночные гренки с пармезаном", price: "250 ₽",  weight: "250 г" , description:"Те самые легендарные греночки, которым всегда будешь рад! Хрустящие, золотистые и пропитанные насыщенным чесночным ароматом и пармезаном. Идеальная закуска, что заставит сердце трепетать от удовольствия и станет отличным спутником для любого блюда.", time:"10-25 минут" ,compound:"Хлеб «Бородинский», чеснок, зелень, соевый соус, пармезан, чесночный соус"},

];
const HotSnacks = () => {

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/hotsnacksIn', { state: { dish: card, fromRecomendations: false } });
  };

  return (
    <div className={s.hotSnacks}>
      <TopBar text={"Горячие закуски"} />
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

export default HotSnacks