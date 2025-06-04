import axios from 'axios';
import { TaskFilter } from '@/types';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_LIVE_API_URL : process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL,
    withCredentials: true,
});

export const register = (data: { email: string; password: string }) =>
    api.post('/auth/register', data);
export const login = (data: { email: string; password: string }) =>
    api.post('/auth/login', data);
export const getTasks = (filters?: TaskFilter) => {
    const params = new URLSearchParams();
    if (filters) {
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
    }
    return api.get(`/tasks?${params.toString()}`);
};
export const createTask = (data: {
    title: string;
    description?: string;
    status: string;
    priority: string;
}) => api.post('/tasks', data);
export const updateTask = (
    id: string,
    data: { title?: string; description?: string; status?: string; priority?: string },
) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
export const getAllUsers = () => api.get('/admin/users');
export const getUserTasks = (userId: string) => api.get(`/admin/users/${userId}/tasks`);
export const deleteUser = (userId: string) => api.delete(`/admin/users/${userId}`);
export const updateUserRole = (userId: string, role: string) =>
    api.put(`/admin/users/${userId}/role`, { role });
export const verifyToken = () => api.get('/auth/verify');
export const logout = () => api.post('/auth/logout');
