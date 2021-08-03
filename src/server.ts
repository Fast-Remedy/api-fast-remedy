import express, {Response} from 'express';
import cors from 'cors';
import './database/connect';
import routes from './routes';

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || port, () => {
    console.log('Server Running');
});
