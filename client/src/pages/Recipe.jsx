import { useParams } from "react-router-dom";
import Navbar from "../componetns/Navbar";
import BottomNavBar from "../componetns/bottomNavBar";
import { useState, useEffect } from "react";
import axios from 'axios'
function Recipe() {
    const { recipeId } = useParams();
    const [activeTab, setActiveTab] = useState("instructions");
    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        const getRecipes = async () => {
            const res = await axios.get(`${import.meta.env.VITE_URL}/recipe/${recipeId}`)
            setRecipe(res.data)
        }
        getRecipes();

    }, [])

    const { title, imageUrl, ingredients, instruction, description } = recipe
    return <>
        <Navbar />
        <div className="flex mt-20 max-sm:flex-col ">

            <div className="w-2/4 flex  justify-center  max-sm:w-full max-sm:mb-10">
                <div className="font-poppins text-2xl font-bold max-sm:flex max-sm:flex-col max-sm:items-center">
                    <p className="">{title}</p>
                    <div className="w-[330px] h-[200px]"><img src={imageUrl} className="object-cover w-[330px] h-[200px]"></img></div>
                </div>

            </div>

            <div>
                <div className="flex pb-10 max-sm:justify-center">
                    <div className={`flex items-center justify-center h-12 w-36 cursor-pointer p-1 ${activeTab == "instructions" ? "text-white bg-black" : "border-black border-2 "}  text-sm  font-poppins font-semibold mr-4`}
                        onClick={() => setActiveTab("instructions")}
                    >
                        Instruction</div>
                    <div className={`flex items-center justify-center h-12 w-36 p-1 cursor-pointer ${activeTab == "ingredients" ? "text-white bg-black" : "border-black border-2 "}  text-sm font-poppins font-semibold `}
                        onClick={() => setActiveTab("ingredients")}

                    >Ingredients</div>
                </div>
                {activeTab == "instructions" && (
                    <div className="flex flex-col max-sm:justify-center max-sm:items-center ">
                        <div className="font-poppins font-normal w-[360px] min-h-[205px]">
                            <p>
                                {description}
                            </p>
                        </div>

                        <div className="font-poppins font-normal w-[360px] min-h-[205px] mt-10 mb-24">
                            <p>
                                {instruction}
                            </p>
                        </div>
                    </div>
                )}
                {activeTab == "ingredients" && (
                    <ul className="list-disc font-poppins font-normal min-h-[305px] flex flex-col max-sm:justify-start max-sm:items-center text-left">
                        <div className="w-[304px]">
                            {ingredients}
                        </div>
                    </ul>
                )}
            </div>
        </div>
        <BottomNavBar />
    </>
}

export default Recipe;