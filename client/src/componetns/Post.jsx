import PostCard from "./Card/PostCard";
import { useEffect, useState } from "react";
import axios from 'axios';
function Post() {

  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPosts = async()=>{
      const res = await axios.get(`${import.meta.env.VITE_URL}/posts`)
     setPost(res.data)
    }
    getPosts();
    
  }, [])
 return <>
    <div className="bg-white min-h-screen w-full flex flex-col gap-10 justify-center items-center mt-[50px] mb-20">
    {
        post.map(({imageUrl,description,username},i)=>{
          return <PostCard img={imageUrl} description={description} username={username} key={i} />
        })
    }
 </div>
 </>
    
}

export default Post;
