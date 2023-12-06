import express from 'express';
const app = express();
import authRoute from './routes/authRoutes.js';
import postRoute from './routes/postRoutes.js'
import recipeRoute from './routes/recipeRoutes.js';
import cookieParser from 'cookie-parser'
import { connect } from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT || 3000
app.use(cors({credentials:true,
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus:200
}))
app.use(express.json())
app.use(cookieParser())
app.use(authRoute)
app.use(postRoute)
app.use(recipeRoute)
app.get('/',(req,res)=>{
    res.send("Hellow World");
})


console.log('connecting to DB...')
connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(connection=>console.log("connected to database")).catch(error=>console.error(error))


app.listen(PORT,()=>{ console.log(`served at port: ${PORT} & Local : ${process.env.ALLOWED_ORIGIN}`)})