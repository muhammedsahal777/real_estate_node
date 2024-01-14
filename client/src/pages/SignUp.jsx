import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
export default function SignUp() {
  const [formData,setFormData] = useState({})
  const [error ,setError] = useState(false)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value
      }
    )
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    try{
      setLoading(true)
      setError(false)
      const result = await axios.post("http://localhost:3000/api/user/sign-up", formData)
      navigate("/sign-in")
    console.log(result)
    }catch(error){
      setLoading(false)
      setError(true)
      console.log(error.response.data.success)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? "loading" : "signup"}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>invalid Credentials</p>}
    </div>
  )
}
