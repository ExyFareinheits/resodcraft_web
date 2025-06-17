const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './frontend' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Приклад кастомного роуту
  server.get('/custom-route', (req, res) => {
    res.send('Це кастомний роут через Express!');
  });

  // Всі інші Next.js сторінки та API
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log('> Сервер запущено!');
    console.log('> Відкрийте http://localhost:3000/ у браузері');
    console.log('> Або http://<IP_вашого_комп\'ютера>:3000/ з іншого пристрою в мережі');
  });
});
