import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Button from '../Button';
import axios from 'axios';
function UploadRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instruction: "",
    ingredients: "",
  })
  const [file, setFile] = useState()
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState({ iserror: false, msg: "" });
  const navigate = useNavigate();
  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormIncomplete = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        return key;
      }
    }
    return false;
  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])
  const handleform = async (e) => {
    e.preventDefault();
    setError({ iserror: false, msg: "" })
    if (!file) {
      setError({
        iserror: true, msg: `Please Upload a file`
      })
      return;
    }
    const key = isFormIncomplete()
    console.log(key)
    if (key) {
      setError({
        iserror: true, msg: `Please Enter ${key}`
      })
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, ["imageUrl"]: file }));
    try {
      const {
        title,
        description,
        instruction,
        ingredients,
      } = formData
      const form = new FormData();
      form.append("image", file)
      form.append("title", title)
      form.append("description", description)
      form.append("instruction", instruction)
      form.append("ingredients", ingredients)
      const res = await axios.post(`${import.meta.env.VITE_URL}/recipe/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      console.log(navigate('/blogs'))
      console.log(res)
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
          <div className="flex justify-center w-full p-3 font-inter font-semibold" >Please Login or Signup to continue</div>
          <Link to={'/login'} className="w-10/12">  <p className="h-16 w-full font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center">Login </p></Link>
          <Link to={'/signup'} className="h-16 w-10/12 font-inter font-bold bg-white rounded-md border-[1px] border-[#b2b0b0] flex justify-center items-center"> Sign-up </Link>
        </div>
        <div className=" w-full h-full flex items-center justify-center fixed backdrop-blur-xl left-2/4 top-left-2/4 right-0 bottom-0 -translate-x-2/4 z-0">

        </div>
      </>
    }

    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="font-inter font-semibold text-4xl pb-10 max-sm:text-2xl">Upload A delicious recipe!</h3>
      <label htmlFor="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile" onChange={handleFileChange}></input>
      <form onSubmit={handleform} className="flex flex-col font-inter font-regular w-[300px] justify-center items-center">
        {
          error.iserror && <p className='text-red-500 w-full text-right p-3'>{error.msg}</p>
        }
        <input className="p-3  w-full mb-3 mt-3
         rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.title} name="title" placeholder="Enter title"></input>
        <textarea className="p-3  w-full mb-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.description} name="description" placeholder="Enter description"></textarea>
        <textarea className="p-3  w-full mb-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.instruction} name="instruction" placeholder="Enter instruction"></textarea>
        <textarea className="p-3  w-full mb-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.ingredients} name="ingredients" placeholder="Enter ingredients"></textarea>
        <Button > SUBMIT 😋</Button>
      </form>

    </div>
  </>

}

export default UploadRecipe;