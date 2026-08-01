import React, { useEffect, useState } from 'react'
import api from '../api/axios';


function Settings() {



const [userdetail,setuserdetail]=useState({

});

const [appearance,setAppearance]=useState({
    theme:"Dark",
    accent:"blue"
});

const [preferences,setPreferences]=useState({});




//FETCHING DETAILS AFTER REFRESH
useEffect(()=>{
 const getdetails=async()=>{
    try {
    const res=await api.get('/user/me');
    console.log(res.data);
    setuserdetail({name:res.data.name,age:res.data.age,weight:res.data.weight,height:res.data.height});
    setAppearance(res.data.appearance);
    setPreferences(res.data.preferences);
  } catch (err) {
    console.log(err.response.data);
  }
  }
  getdetails();
},[])






//UPDATE OR ADD USER DETAIL
const update= async()=>{
  try {
    const res=await api.post('/user/update',{...userdetail,...appearance,...preferences});//SPREAD OPERATOR IS USED SO THAT req.body means the content inside them all
    console.log(res.data);
  } catch (err) {
    console.log(err.response.data);
  }
}






//LOGOUT
const logout=async()=>{
  try {
    await api.post('/user/logout');
    window.location.href = "/login";
  } catch (err) {
    console.log(err.response.data);
  }
}





  return (
    <div className="p-6 space-y-6 relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, white 0%, blue 25%, green 60%)",
        }}
      ></div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-white relative z-10">
        ⚙️ SETTINGS
      </h1>

      {/* ================= PROFILE ================= */}

      <div className="relative z-10 bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-6">

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl">👤</h1>
          <h1 className="text-2xl font-bold text-cyan-400">
            PROFILE
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <p className="text-gray-400 mb-2">Name</p>
            <input 
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
              placeholder="Enter name" value={userdetail.name ??""}
onChange={(e)=>
setuserdetail({...userdetail,name:e.target.value})
}
            />
          </div>

          <div>
            <p className="text-gray-400 mb-2">Age</p>
            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
              placeholder="20"
              value={userdetail.age ??""}
onChange={(e)=>
setuserdetail({...userdetail,age:Number(e.target.value)})
}
            />
          </div>

          <div>
            <p className="text-gray-400 mb-2">Height</p>
            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
              placeholder="172 cm"
              value={userdetail.height ??""}
onChange={(e)=>
setuserdetail({...userdetail,height:Number(e.target.value)})
}
            />
          </div>

          <div>
            <p className="text-gray-400 mb-2">Weight</p>
            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
              placeholder="72 kg"
              value={userdetail.weight?? ""}
onChange={(e)=>
setuserdetail({...userdetail,weight:Number(e.target.value)})
}
            />
          </div>

        </div>

      </div>

      {/* ================= APPEARANCE ================= */}

      <div className="relative z-10 bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-6">

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl">🎨</h1>
          <h1 className="text-2xl font-bold text-green-400">
            APPEARANCE
          </h1>
        </div>

        <div className="space-y-6">

          <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">
            <span className="text-white text-lg">Theme</span>

            <select value={appearance.theme}
onChange={(e)=>
setAppearance({
...appearance,
theme:e.target.value
})
} className="bg-slate-700 text-white rounded-lg px-3 py-2">
              <option>Dark</option>
              <option>Light</option>
            </select>

          </div>

          <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">

            <span className="text-white text-lg">
              Accent Color
            </span>

            <div className="flex gap-3">

              <div className={`w-8 h-8 rounded-full bg-blue-500 cursor-pointer ${
appearance.accent==="blue"
?"ring-4 ring-white"
:""
}`}
onClick={()=>
setAppearance({
...appearance,
accent:"blue"
})
}></div>

              <div className={`w-8 h-8 rounded-full bg-green-500 cursor-pointer ${
appearance.accent==="green"
?"ring-4 ring-white"
:""
}`}
onClick={()=>
setAppearance({
...appearance,
accent:"green"
})
}></div>

              <div className={`w-8 h-8 rounded-full bg-red-500 cursor-pointer ${
appearance.accent==="red"
?"ring-4 ring-white"
:""
}`}
onClick={()=>
setAppearance({
...appearance,
accent:"red"
})
}></div>

              <div className={`w-8 h-8 rounded-full bg-purple-500 cursor-pointer ${
appearance.accent==="purple"
?"ring-4 ring-white"
:""
}`}
onClick={()=>
setAppearance({
...appearance,
accent:"purple"
})
}></div>

             <div className={`w-8 h-8 rounded-full bg-yellow-500 cursor-pointer ${
appearance.accent==="yellow"
?"ring-4 ring-white"
:""
}`}
onClick={()=>
setAppearance({
...appearance,
accent:"yellow"
})
}></div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= PREFERENCES ================= */}

      <div className="relative z-10 bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-6">

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl">🎯</h1>
          <h1 className="text-2xl font-bold text-orange-400">
            PREFERENCES
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="text-gray-400 mb-2">
              Daily Study Goal
            </p>

            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
              placeholder="5 Hours" value={preferences.studyGoal??0}

onChange={(e)=>
setPreferences({
...preferences,
studyGoal:Number(e.target.value)
})
}
            />

          </div>

          <div>

            <p className="text-gray-400 mb-2">
              Daily Steps Goal
            </p>

            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
              placeholder="10000"
              value={preferences.stepsGoal??0}

onChange={(e)=>
setPreferences({
...preferences,
stepsGoal:Number(e.target.value)
})
}
            />

          </div>

          <div>

            <p className="text-gray-400 mb-2">
              Daily Water Goal
            </p>

            <input type='number'
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
              placeholder="3 Litres"
              value={preferences.waterGoal??0}

onChange={(e)=>
setPreferences({
...preferences,
waterGoal:Number(e.target.value)
})
}
            />

          </div>

     

        </div>

      </div>


{/* Save settings button */}
      <div className="flex justify-between">
<button
className="bg-green-500 hover:bg-green-600 transition text-white font-bold px-6 py-3 rounded-xl"
onClick={()=>{update();}}
>

SAVE SETTINGS

</button>

 <button onClick={logout}
    className="
      px-6
      rounded-xl
      py-3
      text-xl
      font-semibold
      text-white
      bg-blue-600/80
      hover:bg-blue-500
      shadow-sm
      shadow-blue-500/30
      transition-all
      duration-300
      hover:scale-[1.02]
    "
  >
    LOGOUT
  </button>
</div>


      {/*  ABOUT */}

      <div className="relative z-10 bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <h1 className="text-3xl">📊</h1>

          <h1 className="text-2xl font-bold text-pink-400">
            ABOUT
          </h1>

        </div>

        <div className="space-y-4 text-lg">

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">
             <span className="text-gray-300">
             Project Name
            </span>

            <span className="text-cyan-400 font-bold">
              PLOS(PERSONAL LIFE OS)
            </span>
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">

            <span className="text-gray-300">
              Version
            </span>

            <span className="text-cyan-400 font-bold">
              v1.0
            </span>
 
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl p-4">

            <span className="text-gray-300">
              Developer
            </span>

            <span className="text-green-400 font-bold">
              Lunix Mishra
            </span>

          </div>

          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-gray-400 mb-2">
              Modules
            </p>

            <div className="flex flex-wrap gap-3">

              <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-400">
                Study
              </span>

              <span className="bg-green-500/20 px-3 py-1 rounded-full text-green-400">
                Fitness
              </span>

              <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400">
                Finance
              </span>

              <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-400">
                Calendar
              </span>

              <span className="bg-pink-500/20 px-3 py-1 rounded-full text-pink-400">
                Tasks
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Settings