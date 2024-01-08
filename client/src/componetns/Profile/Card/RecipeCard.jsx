
function RecipeCard({data}){
    return <>
    {!data.length && 
            <div className="h-72 flex flex-col justify-center items-center"><img className="w-24 h-24" src="/zero.png"></img>
            <p className="p-3 font-poppins font-regular">No Recipe found</p></div>
            }
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-1 pb-24">
    {
        data.map(({imageUrl},i)=>{
            return <div key={i}>
        <img class="flex flex-col h-full object-cover" src={imageUrl} alt=""></img>

            </div>
        })
    }
    </div>
    </>
}

export default RecipeCard;