import { Link } from "react-router-dom";
function LoginOrSignup(){


    return <>
    <div className="h-screen flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
        <img className="rounded-full" src="https://avatar.vercel.sh/guest"></img>
            <h3 className="font-inter font-bold p-3 m-3">Guest User</h3>

            <div className="flex font-inter font-bold items-center justify-center">
            
               <Link to={"/login"}><div className="h-16 w-32 bg-blue-700 flex justify-center rounded-3xl p-3 items-center text-white font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-500  transition-transform ease-out active:transform active:scale-75 duration-1000 opacity-100 active:opacity-75 max-sm:text-sm max-sm:w-24 max-sm:h-12">Login</div></Link> 
                <div className="p-3 m-3 max-sm:p-0">or</div>
                <Link to={"/signup"}><div className="h-16 w-32 bg-blue-700 flex justify-center rounded-3xl p-3 items-center text-white font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 transition-transform ease-out active:transform active:scale-75 duration-1000 opacity-100 active:opacity-75 max-sm:text-sm max-sm:w-24 max-sm:h-12">SignUp</div></Link> 
            </div>

        </div>
        </div>
        </>
}

export default LoginOrSignup;