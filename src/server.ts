import express from 'express';
import routes from './routes/index';
import './database';
import 'reflect-metadata';

const app = express();
app.use(express.json());

app.use(routes);

const port = 3333;

app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
