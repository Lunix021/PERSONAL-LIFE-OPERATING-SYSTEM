import React from 'react'

import api from '../../api/axios'
import { useEffect } from 'react';
import { useState } from 'react';

function Westan({data,setdata}) {

const sunday=new Date(2026,6,26);




//GETTING ALL WEEKLY ANALYSIS
  useEffect(()=>{
const analytics =async()=>{
  try {
    const res=await api.get('/study/analytics');
    console.log(res.data); 

    setdata(prev => ({
  ...prev,
  weeklyHours: res.data.weeklyHours,
  streak:res.data.streak,
  completedGoals:res.data.completedGoals,
  bestDay:res.data.bestDay,
  total:res.data.total
}));

if(res.data.bestDay===-1){setdata(prev=>({...prev,bestDay:"FIRST STUDY BRO"}));}
else{

  const day = new Date(sunday);
  day.setDate(sunday.getDate() + res.data.bestDay);


 setdata(prev=>({...prev,bestDay:day.toLocaleString("default", { weekday: "short"})}));
}


  } catch (err) {
    console.log(err.response.data);
  }
}
analytics();
  },[])




const maxHours = Math.max(...data.weeklyHours.map(item => item));

  return (
    <div className='bg-slate-900/70 border border-white/10 w-full backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>📊 Weekly Analytics   </h1>
</div>

<div className='grid grid-cols-7 mx-5'>
{
data.weeklyHours.map((item,index)=>
 {
   const day = new Date(sunday);
  day.setDate(sunday.getDate() + index);

 return (<div 
    className='h-60 flex flex-col justify-end items-center' 
    key={index}
  >

    <div
      style={{height:`${(item/maxHours)*100}%`}}
      className="w-10 bg-linear-to-t from-emerald-600 to-cyan-600 rounded-t-lg"
    ></div>

    <div className='text-amber-300 text-xl font-bold'>
       {day.toLocaleString("default", { weekday: "short"})}
    </div>

  </div>)
  }
)
}

</div>
<div className='space-y-6'>
  <h1 className='bg-linear-to-b from-green-600 to-blue-500 bg-clip-text text-transparent text-2xl'>
  Total: {data.total}
  </h1>

  <h1 className="bg-linear-to-br from-red-500 to-amber-500 bg-clip-text text-transparent text-2xl">
    Best Day: {data.bestDay} ⭐ 
  </h1>

  <h1 className="bg-linear-to-br from-blue-500 to-red-500 bg-clip-text text-transparent text-2xl">
    Daily Goal: {data.completedGoals} / 7 days 
  </h1>
</div>



</div>
  )
}

export default Westan