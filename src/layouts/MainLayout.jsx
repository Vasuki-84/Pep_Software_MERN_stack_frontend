import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { motion } from 'framer-motion';
import { MdHome, MdPeople, MdAddCircleOutline } from 'react-icons/md';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: <MdHome className="w-6 h-6" /> },
    { name: 'People', path: '/employees', icon: <MdPeople className="w-6 h-6" /> },
    { name: 'Add', path: '/employees/add', icon: <MdAddCircleOutline className="w-6 h-6" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-between items-center z-40 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.path === '/employees' || item.path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 transition-colors ${
              isActive ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-transparent relative">
      
      {/* Desktop & Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-transparent">
        <Topbar toggleSidebar={() => setIsSidebarOpen(true)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0 relative z-10">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;
