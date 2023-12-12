import {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from './Button/Button';
import Loading from './Loading/Loading';
function Signup() {
    const [formData,setFormData] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        username:""
    })
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [loading,setLoading] = useState(false);
    const [error,setError] = useState({iserror:false,msg:""});
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
        if(!(formData.password === formData.confirmPassword)) {
            setError({iserror:true,msg:"Password and confirm password doesn't match"})
            return;
          }
        try {
          setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_URL}/signup`,
        JSON.stringify(formData),{
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,     
            },
            withCredentials: true,
          })
          localStorage.setItem("DUusername",res.data.id)
          navigate('/')
        } catch (error) {
          setLoading(false)
            console.error(error)
            setError({iserror:true,msg:error.response.data.errors.email ||error.response.data.errors.password })
        }
    }

    return <>
        <div className="h-screen flex flex-col justify-center items-center">
            <h3 className="font-inter font-semibold text-4xl pb-7">Howdy new peep!</h3>
            <h3 className="font-inter font-semibold text-lg pb-7">Enter your details to get started</h3>

<form onSubmit={handleform} className="flex flex-col font-inter font-regular w-[300px] justify-center items-center">
            {
        error.iserror && <p className='text-red-500 w-full text-right pb-3'>{error.msg}</p>
       }
        <div className="relative w-full">
        <input  id="username" className="p-3  w-full mb-3 bg-transparent border-b-2 border-black  text-black bg-none outline-none peer/username" type="text" onChange={handleChange} value={formData.username} name="username"></input>
          <label htmlFor="username" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 transition  peer-focus/username:-translate-y-[25px] peer-focus/username:text-sm  select-none ${formData.username ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Username</label>
           
          <input id="email" className="p-3  w-full mb-3 bg-transparent border-b-2 border-black  text-black bg-none outline-none peer/email" type="text" onChange={handleChange} value={formData.email} name="email"></input>
          <label htmlFor="email" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 transition  peer-focus/email:-translate-y-[25px] peer-focus/email:text-sm select-none ${formData.email ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Email</label>
 
          <input id="password" className="p-3  w-full mb-3 border-b-2 border-black text-black bg-none outline-none peer/password" type={isEyeOpen ? "text" : "password"} onChange={handleChange} value={formData.password} name="password"></input>
          <label htmlFor="password" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 text-semibold transition  peer-focus/password:-translate-y-[25px] peer-focus/password:text-sm select-none ${formData.password ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Password</label>
          
          <input id="confirmPassword" className="p-3  w-full mb-3 border-b-2 border-black text-black bg-none outline-none peer/confirmPassword" type={isEyeOpen ? "text" : "confirmPassword"} onChange={handleChange} value={formData.confirmPassword} name="confirmPassword"></input>
          <label htmlFor="confirmPassword" className={`absolute left-0 p-3 font-poppins font-light text-gray-800 text-semibold transition  peer-focus/confirmPassword:-translate-y-[25px] peer-focus/confirmPassword:text-sm select-none ${formData.confirmPassword ? "text-sm -translate-y-[25px]" : "text-lg max-sm:text-sm"}`}>Confirm Password</label>
          <label onClick={() => { setIsEyeOpen((open) => !open) }} className="absolute right-0 m-3 select-none"><img className="h-6 w-6" src={isEyeOpen ? "/eye-open.png" : "/eye-closed.png"}></img></label>
          <Button disabled={loading?true:false}>{ loading ? <Loading/> : "Sign-up!"}</Button>
        </div>
            </form>
        </div>
    </>

}

export default Signup;