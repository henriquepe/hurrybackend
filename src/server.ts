import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import './database';
import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
