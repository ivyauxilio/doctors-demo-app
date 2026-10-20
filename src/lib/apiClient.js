import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://md.agilebeyond.net',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Add response interceptor to handle CSRF token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 419) {
            // CSRF token mismatch - refresh and retry
            await refreshCsrfToken();
            const originalRequest = error.config;
            // Retry the original request
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const refreshCsrfToken = async () => {
    try {
        await apiClient.get('/sanctum/csrf-cookie');
        return true;
    } catch (error) {
        console.error('Failed to refresh CSRF token:', error);
        return false;
    }
};

export default apiClient;