import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdHelpOutline, MdPeople } from 'react-icons/md';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md text-center">
        
        {/* Central Icon */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-12 mb-8 mx-auto w-48 h-48 flex flex-col items-center justify-center">
           <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white mb-2 shadow-sm shadow-primary-500/30">
              <span className="text-4xl font-bold italic">!</span>
           </div>
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
        </div>

        {/* Text Content */}
        <div className="inline-block bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 shadow-sm">
          Lost in the System?
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Oops! Page Not Found.</h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed px-4">
          The resource you are looking for might have been moved or deleted. Our HR systems are constantly evolving, and this link seems to have slipped through the cracks.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-xs mx-auto">
          <Link to="/" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md shadow-primary-500/20 flex items-center justify-center gap-2">
            <MdDashboard className="w-5 h-5" /> Back to Dashboard
          </Link>
          <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-primary-600 font-semibold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            <MdHelpOutline className="w-5 h-5" /> Contact Admin
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-16 w-full max-w-md text-center border-t border-slate-200 pt-8 pb-4">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Destinations</h4>
         <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-primary-600">
            <Link to="/employees" className="flex items-center gap-1 hover:text-primary-800"><MdPeople /> Employee Directory</Link>
         </div>
      </div>
      
      <div className="w-full text-center mt-4 pb-8">
         <p className="text-xs text-slate-500">&copy; 2024 PeopleSync Enterprise Solutions. All rights reserved.</p>
         <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2">
           <a href="#" className="hover:text-slate-700">Privacy Policy</a>
           <a href="#" className="hover:text-slate-700">System Status</a>
         </div>
      </div>

    </div>
  );
};

export default NotFound;
