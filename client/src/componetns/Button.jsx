
function Button({children}) {
    
    return <>
    <button className='appearance-none [backface-visibility:hidden] bg-[#1e64c1] rounded-[10px] border-none [box-shadow:none] box-border text-[#fff] cursor-pointer inline-block font-[Inter,-apple-system,system-ui,"Segoe_UI",Helvetica,Arial,sans-serif] text-[15px] font-medium h-[50px] tracking-[normal] leading-normal outline-[none] overflow-hidden px-[30px] py-[14px] relative text-center no-underline [transform:translate3d(0,_0,_0)] [transition:all_.3s] select-none align-top whitespace-nowrap hover:bg-[#1366d6] hover:[box-shadow:rgba(0,_0,_0,_.05)_0_5px_30px,_rgba(0,_0,_0,_.05)_0_1px_4px] hover:opacity-100 hover:translate-y-[0] hover:duration-[350ms] opacity-[.5] active:[box-shadow:rgba(0,_0,_0,_.1)_0_3px_6px_0,_rgba(0,_0,_0,_.1)_0_0_10px_0,_rgba(0,_0,_0,_.1)_0_1px_4px_-1px] active:translate-y-[2px] active:duration-[350ms]  md:px-[22px] md:py-[14px] md:w-[176px]'
        >{children}</button>
    </>
}

export default Button;