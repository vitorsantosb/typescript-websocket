import express from 'express';
import {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

//controllers
import userController from '@routes/controllers/user.controller';
import authController from '@routes/controllers/authentication.controller';

app.use(cors({
	origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : undefined,
	//origin: ['*'],
	//methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	//allowedHeaders: ['Access-Control-Allow-Origin','Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}))

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
	limit: '50mb',
	parameterLimit: 50000
}));

app.use('/user', userController);
app.use('/auth', authController);

app.use((_req: Request, res: Response, next: NextFunction): void => {
	res.header('Access-Control-Allow-Origin', ['http://localhost:3001','*']);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	
	if (_req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		res.status(200).json({});
	} else {
		next();
	}
});

app.use((req: Request, res: Response, next: NextFunction) => {
	const err = new Error('Not Found');
	//err.status = 404;
	next(err);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	//res.status();
	res.json({
		error: {
			message: error.message
		}
	});
});

export default app;
