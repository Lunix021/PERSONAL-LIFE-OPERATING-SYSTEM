import React, { useState } from 'react'
import { useEffect } from 'react';
import api from '../../api/axios';

function Dap({ toal,goal,setgoal,settoal,sessions }) {


  //WHENEVER SESSION CHANGES , WE CALCULATE TOTAL ONCE AGAIN 
  useEffect(()=>{
  
   const getduration=async ()=>{
      try {
          const res=await api.get('/study/sessions');
  console.log(res.data);
  settoal(res.data.total*60*60);
      } 
      catch (err) {
          console.log(err.response.data);
      }}
      getduration();
  },[sessions]);
  
 

  const [tapped, settap] = useState(false);

  const hour=Math.floor(toal/3600)
const min=Math.floor((toal % 3600) / 60)


const remaining = Math.max(goal * 3600 - toal, 0);

const remHour = Math.floor(remaining / 3600);
const remMin = Math.floor((remaining % 3600) / 60);

const num=(toal/(goal*3600))*100;


//SET THE GOAL
const fixgoal=async()=>{
try {
   settap(false);
  const res=await api.post('/user/update',{goal:goal});
 
  console.log(res.data);
} catch (err) {
  console.log(err.response.data);
}
}

useEffect(()=>{
  const getgoal=async()=>{
    
    try {
const res=await api.get('/user/me');
  console.log(res.data);
  setgoal(res.data.preferences.studyGoal??0);
} catch (err) {
  console.log(err.response.data);
}

  }

  getgoal();
},[])


  return (
    <div className='bg-slate-900/70 border border-white/10 w-2/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-6'>

      <div className='text-white text-center font-bold text-xl'>
        <h1>🎯 DAILY PROGRESS </h1>
      </div>


      <div className='flex justify-center'>
        <div className='flex justify-center items-center rounded-full w-32 h-32 ' style={{ background: `conic-gradient(green ${(toal/(goal*3600))*100}%,red 0%)` }}>

          <div className='flex rounded-full w-25 h-25 text-3xl items-center justify-center bg-black text-shadow-white text-shadow-2xs text-blue-500
'  >
            <h1>
             {(Math.round(num * 100) / 100)??0}%
            </h1>
          </div>
        </div>
      </div>


      <div className='text-center space-y-3 mb-5'>

        <div className='flex justify-center bg-slate-800 rounded-lg text-blue-400  p-5 hover:bg-slate-950 transition-all duration-500 w-full border
border-white/10' onClick={() => { settap(true); }}>

          Goal : {tapped ?
            <div>
              <input type='number' className='mx-2 border rounded' size={1} autoFocus value={goal} onChange={(e) =>{setgoal(Number(e.target.value))}} onClick={(e) => e.stopPropagation()} />
              <button className='mx-2 hover:bg-green-700' onClick={(e) => { fixgoal(); e.stopPropagation(); }}>✅</button>
            </div>
            : goal} hours




        </div>

        <h1 className='bg-slate-800 rounded-lg text-green-400 text p-5'> Completed : {hour}h {min}m</h1>

        <h1 className='bg-slate-800 rounded-lg text-red-500 text p-5'>   Remaining : {remHour}h {remMin}m </h1>

      </div>

    </div>
  )
}

export default Dap