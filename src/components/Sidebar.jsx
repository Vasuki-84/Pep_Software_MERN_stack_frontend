import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople, MdPersonAdd } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <MdDashboard className="w-5 h-5" /> },
    { name: 'Employees', path: '/employees', icon: <MdPeople className="w-5 h-5" /> },
    { name: 'Add Employee', path: '/employees/add', icon: <MdPersonAdd className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50/95 backdrop-blur-md border-r border-slate-200 h-screen flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 shrink-0">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">PeopleSync</h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeSidebar} // Automatically close sidebar on navigation
              end={item.path === '/employees' || item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-500/20'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=eff6ff&color=5544e3&bold=true" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@peoplesync.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
