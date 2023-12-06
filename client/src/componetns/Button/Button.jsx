
function Button({children}) {
    
    return <>
      <button className="w-full mt-3 bg-black rounded-full p-3 text-white font-semibold hover:bg-gray-800 transition-transform ease-out active:transform active:scale-75 duration-1000 opacity-100 active:opacity-75">{children}</button>
    </>
}

export default Button;