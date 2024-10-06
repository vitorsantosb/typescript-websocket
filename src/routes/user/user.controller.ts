import express from 'express';
import {Request, Response} from 'express';
import {userFunctions} from '@routes/user/functions/user.functions';
const router = express.Router();

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