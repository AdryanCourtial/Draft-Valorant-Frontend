import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosClient;