import axios from 'axios';

const api = axios.create({
    baseURL: 'https://projeto-escola-t2m-rsw.herokuapp.com/escola/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
