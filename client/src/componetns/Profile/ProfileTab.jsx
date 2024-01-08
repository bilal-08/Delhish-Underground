import { useState, useEffect } from "react"
import PostCard from "./Card/PostCard"
import RecipeCard from "./Card/RecipeCard"
import axios from 'axios';
import CardSkeleton from "./Card/CardSkeleton";
const ProfileTab = ({setIsEditOpen,setData}) => {
    const username = localStorage.getItem("DUusername") || "guest"
    const [isActive,setActive] = useState("posts")
    const [userData, setUserData] = useState({
        postCount:0,
        recipeCount:0,
        posts:[],
        recipes:[],
        avatar:`https://avatar.vercel.sh/${username}`,
        isFetched:false
    })
    useEffect(() => {
        const getUserData = async()=>{
            const res = (await axios.get(`${import.meta.env.VITE_URL}/user-data`,{
                withCredentials: true
            })).data
            const {
                postCount,
                recipeCount,
                posts,
                recipes,
                email,
                username,
                avatar
            } = res
           setUserData({
                postCount,
                recipeCount,
                posts,
                recipes,
                avatar,
                isFetched:true
           })
           setData({
            email,username,avatar
           })
        localStorage.setItem("DUavatar", avatar)

          }
          getUserData();
    
    }, [])


    console.log(userData)
return <>
<div className="h-screen flex flex-col justify-start ml-14 max-sm:ml-0 items-center">
        <div className="h-36 flex justify-around w-4/5 mt-6 mb-6">
    <div className="w-36 h-36 min-w-[80px] mr-7 flex justify-center items-center max-sm:mr-0"><img className="w-28 h-28 object-cover rounded-full max-sm:w-20 max-sm:h-20" src={ userData.avatar.includes("vercel") ? `https://avatar.vercel.sh/${username}` : userData.avatar }></img></div>
    <div className="flex flex-col justify-center items-start w-[600px] font-inter max-sm:items-center">
    <div className="flex justify-center items-center">
    <h3 className="font-bold p-3 max-sm:text-md">{username}</h3>
    <button onClick={()=>{setIsEditOpen(true)}} type="submit" className="text-white w-24 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:w-24 max-sm:h-8 max-sm:text-xs">Edit Profile</button>
    
    </div>
    
    <div className="flex mt-3 p-3 w-44 justify-between max-sm:text-sm max-sm:w-40">
     <p> <strong>{userData.postCount}</strong> posts</p>
     <p> <strong>{userData.recipeCount}</strong> recipes</p>
    </div>
    </div>
    
        </div>

        <div className="min-h-screen  w-4/5 border-t-[1px] border-gray-300">

            <div className="flex justify-center w-full font-inter font-medium tracking-widest max-sm:text-xs">
                <div onClick={()=>{setActive("posts")}} className={`w-36 active:opacity-40 flex items-center justify-center ${isActive == "posts" ?  "text-black border-black" : " text-gray-500 border-none"}  border-t-[1px] pt-4 cursor-pointer`}><img className={`w-5 h-5 mr-2   ${isActive=="posts" ? "opacity-100" : "opacity-60"} `} src="/grid.png"></img>Posts</div>
                <div onClick={()=>{setActive("recipes")}} className={`w-36 active:opacity-40 flex items-center justify-center ${isActive == "recipes" ?  "text-black border-black" : " text-gray-500 border-none"} border-t-[1px] pt-4 cursor-pointer`}><img className={`w-5 h-5 mr-2  ${isActive=="recipes" ? "opacity-100" : "opacity-60"}`} src="/restaurant-line.png"></img> Recipes</div>
            </div>
            {(!userData.postCount || !userData.recipeCount) && <CardSkeleton/>}
            {
               (userData.postCount || userData.recipeCount) && isActive == "posts" ? <PostCard data={userData.posts} isFetched={userData.isFetched}/> : <RecipeCard data={userData.recipes} isFetched={userData.isFetched}/>
            }
        </div>
    </div>
</>}
export default ProfileTab;