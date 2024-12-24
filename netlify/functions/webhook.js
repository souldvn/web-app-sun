const axios = require('axios');

exports.handler = async (event, context) => {
  // Проверяем, что это POST-запрос
  if (event.httpMethod === 'POST') {
    const paymentData = JSON.parse(event.body);
    console.log('Received payment data:', paymentData);

    // Проверяем, что событие связано с успешным платежом
    if (paymentData.event === 'payment.succeeded') {
      // Извлекаем данные из metadata платежа
      const { phoneNumber, guestCount, orderTime, comment } = paymentData.object.metadata;
      const totalPrice = paymentData.object.amount.value; // Используем сумму из объекта оплаты

      // Данные для отправки в Telegram
      const TELEGRAM_BOT_TOKEN = '8049756630:AAHbPxs3rn6El7OfDxd1rmqxQA2PGJngktQ';
      const TELEGRAM_CHAT_ID = '-1002346852862';

      // Формируем сообщение для отправки
      const message = `
      Новый заказ:
      Телефон: ${phoneNumber || 'Не указан'}
      Гости: ${guestCount || 'Не указано'}
      Время: ${orderTime || 'Не указано'}
      Комментарий: ${comment || 'Нет комментария'}
      Сумма: ${totalPrice} ₽
      `;

      try {
        // Отправляем запрос в Telegram API для отправки сообщения
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        });

        console.log('Telegram response:', response.data);

        // Возвращаем успешный ответ
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Telegram notification sent' }),
        };
      } catch (error) {
        // Логируем ошибку, если не удалось отправить сообщение
        console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error sending notification to Telegram', error: error.message }),
        };
      }
    } else {
      // Если событие не является успешной оплатой
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment not completed successfully' }),
      };
    }
  }

  // Если метод запроса не POST
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
