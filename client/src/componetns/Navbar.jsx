

const Navbar = () => {
    const logout = () =>{
        document.cookie = `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        localStorage.removeItem("DUusername")
    }
    return <>
        <div className="bg-white flex justify-evenly items-center h-20 ">
            <div className="bg-[#ECEAEA] p-0.5 rounded max-sm:hidden">
    <img src=""></img>
            </div>

            <div className="flex w-10/12 justify-center">
            <div><img src="/spoon-fork-icon.png"></img></div>
            <div className="font-lobster text-4xl max-sm:text-3xl">Delish Underground</div>
            </div>
            
            <div className="bg-[#ECEAEA] p-0.5 rounded hover:bg-[#bebcbc] max-sm:hidden" onClick={logout}>
     <img src="/log.png" alt="" />
            </div>
        </div>
    </>
}

export default Navbar;