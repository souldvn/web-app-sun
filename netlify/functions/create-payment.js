// netlify/functions/create-payment.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async function(event, context) {
  const { totalPrice, orderType, comment } = JSON.parse(event.body);
  const idempotenceKey = uuidv4(); // Генерация уникального Idempotence Key

  try {
    const response = await axios.post('https://api.yookassa.ru/v3/payments', {
      amount: {
        value: totalPrice.toFixed(2), // Сумма заказа
        currency: 'RUB',
      },
      capture: true,
      description: `Оплата заказа (${orderType})`,
      confirmation: {
        type: 'redirect',
        return_url: 'http://yourwebsite.com', // Ваш URL возврата
      },
      metadata: {
        orderType,
        comment,
      },
    }, {
      auth: {
        username: '1003026', // Ваш shopId
        password: 'test_OnkvybsCkcuQMqCuArnLlTd-KTGZ-3q1UqetvsnJFo8', // Ваш secretKey
      },
      headers: {
        'Idempotence-Key': idempotenceKey, // Передаем ключ идемпотентности
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        confirmationUrl: response.data.confirmation.confirmation_url, // Ссылка на оплату
      }),
    };
  } catch (error) {
    console.error('Ошибка при создании платежа:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Не удалось создать платёж',
        error: error.response ? error.response.data : error.message,
      }),
    };
  }
};
