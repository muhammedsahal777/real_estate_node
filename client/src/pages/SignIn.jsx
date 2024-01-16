import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData,setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      dispatch(signInStart());
      const result = await axios.post("http://localhost:3000/api/user/sign-in", formData)
      localStorage.setItem("user" , result.data)
      console.log(result)
      dispatch(signInSuccess(result.data));
      navigate("/")
      console.log(result.data)
    }catch(error){
      dispatch(signInFailure(error.response.data.message));
      console.log(error.response.data.message)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? "loading.." : "sign in"}</button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
