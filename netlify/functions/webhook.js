const axios = require('axios');
require('dotenv').config();  // Подключаем .env

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const paymentData = JSON.parse(event.body);
    console.log('Received payment data:', paymentData);

    if (paymentData.event === 'payment.succeeded') {
      const { flat = 'Не указано', phoneNumber, guestCount, orderTime, comment, orderId, cartItems, orderType, telegramChatId } = paymentData.object.metadata;
      let totalPrice = paymentData.object.amount.value;

      const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
      console.log('Received cart items:', parsedCartItems);

      if (totalPrice === undefined || totalPrice === null) {
        console.error('Total price is not defined');
        totalPrice = 'Не указано';
      } else {
        totalPrice = parseFloat(totalPrice).toFixed(2);
      }

      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_BOT_TOKEN_USER = process.env.TELEGRAM_BOT_TOKEN_USER;
      const TELEGRAM_CHAT_ID_KITCHEN = process.env.TELEGRAM_CHAT_ID_KITCHEN;
      const TELEGRAM_CHAT_ID_USER = telegramChatId;

      const cartItemsText = parsedCartItems
        .map((item, index) => `${index + 1}. ${item.text} - ${item.count} шт.`)
        .join('\n');

      const messageForKitchen = `
📦 <b>Новый заказ:</b>
🆔 Номер заказа: ${orderId}
 
📍 Локация: ${flat}
📞 Телефон: ${phoneNumber}
👥 Гости: ${guestCount}
⏰ Время: ${orderTime}
💬 Комментарий: ${comment}
💰 Сумма: ${totalPrice} ₽
🍴 <b>Позиции:</b>
${cartItemsText}
`;

      const messageForUser = `
🙏 <b>Ваш заказ принят!</b>
🆔 Номер заказа: ${orderId}

📍 Адрес: ${flat}
📞 Телефон: ${phoneNumber}
👥 Гости: ${guestCount}
⏰ Время: ${orderTime}
💬 Комментарий: ${comment}
💰 Сумма: ${totalPrice} ₽
🍴 <b>Содержимое корзины:</b>
${cartItemsText}

Пожалуйста ожидайте, Ваш заказ уже готовится 
Остались вопросы? 
☎️ Телефон: +79283757274 
Благодарим Вас за выбор ресторана современной кавказской кухни SUN VILLrest парк-отеля Sun Village Arkhyz 
📙 санвилладж.рф 
🏔 https://t.me/sunvillagearkhyz`;

      try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID_KITCHEN,
          text: messageForKitchen,
          parse_mode: 'HTML',
        });
      } catch (error) {
        console.error('Error sending message to kitchen:', error.response ? error.response.data : error.message);
      }

      if (TELEGRAM_CHAT_ID_USER) {
        try {
          await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN_USER}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID_USER,
            text: messageForUser,
            parse_mode: 'HTML',
          });
        } catch (error) {
          console.error('Error sending message to user:', error.response ? error.response.data : error.message);
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Telegram notifications sent' }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment not completed successfully' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
