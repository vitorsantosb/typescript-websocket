import express from 'express';
import {Request, Response} from 'express';
import {authFunctions} from '@routes/views/auth/functions/auth.functions';
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
	authFunctions.login(req, res).then(r => {
		if(r){
			return;
		}
	}).catch(err => {
		if(err){
			return err;
		}
	})
})

export default router;