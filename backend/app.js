require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const corsOptions = require('./middlewares/corsOptions');
const cors = require('cors');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Подключен к БД');
});

const allowList = [
  'http://instagram-minimal.nomoredomainsicu.ru',
  'https://instagram-minimal.nomoredomainsicu.ru',
  'http://api.instagram-minimal.nomoredomainsrocks.ru',
  'https://api.instagram-minimal.nomoredomainsrocks.ru',
  'http://158.160.42.175',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: allowList,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization', 'Accept'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204,
  }),
);

// app.use(corsOptions);
app.use(helmet());
app.use(express.json());

app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт: ${PORT}`);
});
