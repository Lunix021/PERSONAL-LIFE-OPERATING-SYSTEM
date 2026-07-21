import React from 'react'
const cardStyle = `
bg-slate-900/70
border
border-white/10
rounded-xl
p-5
hover:bg-slate-800
hover:-translate-y-1
hover:shadow-2xl
transition-all
duration-300
cursor-pointer
text-center
`;
function Quicklink() {
  return (
    
        <ul className='grid grid-cols-4 gap-4 text-amber-400'>
           <li className={cardStyle}>Study</li>
<li className={cardStyle}>Fitness</li>
<li className={cardStyle}>Finance</li>
<li className={cardStyle}>Habits</li>
        </ul>
  
  )
}

export default Quicklink