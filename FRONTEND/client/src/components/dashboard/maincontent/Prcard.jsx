import React from 'react'
const cardStyle=`bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition text-white my-3`;
function Prcard() {
  return (
    <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-2/5'>
        <h1 className='font-bold text-white text-2xl mb-4'> Today's Progress:</h1>
    
     <ul>
        <li className={cardStyle}>Tasks : 3/5</li>
        <li className={cardStyle}>Study :2h 10m</li>
        <li className={cardStyle}>Workout : Done</li>
        <li className={cardStyle}>Water : 2.5L</li>
        <li className={cardStyle}>Overall : 72%</li>
     </ul>    
    </div>
  )
}

export default Prcard