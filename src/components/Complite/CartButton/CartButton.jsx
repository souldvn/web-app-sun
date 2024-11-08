import React from 'react'
import s from './CartButton.module.css'

const CartButton = () => {
  return (
    <div className={s.buttonarea}>
          <button className={s.cartbutton}>
                
                    Перейти в корзину               
            
          </button> 
      </div>
  )
}

export default CartButton