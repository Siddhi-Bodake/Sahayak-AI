import api from '../axios';

export const notificationsService = {
    getNotifications: async (userId: string) => {
        const response = await api.get(`/notifications/${userId}`);
        return response.data;
    },
};
