import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function PostCard({ username, img, description, loading }) {
    return <>
        <div className="bg-white min-h-[429px] w-[350px] rounded-xl border-2 border-[#DCDCE0] shadow-2xl max-sm:w-[300px]">
            <div className="font-inter font-normal text-xs flex justify-start items-center border-b-2 border-[#DCDCE0]">
                <img className="w-5 h-5 rounded-full m-2" src={`https://avatar.vercel.sh/${username.toLowerCase()}`}></img>
                {username}</div>
            <div className="flex justify-center items-center  p-3 border-b-2 border-[#DCDCE0] "><img src={img} className="w-[320px] h-[320px] object-cover"></img></div>
            <div className="font-inter text-[14px] min-h-[130px] p-3"> <strong>{username + "\n"}</strong>
                {description}
            </div>

        </div>
    </>
}

export default PostCard;