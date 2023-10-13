require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { DATABASE_URL, PORT, message } = require('./utils/constants');
const limiter = require('./middlewares/limiter');

const app = express();

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log(message.databaseConnectSuccessful);
  })
  .catch((error) => {
    console.log(`${message.databaseConnectNotSuccessful} - ${error.message}`);
  });

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/globalError'));

app.listen(PORT);
