import { Link } from "react-router-dom";

function Popup() {

return <>
<div className="bg-white font-poppins font-bold w-80 h-80 fixed z-10 rounded-2xl border-[1px] border-[#b2b0b0]  flex flex-col items-center justify-start gap-3  left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 -translate-y-2/4" >
  <div className="flex justify-center w-full m-3 mb-6 mt-6" >Please Login or Signup to continue</div>
  <Link to={'/login'} className="w-10/12">  <p className="h-16 w-full font-inter font-bold bg-white rounded-2xl border-[1px] border-[#b2b0b0] flex justify-center items-center">Login </p></Link>
  <Link to={'/signup'} className="h-16 w-10/12 font-inter font-bold bg-white rounded-2xl border-[1px] border-[#b2b0b0] flex justify-center items-center"> Sign-up </Link>
</div>
<div className=" w-full h-full flex items-center justify-center fixed backdrop-blur-xl left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 z-0" >

</div>
</>

}
export default Popup;