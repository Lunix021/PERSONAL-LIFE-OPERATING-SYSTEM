import React from 'react'
import Dap from '../components/study/Dap';
import Focr from '../components/study/Focr';
import Timer from '../components/study/Timer';
import Tos from '../components/study/Tos';
import Tss from '../components/study/Tss';
import Westan from '../components/study/Westan';

import { useState } from 'react';
import { useEffect } from 'react';



function Study() {



  const [toal, settoal] = useState(0);

  const [sub, setsub] = useState([]
  );

   const [goal, setgoal] = useState(0);

  const [currentSubject, setCurrentSubject] = useState(sub[0]?.id || null);

  const [sessions, setSessions] = useState([]);


const calculateFocusScore = (toal, goal, sessions) => {

    if(goal ===0 || toal === 0) return 0;

    const timeScore = Math.min((toal / (goal*3600)) * 70, 70);

    const sessionScore = Math.min(sessions.length * 10, 30);

    return Math.round(timeScore + sessionScore);
};

const [studyHistory,setStudyHistory] = useState([

]);//was gonna store day,totaltime,sessions otehr thigns for streaks,weekly analytics , some oterh things but we will do this later



  return (
    <div className='relative bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen p-6 space-y-6 overflow-hidden'>

      <div className=' flex font-bold text-3xl text-white justify-center' >

        <h1>Study 📚</h1>

      </div>

      <div className='absolute inset-0  blur-3xl opacity-15 ' style={{ background: `radial-gradient(circle, white 0%, blue 45%, green 60%)` }}></div>

      <div className='flex gap-2'>

        <Dap toal={toal} goal={goal} setgoal={setgoal} />

        <Timer settoal={settoal} sub={sub} setSessions={setSessions} currentSubject={currentSubject} setCurrentSubject={setCurrentSubject} sessions={sessions}/>

      </div>

      <div className='flex gap-2'>

        <Focr fscr={calculateFocusScore(toal,goal,sessions)}/>

        <Tos setsub={setsub} sub={sub} />

      </div>

      <Tss sub={sub} sessions={sessions} />

      <Westan />



    </div>
  )
}

export default Study