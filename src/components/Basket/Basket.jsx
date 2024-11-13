import React, { useContext } from 'react';
import s from './Basket.module.css';
import { CartContext } from '../Contextes/CartContext';
import TopBar from '../Complite/TopBar/TopBar';
import minus from '../../assets/icons/minuscart.svg';
import plus from '../../assets/icons/pluscart.svg';
import ButtonBasket from './ButtonBasket/ButtonBasket';
import trash from '.././../assets/icons/trash.svg'

const Basket = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const isEmpty = cartItems.length === 0;

  return (
    <div className={s.basket}>
      <TopBar className={s.topBar} text={"Корзина"} />
      <button className={s.trash}>
        <img src={trash} alt='trash'></img>
      </button>
      <div className={s.basketContainer}>
        {isEmpty ? (
          <div className={s.emptyMessage}>
            <p>Корзина пуста</p>
            <p>Добавьте что‑нибудь в корзину</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className={s.basketPosition} key={`${item.price}-${item.text}-${item.weight}`}>
              <div className={s.other}>
                <div className={s.basImg}></div>
                <div className={s.info}>
                  {item.text}
                  <div className={s.priceweight}>
                  <p className={s.price}>
                    {(parseFloat(item.price) || 0) * (item.count || 0)} ₽
                    </p>
                    <p className={s.weight}>{item.weight}</p>
                  </div>
                </div>
              </div>
              <div className={s.lenght}>
                <button
                  className={s.button}
                  onClick={() => removeFromCart(item)}
                >
                  <img className={s.icon} src={minus} alt="minus" />
                </button>
                <p className={s.itemCount}>{item.count}</p>
                <button
                  className={s.button}
                  onClick={() => addToCart(item)}
                >
                  <img className={s.icon} src={plus} alt="plus" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ButtonBasket isEmpty={isEmpty} />
    </div>
  );
};

export default Basket;

