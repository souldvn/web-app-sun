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

  if (event.httpMethod === 'POST') {
    const paymentData = JSON.parse(event.body);
    console.log('Received payment data:', paymentData);

    if (paymentData.event === 'payment.succeeded') {
      const { flat = 'Не указано', phoneNumber, guestCount, orderTime, comment, orderId, cartItems, orderType, chatId } = paymentData.object.metadata;
      let totalPrice = paymentData.object.amount.value;

      const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
      console.log('Received cart items:', parsedCartItems);

      if (totalPrice === undefined || totalPrice === null) {
        console.error('Total price is not defined');
        totalPrice = 'Не указано';
      } else {
        totalPrice = parseFloat(totalPrice).toFixed(2);
      }

      const TELEGRAM_BOT_TOKEN = '8049756630:AAHbPxs3rn6El7OfDxd1rmqxQA2PGJngktQ';
      const TELEGRAM_CHAT_ID = '-1002346852862'; // Чат для поваров (по-прежнему используем для уведомлений в общий чат)

      // Формируем текст для уведомления повара
      const cartItemsText = parsedCartItems
        .map((item, index) => `${index + 1}. ${item.text} - ${item.count} шт.`)
        .join('\n');

      const chefMessage = `📦 <b>Новый заказ:</b>
🆔 Номер заказа: ${orderId}
      чат айди: ${chatId}
📍 Адрес: ${flat}
📞 Телефон: ${phoneNumber}
👥 Гости: ${guestCount}
⏰ Время: ${orderTime}
💬 Комментарий: ${comment}
💰 Сумма: ${totalPrice} ₽
🍴 <b>Содержимое корзины:</b>
${cartItemsText}`;

      // Отправляем уведомление повару
      try {
        const chefResponse = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          text: chefMessage,
          parse_mode: 'HTML',
        });

        console.log('Telegram response for chef:', chefResponse.data);
      } catch (error) {
        console.error('Error sending message to chef:', error.response ? error.response.data : error.message);
      }

      // Формируем текст для личного сообщения пользователю
      const userMessage = `👋 <b>Здравствуйте!</b>
<b>Ваш заказ подтверждён:</b>
🆔 Номер заказа: ${orderId}

📍 Адрес: ${flat}
📞 Телефон: ${phoneNumber}
👥 Гости: ${guestCount}
⏰ Время: ${orderTime}
💬 Комментарий: ${comment}
💰 Сумма: ${totalPrice} ₽
🍴 <b>Содержимое корзины:</b>
${cartItemsText}

🔔 Мы уже начали готовить ваш заказ. Ожидайте уведомление о готовности.`;

      // Отправляем личное сообщение в чат с пользователем
      try {
        const userResponse = await axios.post(`https://api.telegram.org/bot7515370853:AAEikh7iTegPcr8vhxpYsBNNJOuB30M3oaQ/sendMessage`, {
          chat_id: chatId,  // Используем chatId для отправки сообщения конкретному пользователю
          text: userMessage,
          parse_mode: 'HTML',
        });

        console.log('Telegram response for user:', userResponse.data);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Telegram notification sent to user and chef' }),
        };
      } catch (error) {
        console.error('Error sending message to user:', error.response ? error.response.data : error.message);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error sending notification to user', error: error.message }),
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
