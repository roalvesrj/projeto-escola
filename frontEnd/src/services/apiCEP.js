import axios from 'axios';

const cep = axios.create({
    baseURL: 'http://viacep.com.br/ws/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default cep;