import {Schema,model} from "mongoose";


const postSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
},{ timestamps: true })

const Post = model("Post",postSchema);

export default Post;