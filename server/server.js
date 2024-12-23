const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Ручка для создания платежа
app.post('/create-payment', async (req, res) => {
  const { totalPrice, orderType, comment } = req.body;

  // Логируем все заголовки запроса
  console.log('Полученные заголовки:', req.headers);

  // Проверяем, есть ли заголовок Idempotence-Key
  const idempotenceKey = req.headers['idempotence-key']; 

  if (!idempotenceKey) {
    return res.status(400).json({
      message: 'Idempotence key is missing.',
    });
  }

  console.log('полученный ключ', idempotenceKey); // Логируем ключ идемпотентности

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
        'Idempotence-Key': idempotenceKey, // Передаем ключ идемпотентности в запросе
      },
    });

    console.log('Ответ от Юкассы:', response.data); // Логируем ответ от Юкассы

    res.status(200).json({
      confirmationUrl: response.data.confirmation.confirmation_url, // Ссылка на оплату
    });
  } catch (error) {
    console.error('Ошибка при создании платежа:', error.response ? error.response.data : error.message);
    res.status(500).json({
      message: 'Не удалось создать платёж',
      error: error.response ? error.response.data : error.message,
    });
  }
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Сервер запущен на http://localhost:5000');
});
