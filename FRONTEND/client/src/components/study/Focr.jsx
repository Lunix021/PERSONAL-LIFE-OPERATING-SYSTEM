import React from 'react'
import { useState } from 'react';
function Focr({fscr,data}) {


function getText() {
  if (fscr > 38 && fscr<=70) {
    return "Good Score : HUH, JUST AVERAGE";
  }
  else if(fscr > 70 && fscr<=100){return "EXCELLENT SCORE NIGGA"}
  return "Low Score : GO AND FKING GRIND ";
}

  
  return (
    <div className='bg-slate-900/70 border border-white/10 w-2/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-6 '>

      <div className='text-white text-center font-bold text-xl '>
        <h1>🧠 FOCUS SCORE </h1>

        <h1 className='mt-5 text-6xl tracking-tight'>{fscr}/100</h1>
      </div>


<div className='space-y-6'>
  <h1 className='bg-linear-to-r from-green-600 to-blue-500 bg-clip-text text-transparent text-2xl'>
    {getText()}
 
  </h1>

  <h1 className="bg-linear-to-br from-red-500 to-amber-500 bg-clip-text text-transparent text-2xl">
    🔥 {data.streak} Day Streak  
  </h1>
</div>

      </div>

   
  )
}

export default Focr