import Post from "../models/Post.model.js"
import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import { upload, uploadImg } from "../util/uploadImage.js";

export const getAllPost = async (req, res) => {

    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.send(posts)
}


export const createPost = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(400).json({ error: "cookie not found", success: false })
        const imagePath = req.file.path;
        const image = await uploadImg(imagePath)

        const { description } = req.body
        const user = await User.findById(res.locals.user)
        const result = await new Post({ username: user.username, imageUrl: image, description }).save()

        res.send(result)
    }
    catch (e) {
        console.error(e)
    }

}