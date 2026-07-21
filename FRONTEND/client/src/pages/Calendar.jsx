import React, { useEffect, useRef, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
function Calendar() {
  const today=new Date();
  const year = useRef(today.getFullYear());
  const [mon,setmon]=useState(today.getMonth());
  const lastday=new Date(year.current,mon+1,0).getDate();
  const firstday=new Date(year.current,mon,1).getDay();
const calendar=[];
const stpoint=[];
const months=[];


for (let index = 0; index <7; index++) {
 months.push(
  <div className='text-xl border rounded-lg text-center p-1 m-2 w-10 font-bold border-purple-200/20 text-purple-600 font-mono bg-white/5 shadow-2xl backdrop-blur-2xl' key={index}> { new Date(2026,6,19+index).toLocaleString("default",{weekday:"short"})}</div>

 )
  
}

for (let i = 1; i <= lastday; i++) {
  if(i===today.getDate() && today.getFullYear()===year.current && today.getMonth()===mon){
    calendar.push(<div className='text-xl border-2 rounded-full h-10 w-10 text-center p-1 m-2 border-blue-700 text-lime-400 font-mono bg-white/5 shadow-2xl backdrop-blur-2xl' key={i}>{i}</div>)
  }
 else{ calendar.push(
    <div className='text-xl border rounded-full h-10 w-10 text-center p-1 m-2 border-blue-200 text-cyan-400 font-mono bg-white/5 shadow-2xl backdrop-blur-2xl' key={i}>{i}</div>
  )
  
}
}


for(let i=0;i<firstday;i++){
  stpoint.push(
     <div className='text-xl  rounded-full h-10 w-10  p-1 m-2  bg-white/5 shadow-2xl backdrop-blur-2xl' key={i}> </div>
  );
}



  return (
    <div className="

p-6
space-y-6
relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950
" >
<div className='absolute inset-0 pointer-events-none blur-3xl opacity-15 ' style={{ background: `radial-gradient(circle, white 0%, blue 25%, green 60%)` }}></div>

{/* Header */}
<div className='bg-slate-800 rounded-xl p-5'>
<p className='text-gray-400'>Date</p>
<h1 className='text-lime-500 text-3xl font-bold'>{today.toISOString().split("T")[0]}</h1>
</div>


{/* THE REAL MENACE*/}

<div className='bg-slate-800 rounded-xl p-5'>


  
   {/* THE CURRENT MONTH AND YEAR AND BUTTONS */}
   
    <div className='flex justify-center items-center gap-2 '>

     <button className='
     p-3 
hover:scale-110
transition ' onClick={()=>{
      if(mon===0){year.current--; }
      setmon(prev => ((prev - 1) % 12 + 12) % 12);
    }}> <FaChevronCircleLeft className="text-white text-2xl" /></button>

    <h1 className='text-green-500 font-bold text-3xl w-64 text-center'>{new Date(year.current,mon).toLocaleString("default",{month:"long", year:"numeric"})}</h1>

    <button className='p-3 
hover:scale-110
transition ' onClick={()=>{
      if(mon===11){year.current++;}
      
      setmon(prev=>(prev+1)%12);
    }}> <FaChevronCircleRight className="text-white text-2xl" /></button>

    
  </div>
  


{/* CALENDAR */}

<div className="grid grid-cols-7 m-10 ">
 {months}
  {stpoint}
{calendar}

</div>


</div>

</div>
  )
}

export default Calendar