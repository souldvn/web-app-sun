import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RecSalads.module.css';
import CardPrice from '../../../Complite/CardPrice/CardPrice';
import CartButton from '../../../Complite/CartButton/CartButton';

const cards = [
    { text: "Плато «Кавказ»", price: "950 ₽", weight: "530 г", time:"10-15 минут", description:"Плато «Кавказ» — это как путешествие по высокогорной равнине. Сулугуни, домашний сыр, Чеддер, Дор Блю и сыр Пармезан возвышаются, словно горные вершины, а колбасы казы из курицы и конины, суджук и бастурма напоминают о глубоких долинах вкуса.", compound:"Сыр сулугуни, сыр домашний, сыр Чеддер, сыр Дор Блю, сыр Пармезан, колбаса казы курица, колбаса казы конина, суджук, бастурма, мёд, грецкий орех, соус медово-горчичный, инжирное варенье, помидоры черри, зелень" },
    { text: "Мясное ассорти", price: "550 ₽", weight: "225 г" , time:"10-15 минут", description:"Однажды курица и конь на ферме решили приготовить мясо казы и случайно оказались в тарелке. Их кулинарное начинание преобразилось в мясное ассорти: казы из конины и курицы, суджук и бастурма с медово-горчичным соусом, помидорами черри и зеленью. Старайся не старайся, а в ресторан SUNVILL REST попадёшь.", compound:"Колбаса казы конина, колбаса казы курица, суджук, бастурма, соус медово-горчичный, помидоры черри, зелень"},
    { text: "Сырное ассорти", price: "500 ₽", weight: "250 г" , time:"10-15 минут", description:"Когда мышка-норушка решила сделать сырное ассорти для своих деток, она не ожидала, что уронит его рецепт в ресторане SUNVILL REST. Так на вашем столе оказалось множество сыров: сулугуни, копчёный, ароматный Чеддер, пикантный Дор Блю и Пармезан с грецкими орехами и зеленью.", compound:"Сыр сулугуни, сулугуни копчёный, сыр Чеддер, сыр Дор Блю, сыр Пармезан, грецкий орех, мёд, зелень"},
    { text: "Ассорти солений", price: "450 ₽", weight: "350 г" , time:"10-15 минут", description:"Вот они, слева направо: квашеная капуста, бочковые огурцы, перец цицак, солёные помидоры и маринованный чеснок и зелень. Все они искупались в ароматах, замариновались в лучших специях и теперь собрались на тарелке, чтобы подарить вам настоящий взрыв вкусов.", compound:"Капуста квашеная, огурцы бочковые, перец цицак, помидор солёный, чеснок маринованный, зелень"},
    { text: "Овощное ассорти", price: "450 ₽", weight: "395 г", time:"10-15 минут", description:"Помидор, огурец, редис, болгарский перец и зелень собрались вместе, чтобы придумать идеальный рецепт ассорти для ресторана SUNVILL REST. Думали, думали и просто развалились на тарелке от усталости. Так и выносят их с тех пор, после окончания собрания.", compound:"Помидор, огурец, редис, перец болгарский, зелень" },
    { text: "Филе сельди с картофелем от шефа", price: "500 ₽", weight: "150/200 г", time:"10-15 минут", description:"Наш шеф знает, как порадовать посетителей ресторана SUNVILL REST: филе сельди — нежное, с лёгкой солоноватой ноткой — встречается с картофелем, обжаренным в пряном масле. Добавьте сюда аромат укропа и чеснока, и получится блюдо, которое сложно забыть. Это не просто сельдь с картофелем, это настоящий шедевр!", compound:"Филе сельди, картофель обжаренный в пряном масле, укроп, чеснок" },
    { text: "Сёмга слабосоленая", price: "700 ₽", weight: "150/50 г", time:"10-15 минут", description:"Ох уж эта сёмга, работает в нашем ресторане сверхурочно, чтобы пленить вас своим утончённым вкусом. Лёгкий посол и нежная текстура, в сочетании с дольками лимона, создают идеальную гармонию.", compound:"Сёмга слабого посола, лимон" },
    { text: "Лимон", price: "100 ₽", weight: "50 г", time:"10-15 минут", description:"Вечно кислый, не знаем что с ним делать — как только его не развлекали, даже зарплату поднимали, а он все такой же. Подарите ему место на обеденном столе, чтобы развеселить его, и он вознаградит вас своей пикантной ноткой. Не оставляйте его одного — он ждёт вашего внимания!" },
    { text: "Королевские маслины & оливки", price: "220 ₽", weight: "90 г", time:"10-15 минут", description:"Одни короли да королевы, а гостей ресторана SUNVILL REST кто кормить будет? Только самые королевские маслины и оливки. Маринованные до совершенства, чтобы вы могли наслаждаться каждым укусом, как истинный аристократ."},
    
  ];

const RecSalads = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate('/saladsIn', { state: { dish: card, fromRecomendations: true } });
  };

  return (
    <div className={s.drinks}>
        <p className={s.rec}>Дополнительно рекомендуем</p>
      <div className={s.cardsContainer}>
        
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card)}>
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
  );
};

export default RecSalads;