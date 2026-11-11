import React, { useState,useRef,useEffect } from 'react';
import api from '../../api/axios';


function Timer({settoal,sub,setSessions,currentSubject,setCurrentSubject,sessions,setdata}) {

const intervalRef = useRef(null);

const [elap,setelap]=useState(0);

const [cl,setcl]=useState(true);

const formatTime = (ms) => {

        const totalSeconds = Math.floor(Math.max(0, ms) / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map(v => String(v).padStart(2, '0'))
            .join(':');
    };


const timr = (startTime) => {

    if (!Number.isFinite(startTime)) {
        console.error("Invalid start time:", startTime);
        return;
    }

    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {

        
        setelap(prev=>prev+1000);
        settoal(prev => prev + 1);


    }, 1000);
};




useEffect(() => {
    if (sub.length > 0 && currentSubject === null) {
        setCurrentSubject(sub[0]._id);
    }
}, [sub,currentSubject, setCurrentSubject]); 




// CREATING A  NEW SESSION
const newSession= async ()=>{

try {
    const res=await api.post('/study/session/start',{subId:currentSubject});
    console.log(res.data);
     const startTime = new Date(res.data.session.start).getTime();


            if (!Number.isFinite(startTime)) {
                console.error("Invalid session start:", res.data.session.start);
                return;
            }

            setSessions(prev => [...prev, res.data.session]);

            timr(startTime);

            setcl(false)


} catch (err) {
    console.log(err.response.data);
}
 
}




//PAUSE A SESSION
const pauseSession = async ()=>{
    try {
    const res=await api.patch('/study/session/end');
    console.log(res.data);
    setcl(true);
 clearInterval(intervalRef.current); 
 setSessions(prev =>(prev.map((s)=>(s.active===true?res.data.session:s)))); 


 //SO THAT WHEN A SESSIONS ENDS THE WEEKLY ANALYSIS GETS UPDATED 
 const analytics = await api.get("/study/analytics");

setdata(analytics.data);


} catch (err) {
    console.log(err.response.data);
}


}




//RESET A SESSION
const resetSession = async ()=>{
     try {
    const res=await api.patch('/study/session/end');
    console.log(res.data);

    
 setSessions(prev =>(prev.map((s)=>(s.active===true?res.data.session:s)))); 
  



  //SO THAT WHEN A SESSIONS ENDS THE WEEKLY ANALYSIS GETS UPDATED 
 const analytics = await api.get("/study/analytics");

setdata(analytics.data);


} catch (err) {
    console.log(err.response.data);
}

setelap(0);
   setcl(true);
   
     clearInterval(intervalRef.current); 


}







//IF PAGE GETS REFRESHED 
useEffect(() => {

        

        const getSessions = async () => {

            try {

                const res = await api.get('/study/activesession');

                console.log(res.data);

                if ( !res.data) return;

                const startTime = new Date(res.data.start).getTime();

                if (!Number.isFinite(startTime)) {
                    console.error("Invalid active session start:", res.data.start);
                    return;
                }

                setCurrentSubject(res.data.subject ?? null);

                timr(startTime);

                setcl(false);

            } catch (err) {

                console.log(err.response?.data || err.message);

            }

        };

        getSessions();


    }, []);








   return (
    <div className='bg-slate-900/70 border border-white/10 w-3/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>🍅 POMODORO TIMER  </h1>
</div>


<div className='flex justify-center '>

<h1 className=' text-white  text-6xl font-bold tracking-wider'>
   
   {formatTime(elap)} 
    </h1>
</div>

<div className='flex justify-center gap-19 items-center '>

    {currentSubject!==null?(
        cl?<button className='bg-slate-800/60 border border-white/25 rounded-full  text-2xl p-5 hover:bg-green-500/50 hover:text-green-300 transition-all duration-500 ' onClick={newSession} >  ▶  </button>
   :
   <button className='bg-slate-800/60 rounded-full  text-2xl p-5 hover:bg-black transition-all duration-500 border border-white/25' onClick={pauseSession}> ⏸  </button>):"ENTER THE SUBJECT"}

   <button className='bg-slate-800/60 rounded-full  text-2xl p-5 hover:bg-red-500/50 hover:text-red-300 transition-all duration-500 border border-white/25' onClick={resetSession}> 🔄  </button>

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
    value={currentSubject ?? ""} disabled={!cl}
    onChange={(e) => setCurrentSubject(e.target.value)}
>
    {sub.map((s) => (
        <option key={s._id} value={s._id}>
            {s.name}
        </option>
    ))}
</select>
</div>

    </div>
  )
}

export default Timer