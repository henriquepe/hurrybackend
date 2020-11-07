import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes/index';
import 'reflect-metadata';
import './database';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

const port = process.env.PORT || 3000;

dotenv.config();

app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
