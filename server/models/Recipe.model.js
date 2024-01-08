import {Schema,model} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const recipeSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    instruction:{
        type:String
    },
    ingredients:{
        type:String
    },
    recipeId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    
},{ timestamps: true })

const Recipe = model("Recipe",recipeSchema);

export default Recipe;