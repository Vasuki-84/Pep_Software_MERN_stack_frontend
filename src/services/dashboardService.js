import api from '../api/axios';
import { API_URLS } from '../constants';

export const getDashboardStats = async () => {
  return await api.get(API_URLS.DASHBOARD);
};
