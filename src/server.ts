import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import routes from './routes/index';
import 'reflect-metadata';
import './database';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

dotenv.config();

app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
