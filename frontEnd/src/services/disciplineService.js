import api from './apiCommon';

const listarTodos = () => {
    return api.get("/disciplinas");
};

const listarID = (id) => {
    return api.get(`/disciplinas/${id}`);
};

const incluir = (data) => {
    return api.post(`/disciplinas`, data);
};

const atualizar = (id, data) => {
    return api.put(`/disciplinas/${id}`, data);
};

const deletar = (id) => {
    return api.delete(`/disciplinas/${id}`);
};

export default {
    listarTodos,
    listarID,
    incluir,
    atualizar,
    deletar
};
