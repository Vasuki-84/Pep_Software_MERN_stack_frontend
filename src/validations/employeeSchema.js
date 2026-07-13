import * as Yup from 'yup';
import { DEPARTMENTS, STATUS } from '../constants';

const phoneRegExp = /^\+?[1-9]\d{1,14}$/;

export const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  mobileNumber: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid mobile number')
    .required('Mobile number is required'),
  department: Yup.string()
    .oneOf(DEPARTMENTS, 'Invalid department')
    .required('Department is required'),
  designation: Yup.string()
    .trim()
    .min(2, 'Designation must be at least 2 characters')
    .required('Designation is required'),
  joiningDate: Yup.date()
    .typeError('Please enter a valid date')
    .required('Joining date is required'),
  status: Yup.string()
    .oneOf(Object.values(STATUS), 'Invalid status')
    .default(STATUS.ACTIVE),
});
