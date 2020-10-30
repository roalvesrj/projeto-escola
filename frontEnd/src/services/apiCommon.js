import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://projeto-escola-t2m-rsw.herokuapp.com/escola/',
    baseURL: 'http://a5d8e996a1d8.ngrok.io/escola/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
