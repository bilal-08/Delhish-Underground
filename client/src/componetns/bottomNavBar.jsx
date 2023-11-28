import { Link } from "react-router-dom";
import { useState } from "react";
function BottomNavBar () {
    const username = localStorage.getItem("DUusername") || "guest"
    const [isOpen, setIsOpen] = useState(false)

    return <>
<div className="bg-white w-80 h-80 fixed z-10 rounded-2xl border-[1px] border-[#b2b0b0]  flex flex-col items-center justify-start gap-3  left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 -translate-y-2/4" style={{display:isOpen ? "flex": "none"}} > 
<div className="flex justify-end w-full p-3" onClick={()=>{setIsOpen(false)}}><img src="/cross.svg"></img></div>
          <Link to={'/upload/post'} className="w-10/12">  <p className="h-16 w-full font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center">Create A post </p></Link>
            <Link to={'/upload/recipe'} className="h-16 w-10/12 font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center">Create A Recipe </Link>
    </div>
<div onClick={()=>{setIsOpen(false)}} className=" w-full h-full flex items-center justify-center fixed backdrop-blur-xl left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 z-0" style={{display:isOpen ? "block": "none"}} >

</div>
    
    <div className="w-full h-16 bg-white shadow-sm border-t-[1px] border-black fixed  bottom-0 flex justify-around items-center">
    <div><Link to={'/'}> <img src="/home-7-line.png" className="h-[24px] w-[24px]"></img></Link></div>
    <div> <Link to={'/blogs'}><img src="/restaurant-line.png" className="h-[24px] w-[24px]"></img></Link></div>
    <div onClick={()=>{setIsOpen(true)}} ><img src="/plus-icon.png" className="h-[24px] w-[24px]"></img></div>
    <div className="w-6 h-6 "><img className="rounded-full" src={`https://avatar.vercel.sh/${username}`}></img></div>
    </div>
    </>
}

export default BottomNavBar;