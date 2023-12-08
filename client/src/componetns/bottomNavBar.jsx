import { Link } from "react-router-dom";
import { useState } from "react";
import {useLocation} from 'react-router-dom'
function BottomNavBar () {
    const username = localStorage.getItem("DUusername") || "guest"
    const [isOpen, setIsOpen] = useState(false)
    const {pathname} = useLocation();

    return <>
<div className="bg-white w-80 h-80 fixed z-30 rounded-2xl border-[1px] border-[#b2b0b0]  flex flex-col items-center justify-start gap-3  left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 -translate-y-2/4" style={{display:isOpen ? "flex": "none"}} > 
<div className="flex justify-end w-full p-3 " onClick={()=>{setIsOpen(false)}}><img className="hover:bg-[#f2f2f2] p-3 rounded-lg transition-transform ease-out active:transform active:scale-75 duration-700 opacity-100 active:opacity-75" src="/cross.svg"></img></div>
          <Link to={'/upload/post'} className="w-10/12">  <p className="h-16 w-full font-inter font-bold bg-white rounded-2xl border-[1px] border-[#b2b0b0] flex justify-center items-center transition-transform ease-in-out active:transform active:scale-75 duration-75 opacity-100 active:opacity-75">Create A post </p></Link>
            <Link to={'/upload/recipe'} className="h-16 w-10/12 font-inter font-bold bg-white rounded-2xl
             border-[1px] border-[#b2b0b0] flex justify-center items-center transition-transform ease-in-out active:transform active:scale-75 duration-75 opacity-100 active:opacity-75">Create A Recipe </Link>
    </div>
<div onClick={()=>{setIsOpen(false)}} className=" w-full h-full flex items-center justify-center fixed backdrop-blur-xl left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 z-0" style={{display:isOpen ? "block": "none"}} >

</div>
    
<div className="w-[60px] h-screen z-10 bg-white shadow-sm border-r-[1px] border-[#dbdbdb] fixed  bottom-0 flex flex-col justify-around items-center max-sm:flex-row max-sm:w-full max-sm:h-16 max-sm:border-t-[1px]">
<div className="h-[60px] w-[30px] flex items-center justify-center max-sm:hidden"><img className="h-[24px] w-[24px]  transition ease-out delay-150 hover:scale-110 duration-200" src="/spoon-fork-icon.png"></img></div>
    
    <Link to={'/'}><div className="hover:bg-[#f2f2f2] p-3 rounded-lg transition-transform ease-out active:transform active:scale-75 duration-700 opacity-100 active:opacity-75 hover:scale-110"> <img src={pathname =="/" ? "/home-active.png" : "/home-7-line.png"} className="h-[24px] w-[24px]"></img></div></Link>
    <Link to={'/blogs'}><div className="hover:bg-[#f2f2f2] p-3 rounded-lg transition-transform ease-out active:transform active:scale-75 duration-700 opacity-100 active:opacity-75 hover:scale-110"> <img src={pathname == "/blogs" ?"/restaurant-active.png":"/restaurant-line.png"} className="h-[24px] w-[24px]"></img></div></Link>
    <div className="hover:bg-[#f2f2f2] p-3 rounded-lg transition-transform ease-out active:transform active:scale-75 duration-700 opacity-100 active:opacity-75 hover:scale-110" onClick={()=>{setIsOpen(true)}} ><img src={isOpen ? "/plus-active.png" : "/plus-icon.png"} className="h-[24px] w-[24px]"></img></div>
    <div className="w-6 h-6 "><img className="rounded-full" src={`https://avatar.vercel.sh/${username}`}></img></div>
    </div>
    </>
}

export default BottomNavBar;