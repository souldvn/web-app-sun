import React, { useState, useContext, useEffect } from 'react';
import s from './PresentButton.module.css';
import { CartContext } from '../../Contextes/CartContext';

const PresentButton = ({ onClose, itemName }) => {
  const { giftSelection, setSelectedGift, setSyrupForItem } = useContext(CartContext);
  const [selectedGift, setSelectedGiftState] = useState('Без подарка');
  const [addSyrup, setAddSyrup] = useState(false);

  useEffect(() => {
    setSelectedGiftState(giftSelection[itemName] || 'Без подарка');
    setAddSyrup(false);
  }, [giftSelection, itemName]);

  const handleGiftChange = (event) => {
    const gift = event.target.value;
    setSelectedGiftState(gift);
    setSelectedGift(gift === 'Без подарка' ? null : gift, itemName);
    if (gift !== 'Капучино') {
      setAddSyrup(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setAddSyrup(checked);
    setSyrupForItem(itemName, checked); // Обновляем данные в контексте
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(s.overlay)) {
      onClose();
    }
  };

  const buttonClass = selectedGift === 'Без подарка' ? s.closeButtonGray : s.closeButtonWhite;

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.giftModal}>
        <div className={s.giftContent}>
          <h2>Подарок к завтраку</h2>
          <form>
            {['Без подарка', 'Зелёный чай', 'Чёрный чай', 'Американо', 'Эспрессо', 'Капучино'].map((option) => (
              <div key={option} className={s.radioOption}>
                <label>
                  {option}
                  <input
                    type="radio"
                    name="gift"
                    value={option}
                    checked={selectedGift === option}
                    onChange={handleGiftChange}
                  />
                </label>
              </div>
            ))}
          </form>
          {selectedGift === 'Капучино' && (
            <div className={s.checkboxOption}>
              <label>
                Сироп в ассортименте
                <input
                  type="checkbox"
                  checked={addSyrup}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
          )}
        </div>
        <button className={`${s.buttonContainer} ${buttonClass}`} onClick={onClose}>
          <p>Добавить к заказу</p>
        </button>
      </div>
    </div>
  );
};

export default PresentButton;
