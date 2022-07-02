const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const { MONGO_URL } = require('./config');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(cors());

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started with PORT=${PORT}`);
});
