import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios'
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState({ iserror: false, msg: "" });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.name)
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

  const handleform = async (e) => {
    e.preventDefault();
    setError(false)
    const key = isFormIncomplete()
        if(key) {
          setError({
            iserror:true, msg:`Please Enter ${key}`
          }) 
          return;
        }
    try {
    setLoading(true)

      const res = await axios.post(`${import.meta.env.VITE_URL}/login`,JSON.stringify(formData),{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      localStorage.setItem("DUusername",res.data.id)
      navigate('/')
    } catch (error) {
      setError({iserror:true,msg:error.response.data.msg })
      setLoading(false)
      console.error(error)
    }
  }

  return <>
    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="font-inter font-semibold text-4xl pb-10">Login</h3>
      <form onSubmit={handleform} className="flex flex-col font-inter font-regular w-[300px] justify-center items-center">
      {
        error.iserror && <p className='text-red-500 w-full text-right pb-3'>{error.msg}</p>
       }
        <input className="p-3  w-full mb-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.email} name="email" placeholder="Enter email"></input>
        <input className="p-3  w-full mb-3 rounded-lg text-black bg-[#D9D9D9]" type="text" onChange={handleChange} value={formData.password} name="password" placeholder="Enter password"></input>
        <Button>Login</Button>
      </form>
      {/* 647599,7d88a0 */}
    </div>
  </>

}

export default Login;