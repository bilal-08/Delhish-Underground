import jwt from "jsonwebtoken"

export const verifyCredential = async(req,res,next) => {

    const token = req.cookies.jwt
    if(!token) return res.status(400).json({error:"cookie not found",success:false})

    jwt.verify(token,  process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            console.error(err)
            res.status(400).json(err)
        }
        else {
            res.locals.user = decodedToken.id
        }
    })
next();
}