import api from '../axios';
import { ChatResponse, SchemeExplanation } from '../../types/types';

export const aiService = {
    getSchemeInfo: async (schemeId: string): Promise<SchemeExplanation> => {
        const response = await api.post(`/ai/scheme-info/${schemeId}`);
        return response.data;
    },
    chat: async (message: string): Promise<ChatResponse> => {
        const response = await api.post('/ai/chat', { message });
        return response.data;
    },
    chatPublic: async (message: string): Promise<ChatResponse> => {
        const response = await api.post('/ai/chat/public', { message });
        return response.data;
    },
};
