import express from 'express';
import cors from 'cors';
import './database/connect';
import routes from './routes';
import path from 'path';
const app = express();
const port = 3333;

app.use(express.json());
app.use('/file', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || port, () => {
    console.log('Server Running');
});
