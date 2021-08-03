import express from 'express';
import cors from 'cors';
import './database/connect';

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('Server Running');
});
