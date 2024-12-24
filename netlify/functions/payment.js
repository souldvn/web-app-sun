const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({}),
    };
  }

  const { totalPrice, orderType, comment, phoneNumber, guestCount, orderTime } = JSON.parse(event.body);
  const idempotenceKey = uuidv4();

  if (!phoneNumber || !guestCount || !orderTime) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({ message: 'Некоторые обязательные данные отсутствуют' }),
    };
  }

  try {
    // Создаем запрос к API Юкассы
    const response = await axios.post('https://api.yookassa.ru/v3/payments', {
      amount: {
        value: totalPrice.toFixed(2),
        currency: 'RUB',
      },
      capture: true,
      description: `Оплата заказа (${orderType})`,
      confirmation: {
        type: 'redirect',
        return_url: 'http://google.com',
      },
      metadata: {
        orderType,
        comment,
      },
    }, {
      auth: {
        username: '1003026',
        password: 'test_OnkvybsCkcuQMqCuArnLlTd-KTGZ-3q1UqetvsnJFo8',
      },
      headers: {
        'Idempotence-Key': idempotenceKey,
      },
    });

    // Отправка данных в Telegram
    const TELEGRAM_BOT_TOKEN = '8049756630:AAHbPxs3rn6El7OfDxd1rmqxQA2PGJngktQ'; // Ваш токен бота
    const TELEGRAM_CHAT_ID = '547936158'; // Ваш chat_id

    const message = `
    Новый заказ:
    Телефон: ${phoneNumber || 'Не указан'}
    Гости: ${guestCount || 'Не указано'}
    Время: ${orderTime || 'Не указано'}
    Комментарий: ${comment || 'Нет комментария'}
    Сумма: ${totalPrice.toFixed(2)} ₽
    `;
    
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML', // Опционально, если хотите использовать HTML форматирование
    });
    

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({
        confirmationUrl: response.data.confirmation.confirmation_url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({
        message: 'Не удалось создать платёж',
        error: error.response ? error.response.data : error.message,
      }),
    };
  }
};
