import React, { useState } from 'react'
import Timer from './Timer';
function Dap({ toal,goal,setgoal }) {

 

  const [tapped, settap] = useState(false);

  const hour=Math.floor(toal/3600)
const min=Math.floor((toal % 3600) / 60)

const num=(toal/(goal*3600))*100;


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
             {goal==0?0:Math.round(num * 100) / 100}%
            </h1>
          </div>
        </div>
      </div>


      <div className='text-center space-y-3 mb-5'>

        <div className='flex justify-center bg-slate-800 rounded-lg text-blue-400  p-5 hover:bg-slate-950 transition-all duration-500 w-full border
border-white/10' onClick={() => { settap(true); }}>

          Goal : {tapped ?
            <div>
              <input type='text' className='mx-2 border rounded' size={1} autoFocus value={goal} onChange={(e) => { setgoal(e.target.value); }} onClick={(e) => e.stopPropagation()} />
              <button className='mx-2 hover:bg-green-700' onClick={(e) => { settap(false); e.stopPropagation(); }}>✅</button>
            </div>
            : goal} hours




        </div>

        <h1 className='bg-slate-800 rounded-lg text-green-400 text p-5'> Completed : {hour}h {min}m</h1>

        <h1 className='bg-slate-800 rounded-lg text-red-500 text p-5'> Remaining :{goal==0? '0h 0m': `${goal-hour-1}h${60-min}m`} </h1>

      </div>

    </div>
  )
}

export default Dap