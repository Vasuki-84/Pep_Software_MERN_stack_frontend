import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import AnimatedBackground from '../components/AnimatedBackground';
import { MdPeople, MdPersonOutline, MdPersonOff, MdDateRange, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getEmployees({ limit: 1 });
        if (response.success) {
          const total = response.data.pagination.total;
          
          // Get active
          const activeResp = await getEmployees({ status: 'Active', limit: 1 });
          const active = activeResp.data.pagination.total;
          
          // Get inactive
          const inactiveResp = await getEmployees({ status: 'Inactive', limit: 1 });
          const inactive = inactiveResp.data.pagination.total;

          setStats({ total, active, inactive });
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const today = format(new Date(), 'MMM dd, yyyy');

  const StatCard = ({ title, value, icon, trend, positive, bgIcon }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgIcon}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {positive ? <MdTrendingUp className="w-3 h-3" /> : <MdTrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {loading ? '-' : value.toLocaleString()}
        </h3>
      </div>
    </div>
  );

  return (
    <>
      <AnimatedBackground variant="aurora" />
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back, Admin.</h1>
        <p className="text-slate-500">Here is an overview of your organization's health today.</p>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-200/50 rounded-lg text-sm font-medium text-slate-700 mt-4">
          <MdDateRange className="w-4 h-4 text-slate-500" />
          {today}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Total Employees"
          value={stats.total}
          icon={<MdPeople className="w-6 h-6 text-white" />}
          trend="+12%"
          positive={true}
          bgIcon="bg-slate-900"
        />
        <StatCard
          title="Active Staff"
          value={stats.active}
          icon={<MdPersonOutline className="w-6 h-6 text-white" />}
          trend="+4%"
          positive={true}
          bgIcon="bg-primary-500"
        />
        <StatCard
          title="Inactive / Leave"
          value={stats.inactive}
          icon={<MdPersonOff className="w-6 h-6 text-slate-700" />}
          trend="-2%"
          positive={false}
          bgIcon="bg-slate-200"
        />
      </div>
      </div>
    </>
  );
};

export default Dashboard;
