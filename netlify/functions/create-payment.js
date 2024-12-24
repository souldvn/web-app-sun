const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  const { totalPrice, orderType, comment } = JSON.parse(event.body);
  const idempotenceKey = uuidv4();

  if (!idempotenceKey) {
    return {
      statusCode: 400,
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
      body: JSON.stringify({
        confirmationUrl: response.data.confirmation.confirmation_url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Не удалось создать платёж',
        error: error.response ? error.response.data : error.message,
      }),
    };
  }
};
