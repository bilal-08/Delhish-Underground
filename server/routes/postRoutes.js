import { Router } from 'express';
const router = Router();
import { getAllPost, createPost } from '../controllers/posts.controller.js';
import {verifyCredential} from '../middlewares/verifyAuth.js'
import { upload } from "../util/uploadImage.js";

router.get('/posts',getAllPost)
router.post('/post/create', upload.single('image'),verifyCredential,createPost)

export default router;