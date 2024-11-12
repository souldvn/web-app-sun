import React, { useContext } from 'react'
import basket from '../../../assets/icons/basketpng.png'  
import s from './CartButton.module.css'
import { CartContext } from '../../Contextes/CartContext'

const CartButton = () => {

  const { cartCount } = useContext(CartContext);
  return (
    <div className={s.buttonarea}>
          <button className={`${s.cartbutton} ${cartCount > 0 ? s.filled : ''}`}>
        Перейти в корзину
        {cartCount > 0 && (
          <div className={s.bas}>
            <img className={s.basket} src={basket} alt="basket" />
            <div className={s.number}>{cartCount}</div>
          </div>
        )}
      </button>
      </div>
  )
}

export default CartButton