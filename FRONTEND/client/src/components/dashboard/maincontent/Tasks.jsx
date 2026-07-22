import React, { useState,useEffect } from 'react'
import api from '../../../api/axios'
function Tasks({user}) {
 
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState("");
const [allTasks, setAllTasks] = useState([]);


// ADD TASK
  const addtask = async () => {

    if (val.trim() === "") return;

    const newTask = {
    text: val,
    checked: false
};

try{

    const res=await api.post('/task/add',newTask);

    console.log(res.data);

    setAllTasks(prev=>[...prev,res.data.task])

    }
     catch (err) {
        console.log(err.response.data);
    }

    setVal("");

    setShowModal(false);

  };



  //DELETE TASK
  const deltask = async() => {
    
try{

    const res=await api.delete('/task/delete');
   
    console.log(res.data);

    setAllTasks(res.data.task);

    }
     catch (err) {
        console.log(err.response.data);
    }

  };




  //GETTING ALL TASKS
  useEffect(() => {
    const getTasks = async () => {
      try{
        const res = await api.get("/task/tasks");
        setAllTasks(res.data.task);
      }
        catch(err){
          console.log(err.response.data);
        }
    };

    getTasks();
}, []);






  //UPDATE CHECKBOX
  const togchk =async (id) => {
    try{

    const res=await api.patch(`/task/${id}`);
    console.log(res.data);
    setAllTasks(prev=>(prev.map(t =>
    t._id === res.data.task._id ? res.data.task : t)))

    }
     catch (err) {
        console.log(err.response.data);
    }

    
  };

  return (
    <>
    
      <div className="bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 w-3/5">

     
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            Today's Tasks
          </h1>

          <span className="text-sm text-gray-400">
            {allTasks.length} Tasks
          </span>
        </div>

     
        <ul className="space-y-3 max-h-60 overflow-y-auto">

          {allTasks.map((task) => (

            <li
              key={task._id}
              className="flex justify-between items-center bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition"
            >

              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => togchk(task._id)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />

                <p
                  className={`${
                    task.checked
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {task.text.toUpperCase()}
                </p>

              </div>

            </li>

          ))}

        </ul>

     
        <div className="flex justify-between mt-5">

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg text-white font-semibold"
          >
            ➕ Add
          </button>

          <button
            onClick={deltask}
            className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white font-semibold"
          >
            🗑 Delete
          </button>

        </div>

      </div>

      
      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-100">

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-96 shadow-2xl">

            <h2 className="text-white text-2xl font-bold">
              Add New Task
            </h2>

            <input
              autoFocus
              type="text"
              value={val}
              placeholder="Enter task..."
              onChange={(e) => setVal(e.target.value)}
              className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-green-500"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
              >
                Cancel
              </button>

              <button
                onClick={addtask}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
              >
                Add
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Tasks;