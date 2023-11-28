import Navbar from "../componetns/Navbar";
import BottomNavBar from "../componetns/bottomNavBar";
import RecipeCard from '../componetns/Card/RecipeCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
function Blog() {

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/recipes`)
      setRecipe(res.data)
    }
    getRecipes();

  }, [])
  return <>
    <Navbar />


    <div className="min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-14 gap-x-7 mt-10 p-10 mb-10 max-sm:grid-cols-1 max-sm:gap-x-0 max-sm:gap-6 place-items-center">
        {
          recipe.map(({ username, imageUrl, title, description, recipeId }, i) => {
            return <RecipeCard key={i} recipeId={recipeId} description={description} title={title} img={imageUrl} username={username} />
          })
        }



      </div>
    </div>
    <BottomNavBar />
  </>

}

export default Blog;