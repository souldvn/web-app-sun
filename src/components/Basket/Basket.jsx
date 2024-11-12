import React, { useContext } from 'react';
import s from './Basket.module.css';
import { CartContext } from '../Contextes/CartContext';
import TopBar from '../Complite/TopBar/TopBar';
import minus from '../../assets/icons/minuscart.svg';
import plus from '../../assets/icons/pluscart.svg';

const Basket = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  
    return (
      <div className={s.basket}>
        <TopBar text={"Корзина"} />
        <div className={s.basketContainer}>
          {cartItems.map((item) => (
            <div className={s.basketPosition} key={`${item.price}-${item.text}-${item.weight}`}>

                <div className={s.other}>

                    <div className={s.basImg}></div>
                                <div className={s.info}>
                                    {item.text}
                                    <div className={s.priceweight}>
                                    <p className={s.price}>{item.price}</p>
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
          ))}
        </div>
      </div>
    );
  };
  

export default Basket;
