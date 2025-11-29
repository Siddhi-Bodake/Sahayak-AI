import api from '../axios';
import { Scheme, BackendScheme } from '../../types/types';

const mapBackendSchemeToFrontend = (backendScheme: BackendScheme): Scheme => {
    return {
        id: backendScheme.id,
        title: backendScheme.name,
        category: backendScheme.category,
        description: backendScheme.shortDescription,
        eligibility: Array.isArray(backendScheme.eligibility)
            ? backendScheme.eligibility.join('\n• ')
            : backendScheme.eligibility || '',
        benefits: Array.isArray(backendScheme.benefits)
            ? backendScheme.benefits.join('\n• ')
            : backendScheme.benefits || '',
        application_process: backendScheme.applicationProcess || 'Please visit the official website for application details.',
        source_url: backendScheme.source_url || backendScheme.officialWebsite || '',
        is_new: backendScheme.is_new,
        created_at: backendScheme.created_at
    };
};

export const schemesService = {
    getAllSchemes: async (): Promise<Scheme[]> => {
        const response = await api.get<BackendScheme[]>('/schemes');
        return response.data.map(mapBackendSchemeToFrontend);
    },

    getSchemeById: async (id: string): Promise<Scheme> => {
        const response = await api.get<BackendScheme>(`/schemes/${id}`);
        return mapBackendSchemeToFrontend(response.data);
    },

    fetchSchemes: async (): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/schemes/fetch');
        return response.data;
    }
};
