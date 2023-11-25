import {Schema,model} from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
const {isEmail} = validator
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please Enter a username"],
        minlength: 3,
        maxlength: 64
    },
    email:{
        type:String,
        required:[true,"Please Enter an email"],
        unique:true,
        validate:[isEmail,"Enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Minimum password length is 8 characters."]
    },
    avatar :{
        type:String
    }
})

userSchema.pre('save', async function (next){
    // console.log(this)
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password,salt)
    this.avatar = `https://avatar.vercel.sh/${this.username}`
    next();
})


const User = model("User",userSchema);


export default User;