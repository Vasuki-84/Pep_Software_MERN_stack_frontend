import React from 'react';
import { MdMenu, MdNotifications } from 'react-icons/md';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 border-b border-transparent md:border-slate-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 -ml-1.5 text-primary-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          <MdMenu className="w-7 h-7" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight md:hidden">PeopleSync</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-primary-600 hover:bg-slate-100 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-500/50">
          <MdNotifications className="w-6 h-6" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 md:hidden flex items-center justify-center">
           <img src="https://ui-avatars.com/api/?name=Admin+User&background=eff6ff&color=5544e3&bold=true" alt="Admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
