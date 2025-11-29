import api from '../axios';

export const schemesService = {
    getAllSchemes: async () => {
        const response = await api.get('/schemes');
        return response.data;
    },
    getSchemeById: async (id: string) => {
        const response = await api.get(`/schemes/${id}`);
        return response.data;
    },
    fetchSchemes: async () => {
        const response = await api.post('/schemes/fetch');
        return response.data;
    },
};
