import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from '../Button';
function UploadPost() {
  const [formData, setFormData] = useState({
    description: ""
  })
  const [file, setFile] = useState()
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState({ iserror: false, msg: "" });
  const navigate = useNavigate();
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
      openPopUp && <>
        <div className="bg-white w-80 h-80 fixed z-10 rounded-2xl border-[1px] border-[#b2b0b0]  flex flex-col items-center justify-start gap-3  left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 -translate-y-2/4" >
          <div className="flex justify-center w-full p-3" >Please Login or Signup to continue</div>
          <Link to={'/login'} className="w-10/12">  <p className="h-16 w-full font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center">Login </p></Link>
          <Link to={'/signup'} className="h-16 w-10/12 font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center"> Sign-up </Link>
        </div>
        <div className=" w-full h-full flex items-center justify-center fixed backdrop-blur-xl left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 z-0" >

        </div>
      </>
    }


    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="font-inter font-semibold text-4xl pb-10">Create a post!</h3>
      <label htmlFor="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile" onChange={handleFileChange}></input>
      <form onSubmit={handleform} encType='multipart/form-data' className="flex flex-col font-inter font-regular w-[300px] justify-center items-center">
        {
          error.iserror && <p className='text-red-500 w-full text-right p-3'>{error.msg}</p>
        }
        <input className="p-3  w-full mb-3 mt-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.description} name="description" placeholder="Enter description"></input>

        <Button > SUBMIT 😋</Button>
      </form>

    </div>
  </>

}

export default UploadPost;