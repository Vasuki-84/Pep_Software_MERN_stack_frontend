import api from '../api/axios';
import { API_URLS } from '../constants';

export const getEmployees = async (params) => {
  return await api.get(API_URLS.EMPLOYEES, { params });
};

export const getEmployeeById = async (id) => {
  return await api.get(`${API_URLS.EMPLOYEES}/${id}`);
};

export const createEmployee = async (data) => {
  return await api.post(API_URLS.EMPLOYEES, data);
};

export const updateEmployee = async (id, data) => {
  return await api.put(`${API_URLS.EMPLOYEES}/${id}`, data);
};

export const deleteEmployee = async (id) => {
  return await api.delete(`${API_URLS.EMPLOYEES}/${id}`);
};
