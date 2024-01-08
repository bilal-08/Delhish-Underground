import { Router } from 'express';
const router = Router();
import login,{signup,logout,updateProfile,userdata} from '../controllers/auth.controller.js';
import { upload } from "../util/uploadImage.js";
import { verifyCredential } from '../middlewares/verifyAuth.js';
router.post('/login',login)

router.post('/signup',signup)

router.get('/logout',logout)

router.post('/edit-profile/update',upload.single('image'),verifyCredential,updateProfile)

router.get('/user-data',verifyCredential,userdata)
export default router;