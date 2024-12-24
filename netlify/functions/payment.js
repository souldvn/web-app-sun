const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  // Обработка запроса OPTIONS для предварительного запроса CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешает доступ с любого домена
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Разрешает эти методы
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key', // Разрешает заголовки
      },
      body: JSON.stringify({}),
    };
  }

  const { totalPrice, orderType, comment } = JSON.parse(event.body);
  const idempotenceKey = uuidv4();

  if (!idempotenceKey) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({ message: 'Idempotence key is missing.' }),
    };
  }

  try {
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
