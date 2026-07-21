import React from 'react'
import reg_bg from '../images/reg_bg.png'
import { useState } from 'react';
import api from '../api/axios';

function Register() {



    const[credential,setCredential]=useState({
        email:"",
        pwd:"",
        confirmpwd:"",
        name:""
    });
    
    
    const register= async()=>{
        try {
        const res= await api.post('/user/register',credential);
         console.log(res.data);
        window.location.href='/login'
        } catch (err) {
            console.log(err.response.data);
        }
    }


  return (
    <>
    <div className='min-h-screen relative'>
        {/* BACKGROUND IMAGE */}
    <div className='absolute inset-0 -z-20 blur-sm' style={{backgroundImage:`url(${reg_bg})`,  backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`}}>
    </div>


    <div className='flex justify-center items-center min-h-screen'>

{/* CARD */}
<div className="
  flex flex-col 
 w-105
  shadow-2xl 
  rounded-3xl 
  border border-white/20 
  space-y-6 
  p-10 
  backdrop-blur-lg 
  bg-black/40
">

  <h1 className="
    text-4xl 
    font-bold 
    text-center 
    text-white
    tracking-wide
  ">
    PLEASE REGISTER
  </h1>

  


  <input onChange={(e)=>{setCredential({...credential,name:e.target.value})}}
    type="text"
    placeholder="Name"
    className="
      w-full
      rounded-xl
      px-5
      py-3
      text-xl
      text-white
      bg-white/10
      border
      border-white/20
      outline-none
      placeholder:text-white/50
      focus:border-blue-400
      focus:ring-2
      focus:ring-blue-400/40
      transition
    "
  />


  <input onChange={(e)=>{setCredential({...credential,email:e.target.value})}}
    type='email'
    placeholder="E-mail"
    className="
      w-full
      rounded-xl
      px-5
      py-3
      text-xl
      text-white
      bg-white/10
      border
      border-white/20
      outline-none
      placeholder:text-white/50
      focus:border-blue-400
      focus:ring-2
      focus:ring-blue-400/40
      transition
    "
  />

  <input onChange={(e)=>{setCredential({...credential,pwd:e.target.value})}}
    type="password"
    placeholder="Password"
    className="
      w-full
      rounded-xl
      px-5
      py-3
      text-xl
      text-white
      bg-white/10
      border
      border-white/20
      outline-none
      placeholder:text-white/50
      focus:border-blue-400
      focus:ring-2
      focus:ring-blue-400/40
      transition
    "
  />

  <input onChange={(e)=>{setCredential({...credential,confirmpwd:e.target.value})}}
    type="password"
    placeholder="Confirm Password"
    className="
      w-full
      rounded-xl
      px-5
      py-3
      text-xl
      text-white
      bg-white/10
      border
      border-white/20
      outline-none
      placeholder:text-white/50
      focus:border-blue-400
      focus:ring-2
      focus:ring-blue-400/40
      transition
    "
  />


  <button onClick={register}
    className="
      w-full
      rounded-xl
      py-3
      text-xl
      font-semibold
      text-white
      bg-blue-600/80
      hover:bg-blue-500
      shadow-sm
      shadow-blue-500/30
      transition-all
      duration-300
      hover:scale-[1.02]
    "
  >
   REGISTER
  </button>

</div>


    </div>
    </div>
    </>
  )
}

export default Register