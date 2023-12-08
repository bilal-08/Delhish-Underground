import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
function PostSkeleton(){

    return <>
     <div className="bg-white min-h-[429px] w-[350px] rounded-xl border-2 border-[#DCDCE0] shadow-2xl max-sm:w-[300px]">
            <div className="font-inter font-normal text-xs flex justify-start items-center border-b-2 border-[#DCDCE0]">
            <Skeleton circle height={"20px"} width={"20px"} className="m-2"/>
                <Skeleton width={"150px"}  />
                
                </div>
            <div className="flex justify-center items-center  p-3 border-b-2 border-[#DCDCE0] ">
            <Skeleton className="w-[320px] h-[320px] object-cover max-sm:w-[270px]"/>
                {/* <img src={} className="w-[320px] h-[320px] object-cover"></img> */}
                </div>
            <div className="font-inter text-[14px] min-h-[130px] p-3"> <strong></strong>
                {<Skeleton count={3} className="" />}
            </div>

        </div>
        <div className="bg-white min-h-[429px] w-[350px] rounded-xl border-2 border-[#DCDCE0] shadow-2xl max-sm:w-[300px]">
            <div className="font-inter font-normal text-xs flex justify-start items-center border-b-2 border-[#DCDCE0]">
            <Skeleton circle height={"20px"} width={"20px"} className="m-2"/>
                <Skeleton width={"150px"}  />
                
                </div>
            <div className="flex justify-center items-center  p-3 border-b-2 border-[#DCDCE0] ">
            <Skeleton className="w-[320px] h-[320px] object-cover max-sm:w-[270px]"/>
                {/* <img src={} className="w-[320px] h-[320px] object-cover"></img> */}
                </div>
            <div className="font-inter text-[14px] min-h-[130px] p-3"> <strong></strong>
                {<Skeleton count={3} className="" />}
            </div>

        </div>
        
        </>


}

export default PostSkeleton;