const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const paymentData = JSON.parse(event.body);
    console.log('Received payment data:', paymentData);

    // Проверяем, что платеж был успешно завершен
    if (paymentData.status === 'succeeded') {
      const { phoneNumber, guestCount, orderTime, comment, totalPrice } = paymentData.metadata;

      // Отправка данных в Telegram
      const TELEGRAM_BOT_TOKEN = '8049756630:AAHbPxs3rn6El7OfDxd1rmqxQA2PGJngktQ';
      const TELEGRAM_CHAT_ID = '-1002346852862';

      const message = `
      Новый заказ:
      Телефон: ${phoneNumber || 'Не указан'}
      Гости: ${guestCount || 'Не указано'}
      Время: ${orderTime || 'Не указано'}
      Комментарий: ${comment || 'Нет комментария'}
      Сумма: ${totalPrice.toFixed(2)} ₽
      `;

      try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        });

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Telegram notification sent' }),
        };
      } catch (error) {
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
