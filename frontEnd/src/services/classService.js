import api from './apiCommon';

const listarTodos = () => {
    return api.get("/turmas");
};

const listarID = (id) => {
    return api.get(`/turmas/${id}`);
};

const incluir = (data) => {
    return api.post(`/turmas`, data);
};

const atualizar = (id, data) => {
    return api.put(`/turmas/${id}`, data);
};

const deletar = (id) => {
    return api.delete(`/turmas/${id}`);
};

export default {
    listarTodos,
    listarID,
    incluir,
    atualizar,
    deletar
};
