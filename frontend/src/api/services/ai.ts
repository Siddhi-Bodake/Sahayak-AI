import api from '../axios';

export const aiService = {
    getSchemeInfo: async (schemeId: string) => {
        const response = await api.post(`/ai/scheme-info/${schemeId}`);
        return response.data;
    },
};
