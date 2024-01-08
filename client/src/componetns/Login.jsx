import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button/Button';
import axios from 'axios'
import Loading from './Loading/Loading';
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isEyeOpen, setIsEyeOpen] = useState(false)
  const [loading, setLoading] = useState(false);
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
    if (key) {
      setError({
        iserror: true, msg: `Please Enter ${key}`
      })
      return;
    }
    try {
      setLoading(true)

      const res = await axios.post(`${import.meta.env.VITE_URL}/login`, JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      localStorage.setItem("DUusername", res.data.id)
      localStorage.setItem("DUavatar", res.data.avatar)

      navigate('/')
    } catch (error) {
      setLoading(false)
      setError({ iserror: true, msg: error.response.data.msg })
      console.error(error)
    }
  }

  return <>
    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="font-poppins font-bold text-4xl pb-3 max-sm:text-3xl">Welcome back!</h3>
      <h3 className="font-poppins font-semibold text-sm pb-10 max-sm:text-xs">Please enter your details</h3>
      <form onSubmit={handleform} className="flex flex-col font-poppins font-regular w-[300px] justify-center items-center max-sm:w-[250px]">
        {
          error.iserror && <p className='text-red-500 w-full text-right pb-3'>{error.msg}</p>
        }
        <div className="relative w-full">

          <input id="email" className="p-3  w-full mb-7 bg-transparent border-b-2 border-black  text-black bg-none outline-none peer/email" type="text" onChange={handleChange} value={formData.email} name="email"></input>
          <label htmlFor="email" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 transition  peer-focus/email:-translate-y-[25px] peer-focus/email:text-sm select-none ${formData.email ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Email</label>

          <input id="password" className="p-3  w-full mb-3 border-b-2 border-black text-black bg-none outline-none peer/password" type={isEyeOpen ? "text" : "password"} onChange={handleChange} value={formData.password} name="password"></input>
          <label htmlFor="password" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 text-semibold transition  peer-focus/password:-translate-y-[25px] peer-focus/password:text-sm select-none ${formData.password ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Password</label>
          <span onClick={() => { setIsEyeOpen((open) => !open) }} className="absolute right-0 m-3 select-none"><img className="h-6 w-6" src={isEyeOpen ? "/eye-open.png" : "/eye-closed.png"}></img></span>
        </div>
        <Button disabled={loading?true:false}>{ loading ? <Loading/> : "LOGIN"}</Button>
       <p className="mt-6">Don't have an account? <Link to={'/signup'} className="text-blue-600 hover:text-blue-800">Signup</Link> </p><p></p>
      </form>

      {/* 647599,7d88a0 */}
    </div>
  </>

}

export default Login;