import React, { act, useRef, useState } from 'react'

function Finance() {

 const [mod,setMod]=useState(false)

 
 const [newob,setnewob]=useState({});
const [activities,setactivities] =useState ([
   
   
  ]);


const totalAmount = activities.reduce((total, ac) => {
  return total + ac.amount;
}, 0);

const todayamount=activities.reduce((total,ac)=>{
  const today = new Date();
  const todayDate = today.getDate();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();
  if (
   ac.timegen.getDate() === todayDate &&
   ac.timegen.getMonth() === todayMonth &&
   ac.timegen.getFullYear() === todayYear
){
  return total+ac.amount;
}
  return total;
},0);
const monthamount=activities.reduce((total,ac)=>{
  const today = new Date();
 
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();
  if (
   
   ac.timegen.getMonth() === todayMonth &&
   ac.timegen.getFullYear() === todayYear
){
  return total+ac.amount;
}
  return total;
},0);

  return (
    <>
     <div className='relative bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen p-6 space-y-6 overflow-hidden'>

    

      <div className='absolute inset-0  blur-3xl opacity-15 ' style={{ background: `radial-gradient(circle, white 0%, blue 25%, green 60%)` }}></div>
 <div className=' flex font-bold text-3xl text-white justify-center' >

        <h1>FINANCE 💸💸</h1>

      </div>

    <div className='space-y-6 m-5'>

      {/* EXPENSE CARD */}
       <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-full'>
       <div className='flex justify-center m-4'>
       <h1 className='font-bold text-white text-2xl'> 📊 Expense Breakdown </h1>
       </div>

<div className='flex justify-center'>
        <div className='rounded-full w-86 h-86 ' style={{ background: `conic-gradient(green 25%,red 25%,red 50%,yellow 50% ,yellow 75%,blue 75%)` }}>

          {/* PIE CHART gIGGANigga*/}

      
        </div>

           <div className='absolute right-0 bottom-0 p-5 flex gap-3 backdrop-blur-lg shadow-2xl border-2 border-white/10' >
            <div className='grid grid-rows-4'>
         <h1 className='w-10 h-5 bg-green-700'></h1>
         <h1 className='w-10 h-5 bg-yellow-400'></h1>
         <h1 className='w-10 h-5 bg-blue-600'></h1>
         <h1 className='w-10 h-5 bg-red-600'></h1>
         </div>
         <div className='text-fuchsia-50 '>
          <h1>-- Food</h1>
          <h1>-- Travel</h1>
          <h1>-- Shopping</h1>
          <h1>-- Others</h1>
         </div>

         </div>

         <div className='absolute left-0 top-50 px-5 font-bold text-white text-xl bg-olive-700/20 border-2 border-white/20 rounded-lg backdrop-blur-lg shadow-2xl mx-4'><h1>Total expense : {totalAmount}
         </h1>
         <h1>Today expenditure : {todayamount} </h1>
         <h1>Monthly Expenditure : {monthamount}</h1>
         </div>

       
      </div>
       
       </div>



       
      {/* RECENT CARD */}
       <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-full'>
       <div className='flex justify-center m-4'>
       <h1 className='font-bold text-white text-xl'> RECENT TRANSACTIONS </h1>
       </div>


      <div className="space-y-3">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="flex justify-between items-center bg-slate-800 rounded-xl p-4 "
          >

            <div className="flex items-center gap-2">

              <p className="text-white">
                {activity.title} :
              </p>

              <p className="text-white">
               {activity.amount}
              </p>

            </div>

            <span className="text-sm text-gray-400">
              {activity.timegen.toLocaleString()}
            </span>

          </div>

        ))}

        <button className='text-white bg-blue-600 p-2 hover:bg-slate-700 transition border-2 border-amber-500' onClick={()=>{
          setMod(true);
        }}> ADD TRANSACTION</button>

      </div>
       
       </div>

</div>
    </div>
     {/* ADD TRANS CARD */}
      { mod && (
        <div className='fixed inset-0 flex justify-center items-center backdrop-blur-lg'>
        <div className='bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-1/2 h-1/2 space-y-6 z-50'>
        
       <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter reason:</h1>
       <input type="text" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 text-xl' onChange={(e)=>{setnewob({...newob,title:e.target.value})}} required autoFocus/>
       </div>

       <div className='flex'>
        <h1 className='text-white font-bold text-2xl p-2'>Enter amount:</h1>
       <input type="Number" min="0" className=' bg-slate-500 border-2 border-white/40 text-white rounded-2xl px-2 w-30 text-xl' onChange={(e)=>{setnewob({...newob,amount:Number(e.target.value)})}} required />
       </div>

       <div className='flex gap-3'>
        <h1 className='text-white font-bold text-2xl p-2'>NATURE : </h1>

        <button className='text-white font-bold text-3xl  border-2 rounded-full h-10 w-10 text-center m-2 bg-green-600 hover:border-blue-800 focus:border-blue-800 ' 
        onClick={()=>{setnewob({...newob,amount:Math.abs(newob.amount)})}}>+</button>

        <button className='text-white font-bold text-3xl border-2 rounded-full h-10 w-10 text-center bg-red-500 m-2 hover:border-yellow-400 focus:border-yellow-400' onClick={()=>{setnewob({...newob,amount:-(newob.amount)})}}>-</button>
       
       </div>

       <div className='flex justify-between text-white'>
        <button className='bg-green-400/60 p-2 hover:bg-green-800' onClick={()=>{
         setactivities([...activities, {
    ...newob,
    id: Date.now(),
    timegen:new Date()
  }]) ;setMod(false);}}> SUBMIT </button>
       <button className='bg-red-400/60 p-2 hover:bg-red-800' onClick={()=>{setMod(false)}}> CANCEL</button>
       </div>

       </div>
       </div>
       
      
      )
       
       }
       </>
  )
}

export default Finance