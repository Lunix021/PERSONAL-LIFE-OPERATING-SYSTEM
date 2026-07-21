import React from 'react'

function Recentactivity() {

  const activities = [
    {
      id: 1,
      icon: "✅",
      title: "Finished MERN Lecture",
      time: "10 min ago"
    },
    {
      id: 2,
      icon: "💪",
      title: "Morning Workout Completed",
      time: "1 hour ago"
    },
    {
      id: 3,
      icon: "💰",
      title: "Added ₹250 Expense",
      time: "2 hours ago"
    },
    {
      id: 4,
      icon: "📚",
      title: "Studied for 2 Hours",
      time: "Yesterday"
    }
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white">
          Recent Activities
        </h2>

        <p className="text-gray-400 text-sm">
          Last 24 Hours
        </p>
      </div>

      <div className="space-y-3">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="flex justify-between items-center bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
          >

            <div className="flex items-center gap-4">

              <span className="text-2xl">
                {activity.icon}
              </span>

              <p className="text-white">
                {activity.title}
              </p>

            </div>

            <span className="text-sm text-gray-400">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Recentactivity