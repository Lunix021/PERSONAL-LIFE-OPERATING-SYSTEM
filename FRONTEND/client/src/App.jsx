
import Header from './components/dashboard/Header.jsx'
import Sidebar from './components/dashboard/Sidebar.jsx';
import { Routes,Route,Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Calendar from './pages/Calendar.jsx';
import Finance from './pages/Finance.jsx';
import Fitness from './pages/Fitness.jsx';
import Settings from './pages/Settings.jsx';
import Study from './pages/Study.jsx';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './api/axios.js';

function App() {

const [user, setUser] = useState(null);


  useEffect(()=>{
const checkAuth=async()=>{
  try{
const res = await api.get("/user/me");
setUser(res.data);
console.log( res.data);
}
catch(err){
 setUser(null);
 
 console.log(err.response.data);
}}

checkAuth();

},[]);

  return (
  
  <div>

{(!user)?
(  <div className='min-h-screen'>
    <Routes>
  <Route path='/' element={<Login />}></Route>
  <Route path='/login' element={<Login />}></Route>
  <Route path='/register' element={<Register/>}></Route>
  </Routes>
  </div>):


   ( <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />

        <main className="flex-1">
        <Routes>
      <Route path='/dashboard'  element={<Dashboard user={user}/>}></Route>
      <Route path='/calendar' element={<Calendar user={user}/>}></Route>
      <Route path='/finance' element={<Finance user={user}/>}></Route>
      <Route path='/fitness' element={<Fitness user={user}/>}></Route>
      <Route path='/settings' element={<Settings user={user}/>}></Route>
      <Route path='/study' element={<Study user={user}/>}></Route>
       
    </Routes>
        </main>
      </div>
    </div>)}


  
    </div>
  );
}

export default App
