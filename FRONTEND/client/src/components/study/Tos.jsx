import React, { useState } from 'react'

function Tos({setsub,sub}) {
 
     const [showModal, setShowModal] = useState(false);
      const [val, setVal] = useState("");
      const [nextId, setNextId] = useState(4);
    
      const addsub = () => {
        if (val.trim() === "") return;
    
        setsub([
          ...sub,
          {
            id: nextId,
            text: val,
            checked: false,
          },
        ]);
    
        setNextId(nextId + 1);
        setVal("");
        setShowModal(false);
      };
    
      const delsub = () => {
        setsub(sub.filter((t) => !t.checked));
      };
    
      const togchk = (id) => {
        setsub(
          sub.map((t) => {
            if (t.id === id) {
              return { ...t, checked: !t.checked };
            }
            return t;
          })
        );
      };
  return (
    <>
    <div className='bg-slate-900/70 border border-white/10 w-3/5 backdrop-blur-xl shadow-2xl p-6 rounded-2xl space-y-10'>

<div className='text-white text-center font-bold text-xl'>
    <h1>📚 TODAY'S SUBJECTS   </h1>
</div>



    <ul className="space-y-3 max-h-60 overflow-y-auto">

          {sub.map((sub) => (

            <li
              key={sub.id}
              className="flex justify-between items-center bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition"
            >

              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={sub.checked}
                  onChange={() => togchk(sub.id)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />

                <p
                  className={`${
                    sub.checked
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {sub.text.toUpperCase()}
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
            onClick={delsub}
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
              Add New sub
            </h2>

            <input
              autoFocus
              type="text"
              value={val}
              placeholder="Enter sub..."
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
                onClick={addsub}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
              >
                Add
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  )
}

export default Tos