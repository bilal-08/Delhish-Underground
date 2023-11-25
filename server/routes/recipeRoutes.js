import { Router } from 'express';
const router = Router();
import { createRecipe,getAllRecipes,getRecipeByid } from '../controllers/recipe.controller.js';
import {verifyCredential} from '../middlewares/verifyAuth.js'
import { upload } from "../util/uploadImage.js";

router.get('/recipes',getAllRecipes)

router.post('/recipe/create', upload.single('image'),verifyCredential,createRecipe)

router.get('/recipe/:id',getRecipeByid)
export default router;