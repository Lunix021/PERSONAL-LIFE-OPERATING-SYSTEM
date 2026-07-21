import React from 'react'
import {NavLink, Link } from 'react-router-dom'
const cardStyle=`rounded-lg
px-4
py-3
hover:bg-slate-800
transition
cursor-pointer`

const acstatus=({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "" ;

  

function Sidebar() {
  return (
    
     <aside className="
w-64
bg-slate-950/80
border-r
border-white/10
backdrop-blur-md
">
  <nav>

    <ul className="space-y-2 p-2 text-amber-300">

      <NavLink to='/dashboard' className={acstatus}> <li className={cardStyle}>DASHBOARD</li> </NavLink>


      <NavLink to='/study' className={acstatus}> <li className={cardStyle}>STUDY</li> </NavLink>


      <NavLink to='/fitness' className={acstatus}> <li className={cardStyle}>FITNESS</li> </NavLink>


      <NavLink to='/finance' className={acstatus}> <li className={cardStyle}>FINANCE</li> </NavLink>


     <NavLink to='/calendar' className={acstatus}> <li className={cardStyle}>CALENDAR</li> </NavLink>


      <NavLink to='/settings' className={acstatus}> <li className={cardStyle}>SETTINGS</li> </NavLink>


    </ul>
  </nav>
</aside>

  )
}

export default Sidebar