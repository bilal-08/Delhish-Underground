
function Button({disabled,children}) {
    
    return <>
      <button disabled={disabled} className="w-full mt-3 bg-black flex justify-center rounded-full p-3 text-white font-semibold hover:bg-gray-800 transition-transform ease-out active:transform active:scale-75 duration-1000 opacity-100 active:opacity-75">{children}</button>
    </>
}

export default Button;