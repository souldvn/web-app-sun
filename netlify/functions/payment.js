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
        return_url: 'https://yourdomain.com/confirmation', // URL для перенаправления после оплаты
      },
      metadata: {
        orderType,
        comment,
        phoneNumber,
        guestCount,
        orderTime,
        totalPrice,
      },
    }, {
      auth: {
        username: '1003026', // Ваш логин
        password: 'test_OnkvybsCkcuQMqCuArnLlTd-KTGZ-3q1UqetvsnJFo8', // Ваш пароль
      },
      headers: {
        'Idempotence-Key': idempotenceKey,
      },
    });

    return {
      statusCode: 200,
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
