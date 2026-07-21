import React from 'react'

function Tss({sub,sessions}) {

  const formatTime=(time)=>{
       if(!time) return "--";
    return new Date(time).toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    })
}

const formatDuration=(start,end)=>{
if(!end) return "Running";
const totalMinutes=Math.floor((end-start)/60000);

const hours=Math.floor(totalMinutes/60);
const minutes=totalMinutes%60;

return `${hours}h ${minutes}m`;

}
  return (
        <div className='bg-slate-900/70 border border-white/10 w-full backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>📈 TODAY'S STUDY SESSIONS   </h1>
</div>


<div className='bg-slate-800 border border-white/10 p-6'>
<div className='flex text-white text-2xl p-2 justify-between'>
<h1> SUBJECT </h1>
<h1>START</h1>
<h1>END</h1>
<h1>DURATION</h1>
</div>
<div>
  { sessions.map((sessions)=>( <div key={sessions.id} className='flex justify-between border border-slate-700'>
    <h1 className='text-white text-xl  p-2' >{
      sub.find((s) => s.id === sessions.subId)?.text
      }</h1>
    <h1 className='text-white text-xl  p-2'>{formatTime(sessions.start)}</h1>
    <h1 className='text-white text-xl p-2' >{formatTime(sessions.end)}</h1>
    <h1 className='text-white text-xl  p-2' >{formatDuration(sessions.start,sessions.end)}</h1>
    </div>
  ))}
</div>

</div>


</div>
  )
}

export default Tss