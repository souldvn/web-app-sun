import React, { useState, useContext, useEffect } from 'react';
import s from './PresentButton.module.css';
import { CartContext } from '../../Contextes/CartContext';

const PresentButton = ({ onClose, itemName }) => {
  const { giftSelection, setSelectedGift, syrupSelection, setSyrupForItem } = useContext(CartContext);
  const [selectedGift, setSelectedGiftState] = useState('Без подарка');
  const [addSyrup, setAddSyrup] = useState(false);

  useEffect(() => {
    // Устанавливаем начальное состояние подарка
    setSelectedGiftState(giftSelection[itemName] || 'Без подарка');

    // Устанавливаем состояние сиропа, если он был выбран для этого блюда
    setAddSyrup(syrupSelection[itemName] || false);
  }, [giftSelection, itemName, syrupSelection]);

  const handleGiftChange = (event) => {
    const gift = event.target.value;
    setSelectedGiftState(gift);
    setSelectedGift(gift === 'Без подарка' ? null : gift, itemName);
    if (gift !== 'Капучино') {
      setAddSyrup(false); // Если выбран не капучино, сбрасываем сироп
      setSyrupForItem(itemName, false);
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setAddSyrup(checked);
    setSyrupForItem(itemName, checked); // Обновляем данные о сиропе в контексте
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
