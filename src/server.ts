import express from 'express';
import cors from 'cors';
import './config/database/connect';
import routes from './routes';
import path from 'path';
import mongoose from 'mongoose';
const app = express();
const port = 3335;

mongoose.connect(
	`mongodb+srv://RafaelCouto:macbook.00@cluster0.ypakl.mongodb.net/fast-remedy?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.use(express.json());
app.use('/file', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || port, () => {
	console.log(`Server Running on port ${port}`);
});
