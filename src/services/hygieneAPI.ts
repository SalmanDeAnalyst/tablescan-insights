import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface HygieneFilters {
  zone?: string;
  startDate?: string;
  endDate?: string;
}

export const hygieneAPI = {
  // Get hygiene summary with optional filters
  getSummary: async (filters: HygieneFilters = {}) => {
    try {
      const params: any = {};
      if (filters.zone) params.zone = filters.zone;
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;

      const response = await api.get('/api/hygiene/summary', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching hygiene summary:', error);
      throw error;
    }
  },

  // Get detailed breakdown
  getBreakdown: async (filters: HygieneFilters = {}) => {
    try {
      const params: any = {};
      if (filters.zone) params.zone = filters.zone;
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;

      const response = await api.get('/api/hygiene/breakdown', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching breakdown:', error);
      throw error;
    }
  },

  // Upload video for analysis
  uploadVideo: async (file: File, onProgress?: (progress: number) => void) => {
    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await api.post('/api/hygiene/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },
};

export default api;
