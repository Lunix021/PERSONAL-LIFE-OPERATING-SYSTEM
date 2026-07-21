import React from 'react'

function Westan() {
  const data = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 0.5 },
];
const maxHours = Math.max(...data.map(item => item.hours));
  return (
    <div className='bg-slate-900/70 border border-white/10 w-full backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>📊 Weekly Analytics   </h1>
</div>

<div className='grid grid-cols-7 mx-5'>
{
data.map((item)=>(
  <div 
    className='h-60 flex flex-col justify-end items-center' 
    key={item.day}
  >

    <div
      style={{height:`${(item.hours/maxHours)*100}%`}}
      className="w-10 bg-linear-to-t from-emerald-600 to-cyan-600 rounded-t-lg"
    ></div>

    <div className='text-amber-300 text-xl font-bold'>
      {item.day}
    </div>

  </div>
))
}

</div>
<div className='space-y-6'>
  <h1 className='bg-linear-to-b from-green-600 to-blue-500 bg-clip-text text-transparent text-2xl'>
  Total: 17h 30m
  </h1>

  <h1 className="bg-linear-to-br from-red-500 to-amber-500 bg-clip-text text-transparent text-2xl">
    Best Day: Saturday ⭐ 
  </h1>

  <h1 className="bg-linear-to-br from-blue-500 to-red-500 bg-clip-text text-transparent text-2xl">
    Daily Goal: 5 / 7 days 
  </h1>
</div>



</div>
  )
}

export default Westan