import axios from 'axios';
import { getItem } from '../utils/localStorage';

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_SERVER}/api`,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response.data.code === 4) {
            return window.location.reload();
        }
        throw error.response.data;
    }
);

export default axiosClient;