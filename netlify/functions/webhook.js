const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const paymentData = JSON.parse(event.body);
    console.log('Received payment data:', paymentData);

    if (paymentData.event === 'payment.succeeded') {
      const { phoneNumber, guestCount, orderTime, comment, orderId, cartItems, orderType } = paymentData.object.metadata;
      let totalPrice = paymentData.object.amount.value;

      const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
      console.log('Received cart items:', parsedCartItems);

      if (totalPrice === undefined || totalPrice === null) {
        console.error('Total price is not defined');
        totalPrice = 'Не указано';
      } else {
        totalPrice = parseFloat(totalPrice).toFixed(2);
      }

      const TELEGRAM_BOT_TOKEN = '8049756630:AAHbPxs3rn6El7OfDxd1rmqxQA2PGJngktQ';
      const TELEGRAM_CHAT_ID = '-1002346852862';

      const cartItemsText = parsedCartItems
        .map((item, index) => `${index + 1}. ${item.text} - ${item.count} шт.`)
        .join('\n');

      const message = `
📦 <b>Новый заказ:</b>
🆔 Номер заказа: ${orderId}
📋 Режим заказа: ${orderType === 'delivery' ? '🚚 Доставка' : '🏠 В ресторане'}
📞 Телефон: ${phoneNumber || 'Не указан'}
👥 Гости: ${orderType === 'В ресторане' ? guestCount || 'Не указано' : 'Не требуется'}
⏰ Время: ${orderTime || 'Не указано'}
💬 Комментарий: ${comment || 'Нет комментария'}
💰 Сумма: ${totalPrice} ₽
🍴 <b>Содержимое корзины:</b>
${cartItemsText}
`;

      try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        });

        console.log('Telegram response:', response.data);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Telegram notification sent' }),
        };
      } catch (error) {
        console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error sending notification to Telegram', error: error.message }),
        };
      }
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
