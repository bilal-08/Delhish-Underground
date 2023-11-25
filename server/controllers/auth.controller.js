import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
            }
        )
        return res.status(201).send({ id: user.username })
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







export default login