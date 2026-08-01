import React, { useState,useEffect } from 'react'
import api from '../api/axios'

// PR tracking
// ❌ Exercise history graphs
// ❌ Rest timer
// ❌ Workout notes
// ❌ Edit/delete workouts
// ❌ Muscle-specific analytics
// ❌ Streak calculation
// ❌ Step syncing from phone
// ❌ Calories tracking from device
//delete button near add button and also jsut how u check for same muscle name check for same exrcise name in addmusc()
// Exercise history - will add these features later and tehre are features to eb added in studies and finance too dont forget mf



function Fitness() {

  const [activities,setactivity]=useState([]);

   const [mod,setMod]=useState(false);

   const[newob,setnewob]=useState({});

   
 //get all muscles when refresh
 useEffect(()=>{
  const getmuscles=async()=>{
try {
  const res=await api.get('/fitness/muscles');
  console.log(res.data);
  setactivity(res.data.list);
} catch (err) {
  console.log(err.response.data);
}
  }
  getmuscles();
 },[]);






  //add a section
  const addMuscle=async()=>{
    try {
   
    const res= await api.post('/fitness/add',newob);
    console.log(res.data);
    setactivity(res.data.list);
       setMod(false);
       setnewob("");
    } catch (err) {
      console.log(err.response.data);
    }
  }


   const totalExercises = activities.reduce((total,muscle)=>{
  return total + muscle.exercises.length;
},0);


const totalSets = activities.reduce((total,muscle)=>{
  return total + muscle.exercises.reduce((sum,ex)=>{
    return sum + ex.sets;
  },0);
},0);


const totalVolume = activities.reduce((total,muscle)=>{
  return total + muscle.exercises.reduce((sum,ex)=>{
    return sum + (ex.sets * ex.reps * ex.weight);
  },0);
},0);
 return (
    <>
     <div className='relative bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen p-6 space-y-6 overflow-hidden'>

    

      <div className='absolute inset-0  blur-3xl opacity-15 ' style={{ background: `radial-gradient(circle, white 0%, blue 25%, green 60%)` }}></div>
      <div className=' flex font-bold text-3xl text-white justify-center' >

        <h1>FITNESS 💪💪</h1>

      </div>

    <div className='space-y-6 m-5'>

      {/* STATS CARD */}
       <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-full'>
       
       <h1 className='font-bold text-white text-2xl'> Today's Stats </h1>
     

  <div className='grid grid-cols-4 gap-4 mt-8'>

<div className='bg-slate-800 rounded-xl p-5'>
<p className='text-gray-400'>Weight</p>
<h1 className='text-green-400 text-3xl font-bold'>72kg</h1>
</div>


<div className='bg-slate-800 rounded-xl p-5'>
<p className='text-gray-400'>Steps</p>
<h1 className='text-blue-400 text-3xl font-bold'>8500</h1>
</div>


<div className='bg-slate-800 rounded-xl p-5'>
<p className='text-gray-400'>Calories</p>
<h1 className='text-yellow-400 text-3xl font-bold'>2200</h1>
</div>


<div className='bg-slate-800 rounded-xl p-5'>
<p className='text-gray-400'>Workout</p>
<h1 className='text-purple-400 text-2xl font-bold'>Done</h1>
</div>


</div>
       

       
       </div>



       
      {/* WORKOUT LOG CARD */}
       <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-full'>
       
       <h1 className='font-bold text-white text-2xl'> Workout Log</h1>
  

        <div className="space-y-4 p-6">

{activities.map((activity)=>(

<div key={activity.muscle} 
className="bg-slate-800 rounded-2xl border border-white/10 overflow-hidden">


<div
className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-700 transition"
onClick={()=>{
setactivity(prev =>
prev.map(item =>
item.muscle === activity.muscle
? {...item,selected:!item.selected}
:item
)
)
}}
>


<div>

<h1 className="text-white text-2xl font-bold">
 {activity.muscle}
</h1>


<p className="text-gray-400">
{activity.exercises.length} Exercises
</p>

</div>


<h1 className="text-green-400 text-3xl">
{activity.selected ? "⌃":"⌄"}
</h1>


</div>




{/* Exercises */}

{
activity.selected &&

<div className="p-4 space-y-3 bg-slate-900/50">


{
activity.exercises.map(ex=>(

<div
key={ex.name}
className="
bg-slate-800
rounded-xl
p-4
border
border-white/10
flex
justify-between
items-center
"
>


<div>

<h2 className="text-white text-xl font-bold">
{ex.name}
</h2>

<p className="text-gray-400">
{ex.set} sets × {ex.reps} reps
</p>


</div>


<div className="text-right">

<p className="text-green-400 font-bold text-xl">
{ex.weight} kg
</p>

<p className="text-gray-400 text-sm">
Max
</p>

</div>


</div>


))
}


</div>

}


</div>


))}

</div>

      <div className="flex justify-center mt-5">

<button
onClick={()=>{setMod(true)}}
className="
flex items-center gap-2
bg-green-500/20
border border-green-400/40
text-green-300
font-bold
text-lg
px-8
py-3
rounded-xl
shadow-xl
hover:bg-green-500/40
hover:text-white
hover:scale-105
transition-all
duration-300
"
>
➕ Add Workout
</button>

</div>
       
       </div>

{/* PROGRESS CARD */}
<div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-full'>

<div className='flex justify-center m-4'>
<h1 className='font-bold text-white text-2xl'>
📈 Progress
</h1>
</div>


<div className='grid grid-cols-2 gap-4'>


<div className='bg-slate-800 rounded-xl p-5 border border-white/10'>
<h1 className='text-gray-400'>
Exercises
</h1>

<h1 className='text-green-400 text-3xl font-bold'>
{totalExercises}
</h1>

</div>



<div className='bg-slate-800 rounded-xl p-5 border border-white/10'>
<h1 className='text-gray-400'>
Total Sets
</h1>

<h1 className='text-blue-400 text-3xl font-bold'>
{totalSets}
</h1>

</div>



<div className='bg-slate-800 rounded-xl p-5 border border-white/10'>
<h1 className='text-gray-400'>
Workout Volume
</h1>

<h1 className='text-yellow-400 text-3xl font-bold'>
{totalVolume} kg
</h1>

</div>



<div className='bg-slate-800 rounded-xl p-5 border border-white/10'>
<h1 className='text-gray-400'>
Status
</h1>

<h1 className='text-green-400 text-2xl font-bold'>
🔥 Active
</h1>

</div>


</div>

</div>

</div>
    </div>


    {/* THE SUPREME CARD */}

    { mod && (
        <div className='fixed inset-0 flex justify-center items-center backdrop-blur-lg'>
        <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-1/2 h-1/2 space-y-6 z-50'>
        
       <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter Muscle Name:</h1>
       <input type="text" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 text-xl' onChange={(e)=>{setnewob({...newob,muscle:e.target.value.toUpperCase()})}} required autoFocus/>
       </div>


      <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter Exercise Name:</h1>
       <input type="text" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 text-xl' onChange={(e)=>{setnewob({...newob,exercise:e.target.value.toUpperCase()})}} required />
       </div>

       <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter sets:</h1>
       <input type="Number" min="0" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 w-30 text-xl' onChange={(e)=>{setnewob({...newob,sets:Number(e.target.value)})}} required />
       </div>

    <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter reps:</h1>
       <input type="Number" min="0" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 w-30 text-xl' onChange={(e)=>{setnewob({...newob,reps:Number(e.target.value)})}} required />
       </div>

        <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter maximum weight:</h1>
       <input type="Number" min="0" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 w-30 text-xl' onChange={(e)=>{setnewob({...newob,weight:Number(e.target.value)})}} required />
       </div>


       <div className='flex justify-between text-white'>
        <button className='bg-green-400/60 p-2 hover:bg-green-800' onClick={()=>{
          addMuscle();
         }}> SUBMIT </button>
       <button className='bg-red-400/60 p-2 hover:bg-red-800' onClick={()=>{setMod(false)}}> CANCEL</button>
       </div>

       </div>
       </div>
       
      
      )
       
       }
     
       </>
  )
}

export default Fitness