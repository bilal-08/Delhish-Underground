import PostCard from "./Card/PostCard";
import { useEffect, useState } from "react";
import axios from 'axios';
import PostSkeleton from "./Card/PostSkeleton";
function Post() {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([{imageUrl:"",description:"",username:""}]);
  useEffect(() => {
    const getPosts = async()=>{
      const res = await axios.get(`${import.meta.env.VITE_URL}/posts`)
     setPost(res.data)
     setLoading(false)
    }
    getPosts();
    
  }, [])
 return <>
    <div className="bg-white min-h-screen w-full flex flex-col gap-10 justify-center items-center mt-[50px] mb-20">
      {loading && <PostSkeleton />}
      {!loading && 
        post.map(({imageUrl,description,username,avatar},i)=>{
          return <PostCard img={imageUrl} description={description} username={username} avatar={avatar} key={i} loading={loading} />
        })
    }
 </div>
 </>
    
}

export default Post;
