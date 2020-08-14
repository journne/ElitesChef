import express from 'express';
import mongoose from 'mongoose';
import { urlencoded, json } from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/index';

dotenv.config();

const database = process.env.DB;
const port = process.env.PORT;

mongoose.connect(database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
mongoose.connection
  .on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/', router);
app.use('/users', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
