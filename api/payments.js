// api/create-payment.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { totalPrice, orderType, comment } = req.body;
    const idempotenceKey = req.headers['idempotence-key'];

    if (!idempotenceKey) {
      return res.status(400).json({
        message: 'Idempotence key is missing.',
      });
    }

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
          return_url: 'http://google.com', // Ваш корректный URL возврата
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
          'Idempotence-Key': idempotenceKey,
        },
      });

      res.status(200).json({
        confirmationUrl: response.data.confirmation.confirmation_url,
      });
    } catch (error) {
      console.error('Ошибка при создании платежа:', error.response ? error.response.data : error.message);
      res.status(500).json({
        message: 'Не удалось создать платёж',
        error: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается.' });
  }
};
