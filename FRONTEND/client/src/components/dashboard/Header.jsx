import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-slate-900/70 backdrop-blur-lg border-b border-white/10">

    
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome, L4NIX 👋
        </h1>

        <p className="text-gray-400">
          Ready to have a disciplined day?
        </p>
      </div>

    
      <div>
        <input
          type="search"
          placeholder="Search..."
          className="
          w-72
          px-5
          py-3
          rounded-full
          bg-slate-800
          border
          border-white/10
          text-white
          outline-none
          focus:border-blue-500
          "
        />
      </div>

    </header>
  );
}

export default Header;