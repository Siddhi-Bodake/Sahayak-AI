import api from '../axios';
import { AuthResponse, User } from '../../types/types';

export const authService = {
    register: async (data: any): Promise<{ message: string }> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (data: any): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },
    getMe: async (): Promise<User> => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};
