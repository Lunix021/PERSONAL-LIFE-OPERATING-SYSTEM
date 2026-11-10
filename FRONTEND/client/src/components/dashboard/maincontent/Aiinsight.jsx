import React from 'react'
import api from '../../../api/axios'
import { useState } from 'react';
import { useEffect } from 'react';






function Aiinsight() {


  const [report,setReport]=useState('');



  const generateReport = async () => {
    try {
        const res = await api.post('/user/ai/generate');

        setReport(res.data.report);

    } catch (err) {
        console.log(err);
    }
};


useEffect(()=>{generateReport()},[]);

  return (
    <div className='bg-slate-900/70
rounded-2xl
border
border-purple-500/20
backdrop-blur-md
shadow-xl
p-5'>
<h1 className='text-purple-400
font-bold'>AI INSIGHT:</h1>

<p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                        {report}
                    </p>

</div>
  )
}

export default Aiinsight