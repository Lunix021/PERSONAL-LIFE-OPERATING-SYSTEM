import React, { useState,useRef,useEffect } from 'react';



function Timer({settoal,sub,setSessions,currentSubject,setCurrentSubject,sessions}) {


const [elap,setelap]=useState(0);

const [cl,setcl]=useState(true);

const id = useRef(null);

const sessionId = useRef(null);

const timr=()=>{
     
    id.current= setInterval(()=>{setelap(elap=>elap+1); 
        settoal(prev=>prev+1);
        },1000);
};

useEffect(() => {
    if (sub.length > 0 && currentSubject === null) {
        setCurrentSubject(sub[0].id);
    }
}, [sub]); 



const hour=Math.floor(elap/3600);
const min=Math.floor((elap % 3600) / 60);
const sec=elap%60;



   return (
    <div className='bg-slate-900/70 border border-white/10 w-3/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>🍅 POMODORO TIMER  </h1>
</div>


<div className='flex justify-center '>

<h1 className=' text-white  text-6xl font-bold tracking-wider'>
    
    {hour<10?0:""}{hour}:{min<10?0:""}{min}:{sec<10?0:""}{sec}
    
    </h1>
</div>

<div className='flex justify-center gap-19 items-center '>

    {currentSubject!==null?(
        cl?<button className='bg-slate-800/60 border border-white/25 rounded-full  text-2xl p-5 hover:bg-green-500/50 hover:text-green-300 transition-all duration-500 ' onClick={()=>{
            timr(); setcl(false);
            const newId = Date.now();  sessionId.current = newId;

    setSessions(prev=>[
        ...prev,
        {
            id:newId,
            subId:currentSubject,
            start:Date.now(),
            end:null
        }
    ]);
        }} >  ▶  </button>
   :
   <button className='bg-slate-800/60 rounded-full  text-2xl p-5 hover:bg-black transition-all duration-500 border border-white/25' onClick={()=>{setcl(true); clearInterval(id.current); setSessions(prev =>
    prev.map(session =>
        session.id === sessionId.current
        ?
        {...session,end:Date.now()}
        :
        session
    )
); }}> ⏸  </button>):"ENTER THE SUBJECT"}

   <button className='bg-slate-800/60 rounded-full  text-2xl p-5 hover:bg-red-500/50 hover:text-red-300 transition-all duration-500 border border-white/25' onClick={()=>{
    setelap(0); clearInterval(id.current); setcl(true);
   setSessions(prev =>
    prev.map(session =>
        session.id === sessionId.current
        ?
        {...session,end:Date.now()}
        :
        session
    )
); 
   }}> 🔄  </button>

</div>

<div className="
bg-slate-800/70
border
border-white/10
rounded-xl
p-4
text-center
">

<p className="text-gray-400 text-sm p-1">
Current Subject
</p>
<select className='text-green-400 p-2 text-xl font-bold bg-black'
    value={currentSubject} disabled={!cl}
    onChange={(e) => setCurrentSubject(Number(e.target.value))}
>
    {sub.map((s) => (
        <option key={s.id} value={s.id}>
            {s.text}
        </option>
    ))}
</select>
</div>

    </div>
  )
}

export default Timer