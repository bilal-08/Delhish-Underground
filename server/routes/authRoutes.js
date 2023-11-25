import { Router } from 'express';
const router = Router();
import login,{signup,logout} from '../controllers/auth.controller.js';

router.post('/login',login)

router.post('/signup',signup)

router.get('/logout',logout)
export default router;