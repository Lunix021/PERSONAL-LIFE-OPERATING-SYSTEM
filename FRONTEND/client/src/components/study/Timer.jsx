import React, { useState,useRef,useEffect } from 'react';
import api from '../../api/axios';


function Timer({settoal,sub,setSessions,currentSubject,setCurrentSubject,sessions,setdata}) {

const intervalRef = useRef(null);

const [elap,setelap]=useState(0);

const [cl,setcl]=useState(true);

const timr=(startTime)=>{ 
    clearInterval(intervalRef.current);
    
   intervalRef.current= setInterval(()=>{
    setelap(Date.now() - startTime); 
        settoal(prev=>prev+1);
        },1000);
};




useEffect(() => {
    if (sub.length > 0 && currentSubject === null) {
        setCurrentSubject(sub[0]._id);
    }
}, [sub]); 




// CREATING A  NEW SESSION
const newSession= async ()=>{

try {
    const res=await api.post('/study/session/start',{subId:currentSubject});
    console.log(res.data);
    setSessions(prev=>[...prev,res.data.session]);
    timr(new Date(res.data.start).getTime()); 

setcl(false);


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
useEffect(()=>{

 const getsessions=async ()=>{
    try {
        const res=await api.get('/study/activesession');
console.log(res.data);


if(res.data){
    setCurrentSubject(res.data.subject ?? null);

    setelap(
        Date.now() - new Date(res.data.start).getTime()
    );

    timr(new Date(res.data.start).getTime());
    setcl(false);
}
    } 
    catch (err) {
        console.log(err.response.data);
    }

    }

    getsessions();

},[]);









   return (
    <div className='bg-slate-900/70 border border-white/10 w-3/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>🍅 POMODORO TIMER  </h1>
</div>


<div className='flex justify-center '>

<h1 className=' text-white  text-6xl font-bold tracking-wider'>
   
   {new Date(elap).toISOString().slice(11,19)} 
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