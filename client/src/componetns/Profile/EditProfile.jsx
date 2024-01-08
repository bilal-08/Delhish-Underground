import { useState,useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import axios from 'axios'
function EditProfile({setIsEditOpen,userData}){
    const username = localStorage.getItem("DUusername") || "guest"
  const [file, setFile] = useState()
  const [preview, setPreview] = useState() 
  const [error,setError] = useState({iserror:false,msg:""});
  const [loading,setLoading] = useState(false);
  const [isProfileRemoved,setIsProfileRemoved] = useState(false);
const [formData,setFormData] = useState({
        email:userData.email,
        username:userData.username,
        password:"",
        confirmPassword:"",
        avatar:`https://avatar.vercel.sh/${username}`
    })
    console.log(error.msg)
    console.log(formData)
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target.name)
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    const handleFileChange =async (event) => {
        const img = event.target.files[0]
        console.log('originalFile instanceof Blob', img instanceof Blob);
        console.log(`originalFile size ${img.size / 1024 / 1024} MB`);
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
          const compressedFile = await imageCompression(img, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          setFile(compressedFile)
      
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
      }, [file])

      const removeProfileImg = () => {
        URL.revokeObjectURL(preview)
        const avatar = `https://avatar.vercel.sh/${username}`
        setIsProfileRemoved(true)
        setPreview(avatar)
        setFormData((prevFormData) => ({ ...prevFormData, "avatar": avatar }))
      }
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      const handleform = async (e) => {
        console.log("submiting")
        e.preventDefault();
        setError(false)
        console.log(formData.password,formData.confirmPassword)
        if(!validateEmail(formData.email)) {
            setError({iserror:true,msg:"Please Enter a valid email"})
            return;
        }
        if(!(formData.password === formData.confirmPassword)) {
            setError({iserror:true,msg:"Password and confirm password doesn't match"})
            return;
          }
        try {
          setLoading(true)
          const {email,username,password,avatar} = formData
          const form = new FormData();
      form.append("email", email)
      form.append("username", username)
      form.append("password", password)
      console.log(file)
     form.append("image", file)
      form.append("avatar", avatar)
      setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_URL}/edit-profile/update`,
        form,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
            withCredentials: true,
          })
          if(file) URL.revokeObjectURL(preview)

          setIsEditOpen(false)
        } catch (error) {
          setLoading(false)
            console.error(error)
            setError({iserror:true,msg:error.response})
        }
    }


    return <>
    <div className="min-h-screen flex justify-center items-center mb-40">
        <div className="flex flex-col justify-center items-center w-80 max-sm:w-52">
        <div className="flex bg-[#efefef] w-full items-center justify-between rounded-2xl">
        <div className="flex items-center">
      <input accept="image/*" className="hidden" type="file" id="myfile" name="myfile" onChange={handleFileChange}></input>

        <img className="rounded-full w-10 h-10 m-3 object-cover" src={ file || isProfileRemoved ? preview : userData.avatar.includes("vercel") ? `https://avatar.vercel.sh/${username}` : userData.avatar}></img>
            <h3 
            className="font-inter font-bold"
            >{username}</h3>

        </div>
        <div className="flex m-3">
        <label htmlFor="myfile"><img className="w-6 h-6 m-1 cursor-pointer" src="/gallery.png"></img></label>
        <img onClick={removeProfileImg} className="w-6 h-6 m-1 cursor-pointer" src="/delete.png"></img>
        </div>

        </div>

        <form onSubmit={handleform} className="font-inter w-full mt-3 block">              
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
            <input name="username" onChange={handleChange} value={formData.username} type="text" id="username" className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Arterus" >
            </input>
            <label for="email" className={`block mb-2 text-sm font-medium ${error.iserror && error.msg == "Please Enter a valid email" ? "text-red-700 dark:text-red-500" :  "text-gray-900 dark:text-white"}`}>email</label>
            <input name="email" onChange={handleChange} value={formData.email} type="text" id="email" className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="arterusold@gmail.com" >
            
            </input>
            {error.iserror && error.msg == "Please Enter a valid email" && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{error.msg}</p>}
            <label for="password" className={`block mb-2 text-sm font-medium ${error.iserror && error.msg =="Password and confirm password doesn't match" ? "text-red-700 dark:text-red-500" :  "text-gray-900 dark:text-white"}`}>password</label>
            <input name="password" value={formData.password} onChange={handleChange} type="text" id="password" className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password"></input>
            {error.iserror && error.msg =="Password and confirm password doesn't match" && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{error.msg}</p>
}

        <label value={formData.confirmPassword} for="confirmpassword" className={`block mb-2 text-sm font-medium ${error.iserror && error.msg =="Password and confirm password doesn't match" ? "text-red-700 dark:text-red-500" :  "text-gray-900 dark:text-white"}`}>confirm password</label>
            <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="text" id="confirmpassword" class="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your confirm password"></input>
            {error.iserror && error.msg =="Password and confirm password doesn't match" && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium mb-3">{error.msg}</p>
}
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <button onClick={()=>{setIsEditOpen(false)}} type="submit" class="text-black mt-3 bg-[#d3d1d1] hover:bg-[#adacac] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
            </form>
        </div>
        </div>

    </>
}

export default EditProfile