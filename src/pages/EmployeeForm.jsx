import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { employeeSchema } from '../validations/employeeSchema';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { DEPARTMENTS, STATUS } from '../constants';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { MdArrowBack, MdPersonAdd, MdSecurity, MdErrorOutline } from 'react-icons/md';
import AnimatedBackground from '../components/AnimatedBackground';

const EmployeeForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      status: STATUS.ACTIVE,
    }
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const response = await getEmployeeById(id);
          if (response.success) {
            const data = response.data;
            setValue('fullName', data.fullName);
            setValue('email', data.email);
            setValue('mobileNumber', data.mobileNumber);
            setValue('department', data.department);
            setValue('designation', data.designation);
            setValue('joiningDate', format(new Date(data.joiningDate), 'yyyy-MM-dd'));
            setValue('status', data.status);
          }
        } catch {
          navigate('/employees');
        } finally {
          setIsLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [id, isEditMode, setValue, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditMode) {
        response = await updateEmployee(id, data);
        toast.success('Employee updated successfully');
      } else {
        response = await createEmployee(data);
        toast.success('Employee added successfully');
      }
      if (response.success) {
        navigate('/employees');
      }
    } catch {
      // toast handled in axios
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div></div>;
  }

  return (
    <>
      <AnimatedBackground variant="blobs" />
      <div className="max-w-xl mx-auto space-y-6 pb-20 md:pb-0 relative z-10">
        <div className="flex items-center gap-3 mb-6">
        <Link to="/employees" className="text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors -ml-2">
          <MdArrowBack className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
        
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employee Information</h2>
          <p className="text-sm text-slate-500 mt-1">Please enter the professional details of the team member.</p>
        </div>

        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
              placeholder="e.g. Jonathan Doe"
            />
            {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><MdErrorOutline /> {errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
               <input
                 type="email"
                 {...register('email')}
                 className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
                 placeholder="e.g. name@company.com"
               />
               {errors.email && <MdErrorOutline className="absolute right-3 top-3.5 text-red-500 w-5 h-5" />}
            </div>
            {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email.message}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium">
                +1
              </span>
              <input
                type="text"
                {...register('mobileNumber')}
                className={`w-full bg-white border rounded-r-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.mobileNumber ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
                placeholder="(555) 000-0000"
              />
            </div>
            {errors.mobileNumber && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><MdErrorOutline /> {errors.mobileNumber.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
            <select
              {...register('department')}
              className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.department ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><MdErrorOutline /> {errors.department.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Designation</label>
            <input
              type="text"
              {...register('designation')}
              className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.designation ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
              placeholder="e.g. Senior Developer"
            />
            {errors.designation && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><MdErrorOutline /> {errors.designation.message}</p>}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Joining Date</label>
            <input
              type="date"
              {...register('joiningDate')}
              className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.joiningDate ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-slate-200 focus:border-primary-500'}`}
            />
            {errors.joiningDate && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><MdErrorOutline /> {errors.joiningDate.message}</p>}
          </div>

          {/* Status (Radio buttons instead of select to match reference) */}
          <div className="pt-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Employment Status</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="radio" 
                   value={STATUS.ACTIVE} 
                   {...register('status')} 
                   className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="radio" 
                   value={STATUS.INACTIVE} 
                   {...register('status')} 
                   className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Inactive / On Notice</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <Link to="/employees" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors block text-center">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md shadow-primary-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MdPersonAdd className="w-5 h-5" />
            )}
            {isEditMode ? 'Update Employee' : 'Save Employee'}
          </button>
        </div>
      </form>

      {/* Data Protection Static Card */}
      <div className="bg-slate-100 rounded-2xl p-5 flex items-start gap-4 border border-slate-200">
         <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary-500/30">
            <MdSecurity className="w-6 h-6" />
         </div>
         <div>
            <h4 className="text-sm font-bold text-slate-900">Data Protection</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              All employee records are encrypted and stored according to GDPR standards.
            </p>
         </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
