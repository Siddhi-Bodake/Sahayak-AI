import api from '../axios';

export const authService = {
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};
