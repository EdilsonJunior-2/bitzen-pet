import axios from 'axios';
import { isAuthenticated } from './auth';


const api = axios.create({
    baseURL: "https://api.bitzen-pet.homologacao.bitzenwebsites.net/api",
});

api.interceptors.request.use(async config => {
    const token = isAuthenticated();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;