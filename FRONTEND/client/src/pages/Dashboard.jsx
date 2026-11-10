import React from 'react'
import Recentactivity from '../components/dashboard/maincontent/Recentactivity'
import Aiinsight from '../components/dashboard/maincontent/Aiinsight'
import Tasks from '../components/dashboard/maincontent/Tasks'
import Prcard from '../components/dashboard/maincontent/Prcard'

function Dashboard() {

  return (
    <div className="p-6 space-y-6 relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">

<div className="absolute top-10 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

<div className="absolute bottom-50 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

<div className="absolute left-25 bottom-20 w-80 h-80 bg-cyan-500/35 rounded-full blur-3xl"></div>

    <div className='flex gap-2'>
    <Tasks/>
    <Prcard/>
    </div>
    <Recentactivity/>
    <Aiinsight/>
    
    </div>
  )
}

export default Dashboard