require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const corsOptions = require('./middlewares/corsOptions');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Подключен к БД');
});

// const corsOptions = {
//  origin: 'http://localhost:3001',
//  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//  credentials: true,
// };

app.use(corsOptions);
// app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт: ${PORT}`);
});
