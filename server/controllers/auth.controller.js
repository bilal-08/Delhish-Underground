import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Post from "../models/Post.model.js"
import Recipe from "../models/Recipe.model.js"
import { uploadImg } from "../util/uploadImage.js";
const handleError = (err) => {
    let errors = { email: '', password: '' }

    if (err.code == 11000) {
        errors.email = "Email Already Exists"
        return errors;
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })

    }
    return errors
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.send("user not found")
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
        const token = createToken(user._id);
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.cookie("jwt", token,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
                Partitioned: true
            }
        )
        return res.status(201).send({ id: user.username, avatar: user.avatar })
    }
    if (!auth) return res.status(400).send({ error: true, msg: "Password incorrect" })
    res.send("Login...")
}




export const signup = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const result = await new User({ username, email, password }).save();
        if (result) {
            const token = createToken(result._id);
            res.cookie('jwt', token,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                    Partitioned: true,
                })
        }
        res.status(201).send({ id: result.username })
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ errors })
    }



}

export const logout = (req, res) => {
    res.clearCookie("jwt")
    res.send("cookie cleared")
}


export const updateProfile = async (req,res) =>{
    const { password,avatar} = req.body
    let imagePath 
    if(req.file) imagePath = req.file.path;
    let img
    if(imagePath) img = await uploadImg(imagePath)
    else img = avatar
    let userData ={};
    for(const data in req.body) {
        if(req.body[data]) userData[data] = req.body[data]
    }
    if(userData.password) {
        const salt = await bcrypt.genSalt(15);
        userData.password = await bcrypt.hash(password,salt)
    }
    if(imagePath)userData.avatar = img
    try {
        const user = await User.updateOne({_id:res.locals.user},userData)
        if (user) {
            res.status(201).json({success:true})
        }
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ success:false, errors })
    }
    
}

export const userdata = async (req,res) =>{
    const {username,email,avatar} = await User.findOne({_id:res.locals.user})
    const posts = await Post.aggregate([
        { $match: { username: username } },
        { $group: { _id: null, count: { $sum: 1 }, posts: { $push: "$$ROOT" } } },
        { $project: { _id: 0, count: 1, posts: { $map: { input: "$posts", as: "post", in: { imageUrl: "$$post.imageUrl" } } } } }
      ]);
      const recipes = await Recipe.aggregate([
        { $match: { username: username } },
        { $group: { _id: null, count: { $sum: 1 }, recipes: { $push: "$$ROOT" } } },
        { $project: { _id: 0, count: 1, recipes: { $map: { input: "$recipes", as: "recipe", in: { imageUrl: "$$recipe.imageUrl" } } } } }
      ]);
    res.status(201).json({
        postCount:posts[0]?.count||0,
        recipeCount:recipes[0]?.count||0,
        posts:posts[0]?.posts||[],
        recipes: recipes[0]?.recipes || [],
        username,
        email,
        avatar
    })

}


export default login