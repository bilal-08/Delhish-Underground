import Recipe from "../models/Recipe.model.js";
import User from "../models/User.model.js"
import { upload, uploadImg } from "../util/uploadImage.js";
export const getAllRecipes = async(req,res) => {

    const result = await Recipe.find({},{imageUrl:1,description:1,title:1,username:1,recipeId:1,_id:0}).sort({ createdAt: -1 })
    res.send(result)

} 

export const getRecipeByid = async(req,res) =>{
    const recipe = await Recipe.findOne({recipeId:req.params.id})
    res.send(recipe)
}

export const createRecipe = async(req,res) =>{
    const imagePath = req.file.path;
    const image = await uploadImg(imagePath)
    const {imageUrl,title,description,instruction,ingredients} = req.body;
    const user = await User.findById(res.locals.user)
    const result = await new Recipe({
        username:user.username,imageUrl:image,title,description,instruction,ingredients
    }).save()
    res.send(result)
}