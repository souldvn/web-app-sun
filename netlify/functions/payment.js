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

  const { flat, cartItems, totalPrice, comment, phoneNumber, guestCount, orderTime, orderId } = JSON.parse(event.body);
  const idempotenceKey = uuidv4();

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Корзина пуста или отсутствует' }),
    };
  }

  try {
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: totalPrice.toFixed(2),
          currency: 'RUB',
        },
        capture: true,
        description: `Оплата заказа (${flat}), Номер заказа: ${orderId}`,
        confirmation: {
          type: 'redirect',
          return_url: 'http://google.com', // Замените на реальный URL
        },
        metadata: {
          orderId,
          phoneNumber: phoneNumber || 'Не указан',
          flat: flat || 'Не указано',
          guestCount: orderType === 'В ресторане' ? guestCount || 'Не указано' : 'Не требуется',
          orderTime: orderTime || 'Не указано',
          comment: comment || 'Нет комментария',
          totalPrice: totalPrice.toFixed(2),
          // orderType,
          cartItems: JSON.stringify(cartItems),
        },
        
      },
      {
        auth: {
          username: '1003026', // Ваш Shop ID
          password: 'test_OnkvybsCkcuQMqCuArnLlTd-KTGZ-3q1UqetvsnJFo8', // Ваш секретный ключ
        },
        headers: {
          'Idempotence-Key': idempotenceKey,
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Idempotence-Key',
      },
      body: JSON.stringify({
        confirmationUrl: response.data.confirmation.confirmation_url,
        orderId,
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
