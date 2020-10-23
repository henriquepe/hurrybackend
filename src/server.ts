import dotenv from 'dotenv';

import express from 'express';
import routes from './routes/index';
import './database';
import 'reflect-metadata';

const app = express();
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

dotenv.config();

app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
