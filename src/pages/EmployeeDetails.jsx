import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../services/employeeService';
import { MdArrowBack, MdEdit, MdDelete, MdEmail, MdPhone, MdWork, MdDateRange, MdBadge } from 'react-icons/md';
import { format } from 'date-fns';
import { STATUS } from '../constants';
import toast from 'react-hot-toast';
import AnimatedBackground from '../components/AnimatedBackground';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        if (response.success) {
          setEmployee(response.data);
        }
      } catch {
        toast.error('Employee not found');
        navigate('/employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const response = await deleteEmployee(id);
      if (response.success) {
        toast.success('Employee deleted successfully');
        navigate('/employees');
      }
    } catch {
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;
  }

  if (!employee) return null;

  return (
    <>
      <AnimatedBackground variant="glassmorphism" />
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/employees" className="p-2 text-slate-500 hover:bg-white rounded-lg transition-colors">
            <MdArrowBack className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Employee Details</h1>
            <p className="text-slate-500 mt-1">View detailed information about the team member.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link to={`/employees/edit/${employee._id}`} className="btn-secondary flex-1 sm:flex-none flex items-center justify-center gap-2">
            <MdEdit className="w-5 h-5" /> Edit
          </Link>
          <button 
            onClick={() => setDeleteModalOpen(true)}
            className="btn-danger flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <MdDelete className="w-5 h-5" /> Delete
          </button>
        </div>
      </div>

      <div className="card bg-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex-shrink-0 w-24 h-24 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-3xl font-bold uppercase shadow-sm">
            {employee.fullName.charAt(0)}
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{employee.fullName}</h2>
                <p className="text-lg text-primary-600 font-medium">{employee.designation}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider self-start ${
                employee.status === STATUS.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {employee.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-6 border-t border-slate-100">
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdEmail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Email Address</p>
                  <p className="text-slate-900 font-medium">{employee.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdPhone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Mobile Number</p>
                  <p className="text-slate-900 font-medium">{employee.mobileNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdWork className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Department</p>
                  <p className="text-slate-900 font-medium">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdBadge className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Employee ID</p>
                  <p className="text-slate-900 font-medium font-mono text-sm">{employee._id}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdDateRange className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Joining Date</p>
                  <p className="text-slate-900 font-medium">
                    {format(new Date(employee.joiningDate), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <MdDateRange className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Record Created</p>
                  <p className="text-slate-900 font-medium text-sm">
                    {format(new Date(employee.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Employee</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to delete <strong>{employee.fullName}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default EmployeeDetails;
