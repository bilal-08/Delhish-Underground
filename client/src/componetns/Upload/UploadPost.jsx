import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Button from '../Button/Button';
import Popup from '../Modal/Popup';
import Loading from '../Loading/Loading';
function UploadPost() {
  const [formData, setFormData] = useState({
    description: ""
  })
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState({ iserror: false, msg: "" });
  const [loading, setLoading] = useState(false)
  const textAreaRef = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    textAreaRef.current.style.height = "auto"
textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
  }, [formData.description])
  
  
  const handleChange = (event) => {

    const { name, value } = event.target;
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
  const isFormIncomplete = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        return key;
      }
    }
    return false;
  };

  const handleform = async (e) => {
    e.preventDefault();

    if (!file) {
      setError({
        iserror: true, msg: 'Please Upload a file'
      })
      return;
    }
    const key = isFormIncomplete()
    if (key) {
      setError({
        iserror: true, msg: `Please Enter ${key}`
      })
      return;
    }
    try {
      const { description } = formData;
      const form = new FormData();
      form.append("image", file)
      form.append("description", description)
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_URL}/post/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error(error)
      if(error.response && error.response.status == 400) {
        if(error.response.data.error == "cookie not found") return setOpenPopUp(true)
      }
    }
  }


  return <>
    {
      openPopUp && <Popup />
    }


    <div className="min-h-screen flex flex-col justify-start items-center">
      <h3 className="font-poppins mt-12 font-semibold text-4xl pb-5">Create a post!</h3>
      <h3 className="font-poppins font-semibold text-sm  m-5 text-center max-sm:text-xs">Capture a delightful photo of your meal before savoring each bite :)</h3>
      
      <label htmlFor="myfile" style={{border:file?"solid":""}} className="h-60 w-80 m-3 cursor-pointer font-poppins font-normal flex flex-col justify-center items-center border-dashed rounded-xl border-gray-700 border-2">

      <img className={`${file ? "w-full h-full object-cover rounded-lg" : "h-20 w-20" }`} src={file ? preview : "/cloud-upload.png"}></img>
      {!file && <p>Click here to select the image</p>}
      </label>
      <input accept="image/*" className="hidden" type="file" id="myfile" name="myfile" onChange={handleFileChange}></input>
      <form onSubmit={handleform} encType='multipart/form-data' className="flex flex-col font-inter font-regular w-[325px] justify-center items-center mb-10">
        {
          error.iserror && <p className='text-red-500 w-full text-right p-3'>{error.msg}</p>
        }
        <label className="font-poppins mr-36">Enter description</label>
        <textarea className="p-3 active:outline-none rounded-2xl w-full mb-3 mt-2 resize-none border-2 border-black" type="text" onChange={handleChange} value={formData.description} name="description" rows={"2"} ref={textAreaRef} placeholder="Type something here..."></textarea>
        <Button disabled={loading?true:false}>{ loading ? <Loading/> : "SUBMIT 😋"}</Button>
      </form>

    </div>
  </>

}

export default UploadPost;