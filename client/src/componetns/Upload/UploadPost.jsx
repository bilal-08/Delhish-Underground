import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
import Popup from '../Modal/Popup';
function UploadPost() {
  const [formData, setFormData] = useState({
    description: ""
  })
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState({ iserror: false, msg: "" });
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
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
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
      const res = await axios.post(`${import.meta.env.VITE_URL}/post/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      navigate('/')
    } catch (error) {
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
      <h3 className="font-poppins font-semibold text-sm pb-5">Take delicious photo of what you eat before eating :)</h3>
      
      <label htmlFor="myfile" style={{border:file?"solid":""}} className="h-60 w-80 m-3 cursor-pointer font-poppins font-normal flex flex-col justify-center items-center border-dashed rounded-xl border-gray-700 border-2">

      <img className={`${file ? "w-full h-full object-cover rounded-lg" : "h-20 w-20" }`} src={file ? preview : "/cloud-upload.png"}></img>
      {!file && <p>Click here to select the image</p>}
      </label>
      <input accept="image/*" className="hidden" type="file" id="myfile" name="myfile" onChange={handleFileChange}></input>
      <form onSubmit={handleform} encType='multipart/form-data' className="flex flex-col font-inter font-regular w-[325px] justify-center items-center">
        {
          error.iserror && <p className='text-red-500 w-full text-right p-3'>{error.msg}</p>
        }
        <label className="font-poppins mr-36">Enter description</label>
        <textarea className="p-3 active:outline-none rounded-2xl w-full mb-3 mt-2 resize-none border-2 border-black" type="text" onChange={handleChange} value={formData.description} name="description" rows={"2"} ref={textAreaRef} placeholder="Type something here..."></textarea>
        <Button>SUBMIT 😋</Button>
      </form>

    </div>
  </>

}

export default UploadPost;