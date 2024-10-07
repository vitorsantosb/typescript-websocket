import express from 'express';
import {Request, Response} from 'express';
const router = express.Router();
import {userFunctions} from '@routes/views/user/functions/user.functions';

router.post('/register', (req: Request, res: Response) => {
	userFunctions.register(req, res).then(r => {
		if(r){
			return;
		}
	}).catch(err => {
		if(err){
			return err;
		}
	});
});

export default router;