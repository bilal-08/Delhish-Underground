import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
function RecipeSkeleton() {

    return <>  <div className="w-[225px] min-h-[300px] border-[#707070] border-[1px] rounded-lg shadow-md transition hover:scale-95 active:scale-100">
          <div className="flex flex-col justify-center items-center"> 
          <Skeleton className="h-[180px] w-[223px] p-1 rounded-t-lg"/>
          </div> 
            <div className="flex justify-start items-center font-inter font-semibold text-[#2D2D2D] mt-2 ml-3">
                <Skeleton count={1} height={"30px"} width={"200px"}/>
            </div>
            <div className="font-inter font-semibold text-[12px] p-3 text-[#161313] min-h-[135px] ">
            <Skeleton count={4}/>
                </div> 
        <div className="text-right text-[#2e2e2e] font-medium p-3 text-xs">By <Skeleton count={0.3}/> </div>
            </div>

            <div className="w-[225px] min-h-[300px] border-[#707070] border-[1px] rounded-lg shadow-md transition hover:scale-95 active:scale-100">
          <div className="flex flex-col justify-center items-center"> 
          <Skeleton className="h-[180px] w-[223px] p-1 rounded-t-lg"/>
          </div> 
            <div className="flex justify-start items-center font-inter font-semibold text-[#2D2D2D] mt-2 ml-3">
                <Skeleton count={1} height={"30px"} width={"200px"}/>
            </div>
            <div className="font-inter font-semibold text-[12px] p-3 text-[#161313] min-h-[135px] ">
            <Skeleton count={4}/>
                </div> 
        <div className="text-right text-[#2e2e2e] font-medium p-3 text-xs">By <Skeleton count={0.3}/> </div>
            </div>
            <div className="w-[225px] min-h-[300px] border-[#707070] border-[1px] rounded-lg shadow-md transition hover:scale-95 active:scale-100">
          <div className="flex flex-col justify-center items-center"> 
          <Skeleton className="h-[180px] w-[223px] p-1 rounded-t-lg"/>
          </div> 
            <div className="flex justify-start items-center font-inter font-semibold text-[#2D2D2D] mt-2 ml-3">
                <Skeleton count={1} height={"30px"} width={"200px"}/>
            </div>
            <div className="font-inter font-semibold text-[12px] p-3 text-[#161313] min-h-[135px] ">
            <Skeleton count={4}/>
                </div> 
        <div className="text-right text-[#2e2e2e] font-medium p-3 text-xs">By <Skeleton count={0.3}/> </div>
            </div>
            <div className="w-[225px] min-h-[300px] border-[#707070] border-[1px] rounded-lg shadow-md transition hover:scale-95 active:scale-100">
          <div className="flex flex-col justify-center items-center"> 
          <Skeleton className="h-[180px] w-[223px] p-1 rounded-t-lg"/>
          </div> 
            <div className="flex justify-start items-center font-inter font-semibold text-[#2D2D2D] mt-2 ml-3">
                <Skeleton count={1} height={"30px"} width={"200px"}/>
            </div>
            <div className="font-inter font-semibold text-[12px] p-3 text-[#161313] min-h-[135px] ">
            <Skeleton count={4}/>
                </div> 
        <div className="text-right text-[#2e2e2e] font-medium p-3 text-xs">By <Skeleton count={0.3}/> </div>
            </div>
            
    </>
}

export default RecipeSkeleton;