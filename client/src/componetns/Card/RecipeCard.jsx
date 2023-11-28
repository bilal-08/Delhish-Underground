import { Link } from "react-router-dom";

function RecipeCard({username,recipeId,description,title,img}) {

    return <>
     <Link to={`/recipe/${recipeId}`}>  <div className="w-[225px] min-h-[300px] border-[#707070] border-[1px] rounded-lg shadow-md">
            <div > <img className="w-[225px] h-[180px] object-cover mb-2 rounded-t-lg" src={img}></img></div>
            <div className="font-inter font-semibold text-[#2D2D2D] mt-2 ml-3">{title}</div>
            <div className="font-inter font-light text-[14px] p-3 text-[#161313] min-h-[135px] ">
                {description.slice(0,135)} {description.length > 130 ? "...":""}
                </div> 
        <div className="text-right text-[#2e2e2e] font-medium p-3 text-xs">By {username}</div>
            </div>
            </Link>
    </>
}

export default RecipeCard;