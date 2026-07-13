import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdPeople, MdVisibility, MdTune, MdEmail, MdBusiness, MdDateRange } from 'react-icons/md';
import { DEPARTMENTS, STATUS } from '../constants';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    sortBy: 'Latest Joining Date',
  });
  
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getEmployees({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });
      if (response.success) {
        setEmployees(response.data.employees);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchEmployees]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDepartmentPill = (dept) => {
    setFilters(prev => ({ ...prev, department: dept }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteEmployee(deleteModal.id);
      if (response.success) {
        toast.success('Employee deleted successfully');
        setDeleteModal({ isOpen: false, id: null });
        fetchEmployees(); 
      }
    } catch {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  return (
    <>
      <AnimatedBackground variant="particles" />
      <div className="max-w-5xl mx-auto space-y-6 relative z-10 pb-20 md:pb-0">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">People</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Directory</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your team members and roles.</p>
        </div>
        <Link to="/employees/add" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
          <MdAdd className="w-5 h-5" /> Add Employee
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative flex items-center w-full">
          <MdSearch className="absolute left-4 text-slate-400 w-6 h-6" />
          <input
            type="text"
            name="search"
            placeholder="Search employees, roles, or skills..."
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-400 text-sm md:text-base"
          />
          <button className="absolute right-4 text-slate-400 hover:text-slate-600 p-1">
             <MdTune className="w-5 h-5" />
          </button>
        </div>

        {/* Pill Filters for Departments */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          <button
            onClick={() => handleDepartmentPill('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filters.department === '' ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All
          </button>
          {DEPARTMENTS.map(dept => (
            <button
              key={dept}
              onClick={() => handleDepartmentPill(dept)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filters.department === dept ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* List / Cards Layout */}
      <div className="space-y-4 mt-6">
        {loading ? (
          Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <Skeleton count={1} height={60} />
            </div>
          ))
        ) : employees.length === 0 ? (
           <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <MdPeople className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-bold text-slate-800">No employees found</p>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your search criteria.</p>
           </div>
        ) : (
          employees.map((emp, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={emp._id} 
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {emp.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 leading-none">{emp.fullName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        emp.status === STATUS.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {emp.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{emp.designation}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5"><MdEmail className="w-3.5 h-3.5 text-slate-400" /> {emp.email}</div>
                    <div className="flex items-center gap-1.5"><MdBusiness className="w-3.5 h-3.5 text-slate-400" /> {emp.department}</div>
                    <div className="flex items-center gap-1.5"><MdDateRange className="w-3.5 h-3.5 text-slate-400" /> Joined {format(new Date(emp.joiningDate), 'MMM dd, yyyy')}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t border-slate-100 md:border-none self-end md:self-center md:opacity-0 group-hover:opacity-100 transition-opacity w-full md:w-auto justify-end">
                <Link to={`/employees/${emp._id}`} className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors" title="View">
                  <MdVisibility className="w-5 h-5" />
                </Link>
                <Link to={`/employees/edit/${emp._id}`} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors" title="Edit">
                  <MdEdit className="w-5 h-5" />
                </Link>
                <button onClick={() => setDeleteModal({ isOpen: true, id: emp._id })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && employees.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-500 font-medium">
            Showing {(pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <div className="flex gap-2">
            <button
              disabled={pagination.page === 1}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-20 right-4 z-20">
        <Link to="/employees/add" className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/40">
          <MdAdd className="w-7 h-7" />
        </Link>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
               <MdDelete className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Record</h3>
            <p className="text-slate-500 mb-6 text-sm">This action cannot be undone. Are you sure you want to proceed?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className="flex-1 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default EmployeeList;
