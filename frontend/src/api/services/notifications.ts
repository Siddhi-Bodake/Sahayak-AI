import api from '../axios';
import { Notification } from '../../types/types';

export const notificationsService = {
    getNotifications: async (userId: string): Promise<Notification[]> => {
        const response = await api.get(`/notifications/${userId}`);
        return response.data;
    },
};
